import connection from '../config/db.js';

export const getAllPacientes = (req, res) => {
  connection.query('SELECT * FROM pacientes', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

export const addPaciente = (req, res) => {
  const {
    nombre1_paciente,
    nombre2_paciente,
    apellido1_paciente,
    apellido2_paciente,
    cedula_paciente,
    telefono_paciente,
    correo_paciente,
    direccion_paciente,
  } = req.body;

  const sql =
    'INSERT INTO pacientes (nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, direccion_paciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(
    sql,
    [nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, direccion_paciente],
    (err, result) => {
      if (err) {
        console.error('Error adding new patient:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
    }
  );
};

export const getPacienteById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM pacientes WHERE id_paciente = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.length === 0) return res.status(404).json({ error: 'Patient not found' });
    res.json(results[0]);
  });
};

