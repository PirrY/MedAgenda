import connection from '../config/db.js';

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
    dr_consultorio,
  } = req.body;

  const sql =
    'INSERT INTO doctores (dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad, dr_telefono, dr_correo, dr_consultorio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const [result] = await connection.query(sql, [
      dr_nombre1,
      dr_nombre2,
      dr_apellido1,
      dr_apellido2,
      dr_especialidad,
      dr_telefono,
      dr_correo,
      dr_consultorio,
    ]);
    res.status(201).json({ message: 'Doctor added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding doctor:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
