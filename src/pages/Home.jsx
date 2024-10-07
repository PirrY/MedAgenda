import React from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import './Home.css';
import Carousel from '../components/organisms/Carousel';

export function Home() {
  return (
    <div className="home">
      <Header />
      <div className="recuadro">
        <div className="text-content">
          <h1>Bienvenido a MedAgenda</h1>
          <button>Servicios médicos que puedes encontrar</button>
          <button>Novedades y Medios disponibles</button>
        </div>
        <div className="image-content">
          <Carousel />
        </div>
      </div>
      
      {/* Sección de Servicios a un clic fuera del recuadro */}
      <div className="servicios-click">
        <h2>Opciones a un click</h2>
        <center>
        <button>Directorio Medico</button>
        <button>Consulta en Línea</button>
        <button>Emergencias</button>
        </center>
      </div>

      <Footer />
    </div>
  );
}
