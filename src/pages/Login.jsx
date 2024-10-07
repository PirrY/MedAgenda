import React, { useState } from 'react';
import './Login.css';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';

export function Login() {
  const [userType, setUserType] = useState('patient'); // Controla el tipo de usuario

  return (
    <div className="login-page">
      <Header/>
      <h1 className="text-h1">Iniciar Sesión</h1>
      <div className="user-type-buttons">
        {/* Botones para elegir el tipo de usuario */}
        <button onClick={() => setUserType('patient')}>Paciente</button>
        <button onClick={() => setUserType('doctor')}>Doctor</button>
      </div>
      
      {/* Renderizado condicional del formulario según el tipo de usuario */}
      {userType === 'patient' ? <PatientLoginForm /> : <DoctorLoginForm />}
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

