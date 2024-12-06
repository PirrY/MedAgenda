import connection from '../config/db.js';
import bcrypt from 'bcrypt';

// Obtener todos los doctores
export const getAllDoctores = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM doctores');
    console.log('Doctors fetched:', results);

    res.json(results);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Error fetching doctors' });
  }
};

// Agregar un nuevo doctor
export const addDoctor = async (req, res) => {
  const {
    dr_nombre1,
    dr_nombre2,
    dr_apellido1,
    dr_apellido2,
    dr_especialidad,
    dr_telefono,
    dr_correo,
    pwd, // Contraseña proporcionada
    dr_consultorio,
  } = req.body;

  const saltRounds = 10; // Número de rondas de hashing
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(pwd, saltRounds);

    // Actualizar la consulta SQL para incluir 'pwd'
    const sql =
      'INSERT INTO doctores (dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad, dr_telefono, dr_correo, pwd, dr_consultorio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Incluir el hashedPassword en los valores
    const [result] = await connection.query(sql, [
      dr_nombre1,
      dr_nombre2,
      dr_apellido1,
      dr_apellido2,
      dr_especialidad,
      dr_telefono,
      dr_correo,
      hashedPassword, // Contraseña encriptada
      dr_consultorio,
    ]);

    res.status(201).json({ message: 'Doctor added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding doctor:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
