import React from 'react';
import Header from '../components/molecules/Header';
import './MedicalServices.css';
import Footer from '../components/molecules/Footer';

export function MedicalServices() {
    return (
    <div>
        <Header />
        <div className="medical-services-container">
        <center>
            <h1 className="form-title">Servicios Médicos</h1>
        </center>
        <div className="medical-services-content">
            <div className="cards-section">
            <div className="service-card">
                <h2>Gestión de citas</h2>
                <p>Reserva, modificación y cancelación de citas médicas en línea</p>
            </div>
            <div className="service-card">
                <h2>Consultas médicas</h2>
                <p>Información sobre consultas presenciales o virtuales (telemedicina)</p>
            </div>
            <div className="service-card">
                <h2>Historial médico</h2>
                <p>Acceso seguro al historial clínico de los pacientes</p>
            </div>
            <div className="service-card">
                <h2>Recetas electrónicas</h2>
                <p>Generación y envío de recetas electrónicas a los pacientes o farmacias</p>
            </div>
            <div className="service-card">
                <h2>Recordatorios de citas y tratamientos</h2>
                <p>Notificaciones automáticas sobre próximas consultas o recordatorios de tratamientos</p>
            </div>
            <div className="service-card">
                <h2>Resultados de exámenes</h2>
                <p>Visualización de resultados de laboratorio y otros estudios médicos</p>
            </div>
            <div className="service-card">
                <h2>Atención especializada</h2>
                <p>Listado de especialidades médicas disponibles en la clínica</p>
            </div>
            <div className="service-card">
                <h2>Comunicación Integral</h2>
                <p>Canales, como correos electrónicos y mensajes de texto para intercambio de información</p>
            </div>
            </div>
        </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
    );
}
