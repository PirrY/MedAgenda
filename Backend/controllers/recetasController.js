import connection from '../config/db.js';

export const getRecetasByPaciente = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM recetas WHERE id_paciente = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};
