import express from 'express';
import connection from '../config/db.js';


export const login = (req,res) =>{
    


}



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