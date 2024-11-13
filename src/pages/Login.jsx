import React, { useState } from 'react';
import './Login.css';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import { useNavigate } from 'react-router-dom';



export function Login() {

  return (
    <div>
    <div className="login-page">
      <Header/>
      <h1 className="text-h1">Iniciar Sesión</h1>
      <form className="login-form">
        <label>Nombre de usuario:</label>
        <input type="email" placeholder="Ingrese su nombre de usuario" required />
        <label>Contraseña:</label>
        <input type="password" placeholder="Ingrese su contraseña" required />
        <button type="submit">Iniciar Sesión como Administrador</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

