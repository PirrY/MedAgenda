import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/molecules/Header';
import './BDPersonal.css';

const BDPersonal = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    dr_nombre1: '',
    dr_nombre2: '',
    dr_apellido1: '',
    dr_apellido2: '',
    dr_especialidad: '',
    dr_telefono: '',
    dr_correo: '',
    pwd: '',
    dr_consultorio: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/doctores', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/doctores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }

      const data = await response.json();
      setResponseMessage(data.message);
      setFormData({
        dr_nombre1: '',
        dr_nombre2: '',
        dr_apellido1: '',
        dr_apellido2: '',
        dr_especialidad: '',
        dr_telefono: '',
        dr_correo: '',
        dr_consultorio: '',
      });
      fetchDoctors(); // Refresca la lista de doctores después de añadir uno nuevo
    } catch (error) {
      console.error('Error adding doctor:', error);
      setErrorMessage('Failed to add doctor. Please try again.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');
    } else {
      fetchDoctors();
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="personal-container">
        <h1 className="personal-title">Doctores</h1>

        {/* Formulario para añadir doctores */}
        <form className="add-doctor-form" onSubmit={handleSubmit}>
          <h2>Añadir Doctor</h2>
          <input
            type="text"
            name="dr_nombre1"
            placeholder="Primer Nombre"
            value={formData.dr_nombre1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dr_nombre2"
            placeholder="Segundo Nombre"
            value={formData.dr_nombre2}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dr_apellido1"
            placeholder="Primer Apellido"
            value={formData.dr_apellido1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dr_apellido2"
            placeholder="Segundo Apellido"
            value={formData.dr_apellido2}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dr_especialidad"
            placeholder="Especialidad"
            value={formData.dr_especialidad}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="dr_telefono"
            placeholder="Teléfono"
            value={formData.dr_telefono}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="dr_correo"
            placeholder="Correo Electrónico"
            value={formData.dr_correo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pwd"
            placeholder="Contraseña"
            value={formData.pwd}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dr_consultorio"
            placeholder="Consultorio"
            value={formData.dr_consultorio}
            onChange={handleChange}
            required
          />
          <button type="submit">Añadir Doctor</button>
        </form>

        {/* Mensajes de respuesta */}
        {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Tabla de doctores */}
        <table className="personal-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => {
              const key = doctor.dr_id || `${doctor.dr_nombre1 || 'unknown'}_${doctor.dr_apellido1 || 'unknown'}_${index}`;
              return (
                <tr key={key}>
                  <td>{doctor.dr_nombre1} {doctor.dr_apellido1}</td>
                  <td>{doctor.dr_especialidad}</td>
                  <td>{doctor.dr_telefono}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BDPersonal;
