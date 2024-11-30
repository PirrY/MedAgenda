import React from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import './UsoInfo.css';

export function UsoInfo(){
    return(
        <div>
            <Header/>
            <div className='UsoInfo'>
            <center>
                <div className='tittle'>Uso de la Información</div>
                <div className='info'>
                    <ol>Usamos la información recopilada exclusivamente para fines relacionados con la prestación de servicios de salud. Los principales usos incluyen:</ol>
                    <ol>Gestión de Citas Médicas: Coordinar y programar citas con médicos y especialistas</ol>
                    <ol>Comunicación: Enviar recordatorios de citas, actualizaciones sobre tratamientos y notificaciones relevantes</ol>
                    <ol>Soporte Clínico: Facilitar el acceso de los médicos a tu historial clínico para mejorar la calidad de la atención</ol>
                    <ol>Mejoras de la Plataforma: Analizar la interacción del usuario con la plataforma para implementar mejoras en el servicio y personalizar la experiencia</ol>
                    <ol>Cumplimiento Legal: Usar y compartir datos cuando sea requerido por la ley, regulaciones o situaciones de emergencia médica</ol>
                </div>
            </center>
            </div>
            <Footer/>
        </div>
    )
}