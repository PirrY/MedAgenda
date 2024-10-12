import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import Header from '../components/molecules/Header'; 

function ADashboard() {
  return (
    <div>
      {/* Implementación del Header */}
      <Header />

      {/* Contenido del Admin Dashboard */}
      <div className="dashboard">
        <div className="dashboard-container">
          <h1>Dashboard de Administrador</h1>
          <div className="recuadro">
            <div className="card">
              <h2>Base de Datos de Clientes</h2>
              <Link to="/BDClientes">
                <button>Ir a Clientes</button>
              </Link>
            </div>
            <div className="card">
              <h2>Calendario</h2>
              <Link to="/ACalendar">
                <button>Ir al Calendario</button>
              </Link>
            </div>
            <div className="card">
              <h2>Base de Datos de Personal</h2>
              <Link to="/BDPersonal">
                <button>Ir a Personal</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADashboard;
