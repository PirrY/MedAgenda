import React from 'react'
import Header from '../components/molecules/Header'
import './MedicalDirectory.css';

export function MedicalDirectory(){
    return(
        <div>
            
        <div className='medicaldirectory'>
        <Header/>
            <center>
                <h1 className = "form-title">Directorio Medico</h1>
            </center>
        </div>
        </div>
    );
}
