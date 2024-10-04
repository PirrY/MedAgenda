import React from 'react';
import Header from '../components/molecules/Header';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <Header />
      <div className="recuadro">
        <div className="text-content">
          <h1>Bienvenido a MedAgenda</h1>
          <button>Servicios medicos que puedes encontrar</button>
          <button>Novedades y Medios disponibles</button>
        </div>
        <div className="image-content">
          <img src="/src/img/imgMedicos.jpg" alt="Doctor" />
        </div>
      </div>
    </div>
  );
}
