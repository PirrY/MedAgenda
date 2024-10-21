import React from 'react'
import Header from '../components/molecules/Header'
import './MedicalDirectory.css';

export function MedicalDirectory(){
    return(
        <div>
            <Header/>
        <div className='medicaldirectory'>
            <center>
                <h1 className = "form-title">Directorio Medico</h1>
            </center>
        </div>
        </div>
    );
}
