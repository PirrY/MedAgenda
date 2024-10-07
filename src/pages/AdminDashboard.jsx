import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import Header from '../components/molecules/Header'; // Asegúrate de que la ruta del Header sea correcta

function ADashboard() {
  return (
    <div>
      {/* Implementación del Header */}
      <Header />

      {/* Contenido del Admin Dashboard */}
      <div className="home">
        <div className="dashboard-container">
          <h1>Dashboard de Administrador</h1>
          <div className="recuadro">
            <div className="card">
              <h2>Base de Datos de Clientes</h2>
              <Link to="/clientes">
                <button>Ir a Clientes</button>
              </Link>
            </div>
            <div className="card">
              <h2>Calendario</h2>
              <Link to="/calendario">
                <button>Ir al Calendario</button>
              </Link>
            </div>
            <div className="card">
              <h2>Base de Datos de Doctores</h2>
              <Link to="/doctores">
                <button>Ir a Doctores</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADashboard;
