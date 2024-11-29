import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/molecules/Header';
import './BDPersonal.css';

const BDPersonal = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  
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
              // Ensure the key is always unique, fallback to a combination of doctor details
              const key = doctor.id_doctor || `${doctor.nombre || 'unknown'}_${doctor.apellido || 'unknown'}_${index}`;
              return (
                <tr key={key}>
                  <td>{doctor.nombre} {doctor.apellido}</td>
                  <td>{doctor.especialidad}</td>
                  <td>{doctor.telefono}</td>
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
