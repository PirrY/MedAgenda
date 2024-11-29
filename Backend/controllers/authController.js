import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../config/db.js';

const llave = 'llave'; 

export const registerUser = async (req, res) => {
  const { nombre1, nombre2, apellido1, apellido2, correo, pwd, telefono, cedula } = req.body;

  if (!nombre1 || !apellido1 || !correo || !pwd || !telefono || !cedula) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {
    const [existingUser] = await connection.query('SELECT * FROM pacientes WHERE correo_paciente = ?', [correo]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);
    const [result] = await connection.query(
      'INSERT INTO pacientes (nombre1_paciente, nombre2_paciente, apellido1_paciente, apellido2_paciente, cedula_paciente, telefono_paciente, correo_paciente, pwd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre1, nombre2, apellido1, apellido2, cedula, telefono, correo, hashedPwd]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
    } else {
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

export const loginUser = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ error: 'Se requieren todos los campos.' });
  }

  try {
    const [users] = await connection.query('SELECT * FROM doctores WHERE dr_correo = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Usuario no existe.' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email o contraseña inválido.' });
    }

    const token = jwt.sign({ user_id: user.dr_id }, llave, { expiresIn: '1h' });
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};
