import React from 'react'
import './Account.css';
import { useNavigate } from 'react-router-dom';

export function Account() {

  const navigate = useNavigate();

  const goAdminDashboard = () => {
    navigate('/AHome');
  };

  const goMedicalRegister = () => {
    navigate('/MedicalRegister');
  };

  const goPatientRegistry = () => {
    navigate('/patientRegistry');
  };

  return (
      <div className="welcome-container">
          <header className="headercuenta">
              <div className="logo">Nombre del centro de salud</div>
          </header>

          <div className="content">
              <div className="illustration">
                  <img src="\src\img\InicioAdmin.png" alt="Reception illustration" />
              </div>

              <div className="welcome-text">
                  <h2>Bienvenido administrador</h2>
                  <p>
                  Gracias por mantener nuestro sistema funcionando de forma segura y eficiente. 
                  Aquí tienes todas las herramientas que necesitas para gestionar y optimizar cada detalle. 
                  ¡Estamos aquí para apoyarte en cada paso!
                  </p>
                  <div className="btn-signin">
                  <button onClick={goAdminDashboard}>Entrar Al Panel</button>
                  <button onClick={goMedicalRegister}>Registrar un nuevo médico</button>
                  <button onClick={goPatientRegistry}>Registrar un nuevo usuario</button>
                  </div>
              </div>
          </div>
      </div>
  );
}
