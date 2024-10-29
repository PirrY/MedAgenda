import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000; 

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2486',
  database: 'MedAgendaDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/doctores', (req, res) => {
  connection.query('SELECT * FROM doctores', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
});

app.post('/api/doctores', (req, res) => {
  const { dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad, dr_telefono, dr_correo, dr_consultorio } = req.body;
  const sql = 'INSERT INTO doctores (dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad, dr_telefono, dr_correo, dr_consultorio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad, dr_telefono, dr_correo, dr_consultorio], (err, result) => {
    if (err) {
      console.error('Error inserting doctor:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Doctor added successfully', id: result.insertId });
  });
});

app.get('/api/citas', (req, res) => {
  connection.query('SELECT * FROM citas', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
});

// New endpoint to create an appointment
app.post('/api/citas', (req, res) => {
  const { fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita } = req.body;
  const sql = 'INSERT INTO citas (fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita) VALUES (?, ?, ?, ?, ?)';
  
  connection.query(sql, [fecha_hora_cita, id_paciente_invol, id_dr_encar, motivo, estado_cita], (err, result) => {
    if (err) {
      console.error('Error inserting appointment:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Appointment created successfully', id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
