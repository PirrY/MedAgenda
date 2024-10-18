import React from 'react'
import Header from '../components/molecules/Header'
import './Register.css';

export function Register() {
  return (
    <div>
      <Header/>
    <div className='register'>
      <center>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Título del formulario */}
          <h1 className="form-title">Formulario de Registro Médico</h1>
          <form className="register-form">
            {/* Fila de nombres y apellidos */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputNombres">Nombres</label>
                <input type="text" className="form-control" id="inputNombres" placeholder="Ingresa tu primer y segundo nombre" required/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputApellidos">Apellidos</label>
                <input type="text" className="form-control" id="inputApellidos" placeholder="Ingresa tu primer y segundo apellido" required/>
              </div>
            </div>

            {/* Fila de cédula y teléfono */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCedula">Cédula</label>
                <input type="text" className="form-control" id="inputCedula" placeholder="Ingresa tu número de cédula" required/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputTelefono">Teléfono</label>
                <input type="text" className="form-control" id="inputTelefono" placeholder="Ingresa tu teléfono celular" required/>
              </div>
            </div>

            {/* Fila de centro de trabajo y correo */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCentroTrabajo">Centro de trabajo</label>
                <input type="text" className="form-control" id="inputCentroTrabajo" placeholder="Ingresa el nombre de tu centro de trabajo" required/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputCorreoProfesional">Correo Profesional</label>
                <input type="email" className="form-control" id="inputCorreoProfesional" placeholder="Ingresa tu correo profesional" required/>
              </div>
            </div>

            {/* Fila de experiencia y universidad */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputExperiencia">Años de experiencia</label>
                <input type="number" className="form-control" id="inputExperiencia" placeholder="Ingresa tus años de experiencia" required/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputUniversidad">Universidad de egreso</label>
                <input type="text" className="form-control" id="inputUniversidad" placeholder="Ingresa la universidad de egreso" required/>
              </div>
            </div>

            {/* Fila de especialidad y certificación */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEspecialidad">Especialidad médica</label>
                <input type="text" className="form-control" id="inputEspecialidad" placeholder="Ingresa tu especialidad médica" required/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputCertificacion">Certificación médica</label>
                <input type="text" className="form-control" id="inputCertificacion" placeholder="Ingresa tu certificación médica" required/>
              </div>
            </div>

            {/* Fila de licencia y usuario */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputLicencia">Número de licencia médica</label>
                <input type="text" className="form-control" id="inputLicencia" placeholder="Ingresa tu número de licencia médica" required/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputUsuario">Nombre de usuario</label>
                <input type="text" className="form-control" id="inputUsuario" placeholder="Ingresa tu nombre de usuario" required/>
              </div>
            </div>

            {/* Fila de contraseña */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputContraseña">Contraseña</label>
                <input type="password" className="form-control" id="inputContraseña" placeholder="Ingresa tu contraseña" required/>
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
  );
}