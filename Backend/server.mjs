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
  user: 'medagenda',
  password: 'MedAgenda123%',
  port: '3307',
  database: 'MedAgendaDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
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

app.get('/api/pacientes', (req, res) => {
  connection.query('SELECT * FROM pacientes', (error, results) => {
    if (error) {
      console.error('Error fetching patients:', error);
      return res.status(500).json({ error: 'Error fetching patients' });
    }
    res.json(results);
  });
});

app.post('/api/pacientes', (req, res) => {
  const {
    nombre1_paciente,
    nombre2_paciente,
    apellido1_paciente,
    apellido2_paciente,
    cedula_paciente,
    telefono_paciente,
    correo_paciente,
    direccion_paciente
  } = req.body;
  
  const sql = 'INSERT INTO pacientes (nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, direccion_paciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, direccion_paciente], (err, result) => {
    if (err) {
      console.error('Error adding new patient:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
  });
});

app.get('/api/pacientes/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Fetching details for patient ID: ${id}`);
  const sql = 'SELECT * FROM pacientes WHERE id_paciente = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error fetching patient details:', error);
      return res.status(500).json({ error: 'Error fetching patient details' });
    }
    if (results.length === 0) {
      console.log(`No patient found with ID: ${id}`);
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(results[0]);
  });
});

app.get('/api/pacientes/:id/appointments', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM citas WHERE id_paciente_invol = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error fetching appointment history' });
    res.json(results);
  });
});

app.get('/api/pacientes/:id/recetas', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM recetas WHERE id_paciente = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error fetching medical prescriptions' });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
