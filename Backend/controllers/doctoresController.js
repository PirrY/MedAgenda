import connection from '../config/db.js';

export const getAllDoctores = (req, res) => {
  connection.query('SELECT * FROM doctores', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

export const addDoctor = (req, res) => {
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
  connection.query(
    sql,
    [dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad, dr_telefono, dr_correo, dr_consultorio],
    (err, result) => {
      if (err) {
        console.error('Error adding doctor:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Doctor added successfully', id: result.insertId });
    }
  );
};
