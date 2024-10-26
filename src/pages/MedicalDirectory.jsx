import React from 'react'
import Header from '../components/molecules/Header'
import './MedicalDirectory.css';
import Footer from '../components/molecules/Footer';

export function MedicalDirectory(){
    return(
        <div>
            <Header/>
        <div className='medicaldirectory'>
            <center>
                <h1 className = "form-title">Directorio Médico</h1>
            </center>
        <div classname = "medical-directory-content"></div>
        <div className="cards2-section">
            <div className="directory-card">
                <h2>Medico general y familiar</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Medicina Interna</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Dermatólogia</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Odontólogia</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Fonoaudiólogia</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Neumatólogia</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Pediatría</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Oftalmología</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Ortopedia</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Radiología</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Hematología</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
            <div className="directory-card">
                <h2>Gastroenterología</h2>
                <p>Convenio - Eps - Medicos disponibles</p>
            </div>
        </div>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
    );
}