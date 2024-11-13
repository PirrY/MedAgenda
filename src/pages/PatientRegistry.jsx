import React from 'react'
import Header from '../components/molecules/Header'
import './PatientRegistry.css';

export function PatientRegistry(){
    return(
        <div>
            <Header />
        <div className='register'>
    <center>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Título del formulario */}
            <h1 className="form-title">Formulario de Registro Usuario</h1>
            <form className="register-form">
            {/* Fila de nombres y apellidos */}
            <div className="row">
                <div className="form-group col-md-6">
                <label htmlFor="inputNombres">Nombres</label>
                <input type="text" className="form-control" id="inputNombres" />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputApellidos">Apellidos</label>
                <input type="text" className="form-control" id="inputApellidos" />
                </div>
            </div>

            {/* Fila de cédula y teléfono */}
            <div className="row">
                <div className="form-group col-md-6">
                <label htmlFor="inputCedula">Cédula</label>
                <input type="text" className="form-control" id="inputCedula" />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputTelefono">Teléfono</label>
                <input type="text" className="form-control" id="inputTelefono" />
                </div>
            </div>

            {/* Fila de contacto y dirección */}
            <div className="row">
                <div className="form-group col-md-6">
                <label htmlFor="inputCentroTrabajo">Contacto de emergencia</label>
                <input type="text" className="form-control" id="inputCentroTrabajo" />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputCorreoProfesional">Dirección</label>
                <input type="text" className="form-control" id="inputCorreoProfesional" />
                </div>
            </div>

            {/* Fila 4 */}
            <div className="row">
                <div className="form-group col-md-6">
                <label htmlFor="inputExperiencia">Correo</label>
                <input type="email" className="form-control" id="inputExperiencia" />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputUniversidad">Nombre de Usurio</label>
                <input type="text" className="form-control" id="inputUniversidad"/>
                </div>
            </div>

            {/* Fila 5 */}
            <div className="row">
                <div className="form-group col-md-6">
                <label htmlFor="inputEspecialidad">Contraseña</label>
                <input type="text" className="form-control" id="inputEspecialidad" />
                </div>
            </div>

            {/* Espaciado entre los campos y el botón */}
            <div style={{ marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </div>
            </form>
        </div>
        </center>
    </div>
    </div>
    )
}