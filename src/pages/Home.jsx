import React from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import './Home.css';
import Carousel from '../components/organisms/Carousel';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const goToMedicalServicesPage = () => {
    navigate('/medicalServices');
  };

  const goToMedicalDirectoryPage = () => {
    navigate('/medicalDirectory');
  };

  const goToNewsPage = () => {
    navigate('/Novedades');
  };

  return (
    <div>
    <div className="home">
      <Header />
      <div className="recuadro">
        <div className="text-content">
          <h1>Bienvenido a MedAgenda</h1>
          <button onClick={goToMedicalServicesPage}>Servicios médicos que puedes encontrar</button>
          <button onClick={goToNewsPage}>Novedades y Medios disponibles</button>
        </div>
        <div className="image-content">
          <Carousel />
        </div>
      </div>
      
      {/* Sección de Servicios a un clic fuera del recuadro */}
      <div className="servicios-click">
        <h2>Opciones a un click</h2>
        <center>
        <button onClick={goToMedicalDirectoryPage}>Directorio Medico</button>
        <button>Consulta en Línea</button>
        <button>Emergencias</button>
        </center>
      </div>

      <Footer />
    </div>
    </div>
  );
}
