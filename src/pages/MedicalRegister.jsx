import React, { useState } from 'react';
import Header from '../components/molecules/Header';
import './MedicalRegister.css';

export function Register() {
  // Estado para capturar los datos del formulario
  const [formData, setFormData] = useState({
    inputNombres: '',
    inputApellidos: '',
    inputCedula: '',
    inputTelefono: '',
    inputCentroTrabajo: '',
    inputCorreoProfesional: '',
    inputExperiencia: '',
    inputUniversidad: '',
    inputEspecialidad: '',
    inputCertificacion: '',
    inputLicencia: '',
    inputUsuario: '',
    inputContraseña: ''
  });

  // Maneja el cambio de valores en los campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Envía los datos del formulario al servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mapea los datos para enviarlos con los nombres de columnas esperados por el backend
    const mappedData = {
      dr_nombre1: formData.inputNombres,
      dr_apellido1: formData.inputApellidos,
      cedula: formData.inputCedula,
      dr_telefono: formData.inputTelefono,
      dr_consultorio: formData.inputCentroTrabajo,
      dr_correo: formData.inputCorreoProfesional,
      experiencia: formData.inputExperiencia,
      universidad: formData.inputUniversidad,
      dr_especialidad: formData.inputEspecialidad,
      certificacion: formData.inputCertificacion,
      licencia: formData.inputLicencia,
      usuario: formData.inputUsuario,
      contraseña: formData.inputContraseña
    };

    fetch('http://localhost:5000/api/doctores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mappedData)
    })
      .then(response => {
        if (response.ok) {
          alert('Usuario registrado con éxito');
        } else {
          alert('Error al registrar usuario');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Header />
      <div className='register'>
        <center>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 className="form-title">Formulario de Registro Médico</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputNombres">Nombres</label>
                  <input type="text" className="form-control" id="inputNombres" value={formData.inputNombres} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputApellidos">Apellidos</label>
                  <input type="text" className="form-control" id="inputApellidos" value={formData.inputApellidos} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCedula">Cédula</label>
                  <input type="text" className="form-control" id="inputCedula" value={formData.inputCedula} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTelefono">Teléfono</label>
                  <input type="text" className="form-control" id="inputTelefono" value={formData.inputTelefono} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCentroTrabajo">Centro de trabajo</label>
                  <input type="text" className="form-control" id="inputCentroTrabajo" value={formData.inputCentroTrabajo} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCorreoProfesional">Correo Profesional</label>
                  <input type="email" className="form-control" id="inputCorreoProfesional" value={formData.inputCorreoProfesional} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputExperiencia">Años de experiencia</label>
                  <input type="number" className="form-control" id="inputExperiencia" value={formData.inputExperiencia} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputUniversidad">Universidad de egreso</label>
                  <input type="text" className="form-control" id="inputUniversidad" value={formData.inputUniversidad} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEspecialidad">Especialidad médica</label>
                  <input type="text" className="form-control" id="inputEspecialidad" value={formData.inputEspecialidad} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCertificacion">Certificación médica</label>
                  <input type="text" className="form-control" id="inputCertificacion" value={formData.inputCertificacion} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputLicencia">Número de licencia médica</label>
                  <input type="text" className="form-control" id="inputLicencia" value={formData.inputLicencia} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputUsuario">Nombre de usuario</label>
                  <input type="text" className="form-control" id="inputUsuario" value={formData.inputUsuario} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputContraseña">Contraseña</label>
                  <input type="password" className="form-control" id="inputContraseña" value={formData.inputContraseña} onChange={handleChange} required />
                </div>
              </div>

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

