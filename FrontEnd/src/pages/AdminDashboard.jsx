import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Header from '../components/molecules/Header'; 

function ADashboard() {
  const navigate = useNavigate();

  // Check if the user is authenticated when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');  // Redirect to login page if not authenticated
    }
  }, [navigate]);

  return (
    <div>
      {/* Implementación del Header */}
      <Header />

      {/* Contenido del Admin Dashboard */}
      <div className="dashboard">
        <div className="dashboard-container">
          <h1>Dashboard de Administrador</h1>
          <center>
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
          </center>
        </div>
      </div>
    </div>
  );
}

export default ADashboard;
