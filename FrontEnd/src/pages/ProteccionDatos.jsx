import React from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import './ProteccionDatos.css';

export function ProteccionDatos(){
    return(
        <div>
            <Header/>
        <div className='ProteccionDatos'>
        <center>
                <div class="tittle">Protección de Datos</div>
            <div className='info'>
                <ol>La seguridad de tus datos es nuestra prioridad. Hemos implementado medidas robustas para proteger tu información, tales como:</ol>
                <ol>Encriptación: Toda la información sensible se encripta tanto durante su almacenamiento como durante su transmisión</ol>
                <ol>Acceso Restringido: Solo personal autorizado y con un propósito justificado puede acceder a los datos, dependiendo de su rol</ol>
                <ol>Seguridad en los Servidores: Almacenamos la información en servidores protegidos con firewalls y monitoreo constante para prevenir accesos no autorizados</ol>
                <ol>Auditorías y Monitoreo: Realizamos auditorías periódicas de seguridad para identificar y corregir posibles vulnerabilidades</ol>
                <ol>Políticas Internas de Seguridad: Capacitación constante al personal para el manejo seguro y ético de los datos sensibles</ol>
            </div>
        </center>
        </div>
            <Footer/>
        </div>
    );
}