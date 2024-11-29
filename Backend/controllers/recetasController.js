import connection from '../config/db.js';

export const getRecetasByPaciente = async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM recetas WHERE id_paciente = ?';

  try {
    const [results] = await connection.query(sql, [id]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Error fetching prescriptions' });
  }
};
