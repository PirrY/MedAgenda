import React from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import './RecopilacionInfo.css';

export function RecopilacionInfo(){
    return(
        <div>
            <Header/>
        <div className='RecopilacionInfo'>
        <center>
        <div class='tittle'>Recopilación de Información</div>
            <div className='info'>
                <ol>En MedAgenda, recopilamos la información necesaria para proporcionar un servicio eficiente y personalizado. Los datos que recolectamos incluyen:</ol>
                <ol>Información Personal: Nombre, dirección, correo electrónico y número de teléfono. Información relacionada con la cuenta, como nombre de usuario y contraseña</ol>
                <ol>Información Médica: Historial clínico, medicamentos recetados, resultados de evaluaciones y detalles de citas médicas</ol>
                <ol>Preferencias del Usuario: Configuración de notificaciones, recordatorios y preferencias de comunicación</ol>
                <ol>Información Técnica: Dirección IP, tipo de dispositivo, sistema operativo y datos sobre tu interacción con la plataforma para mejorar la experiencia de uso</ol>
            </div>
        </center>
        </div>
            <Footer/>
        </div>
    )
}