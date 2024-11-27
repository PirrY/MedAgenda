import connection from '../config/db.js';

export const getAllCitas = (req, res) => {
  connection.query('SELECT * FROM citas', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

export const addCita = (req, res) => {
  const { fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita } = req.body;

  const sql =
    'INSERT INTO citas (fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita) VALUES (?, ?, ?, ?, ?)';
  connection.query(
    sql,
    [fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita],
    (err, result) => {
      if (err) {
        console.error('Error adding appointment:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Appointment created successfully', id: result.insertId });
    }
  );
};
