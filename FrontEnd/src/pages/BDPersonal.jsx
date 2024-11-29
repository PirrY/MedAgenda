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
