import React, { useState } from 'react';
import './Login.css';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import { useNavigate } from 'react-router-dom';



export function Login() {
  const [userType, setUserType] = useState('patient'); // Controla el tipo de usuario
  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate('/Register');
  }
  return (
    <div>
    <div className="login-page">
      <Header/>
      <h1 className="text-h1">Iniciar Sesión</h1>
      <h6 onClick={goToRegisterPage}>¿No tienes una cuenta?, haz click aqui para crearla</h6>
      <div className="user-type-buttons">
        {/* Botones para elegir el tipo de usuario */}
        <button onClick={() => setUserType('patient')}>Paciente</button>
        <button onClick={() => setUserType('doctor')}>Doctor</button>
      </div>
      
      {/* Renderizado condicional del formulario según el tipo de usuario */}
      {userType === 'patient' ? <PatientLoginForm /> : <DoctorLoginForm />}
      
    </div>
    <Footer/>
    </div>
  );
}

const PatientLoginForm = () => (
  <form className="login-form">
    <label>Email:</label>
    <input type="email" placeholder="Ingrese su email" required />
    <label>Contraseña:</label>
    <input type="password" placeholder="Ingrese su contraseña" required />
    <button type="submit">Iniciar Sesión como Paciente</button>
  </form>
);

const DoctorLoginForm = () => (
  <form className="login-form">
    <label>Email:</label>
    <input type="email" placeholder="Ingrese su email" required />
    <label>Contraseña:</label>
    <input type="password" placeholder="Ingrese su contraseña" required />
    <button type="submit">Iniciar Sesión como Doctor</button>
  </form>
);

