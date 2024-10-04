import './Header.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate('/Login');
  };
  const goToRegisterPage = () => {
    navigate('/Register');
  }

  return (
    <header>

        <nav>
            <img src="/src/img/logo.jpeg" alt="" height={100} width={100}/>
            <section id='section1'>
              <p>La Solución Integral para la Gestión de tu Clínica</p>
            </section>
            <section id='section2'>
                <button onClick={goToLoginPage}>Iniciar Sesión</button>
                <button onClick={goToRegisterPage}>Registrarse</button>
            </section>
        </nav>
    </header>
  )
}
