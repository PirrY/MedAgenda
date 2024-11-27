import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();
const port = 5000; 
const bcrypt = pkg;
const llave = 'llave';
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2486',//Recuerden cambiar esta vuelta
  port: '3306',
  database: 'MedAgendaDB'
}).promise();


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});




app.post('/api/auth/register', async (req, res) => {
  const { nombre1, nombre2, apellido1, apellido2, correo, pwd, telefono, cedula } = req.body;

  // Validate required fields
  if (!nombre1 || !apellido1 || !correo || !pwd || !telefono || !cedula) {
    return res.status(400).json({ error: 'Todos los campos requeridos están incompletos.' });
  }

  try {
    // Check if user already exists
    const [usuarioExistente] = await connection.query(
      'SELECT * FROM pacientes WHERE correo_paciente = ?',
      [correo]
    );

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Insert the new user
    const [resultado] = await connection.query(
      'INSERT INTO pacientes (nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, pwd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre1, nombre2, apellido1, apellido2, cedula, telefono, correo, hashedPwd]
    );

    if (resultado.affectedRows > 0) {
      res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
    } else {
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  } catch (error) {
    console.error('Error de servidor:', error.message);
    res.status(500).json({ error: 'Error de servidor.', details: error.message });
  }
});

app.post('/api/auth/login', async(req,res) =>{
  const {email, pwd} = req.body;
  if(!email || !pwd){
    return res.status(400).json({error: 'Se requieren todos los campos.'});
  }

  try{
    const [usuarios] = await connection.query('SELECT * FROM pacientes WHERE correo_paciente = ?',[email]);
    if(usuarios.lenght === 0){
      return res.status(401).json({error: 'Usuario no existe.'});
    }

    const usuario = usuarios[0];
    const pwd_valid = await bcrypt.compare(pwd, usuario.pwd);
    if(!pwd_valid){
      return res.status(401).json({error: 'Email o contraseña invalido'});
    }

    const token = jwt.sign(
      {user_id: usuario.id_paciente},llave,{expiresIn: '0.5h'}
    );
    res.status(200).json({mensaje: 'Inicio de sesion exitoso.',token});
  }catch(error){
    console.error('Error en el inicio de sesion');
    res.status(500).json({error: 'Error en la base de datos'});
  }
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
