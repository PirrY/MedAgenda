import React, { useState, useEffect } from 'react';
import './BDPersonal.css'; 
import Header from '../components/molecules/Header'; 

export default function MostrarPersonal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    dr_nombre1: '',
    dr_nombre2: '',
    dr_apellido1: '',
    dr_apellido2: '',
    dr_especialidad: '',
    dr_telefono: '',
    dr_correo: '',
    dr_consultorio: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/doctores') // Ensure this is the correct port
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/doctores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDoctor),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error adding doctor');
        return response.json();
      })
      .then((data) => {
        console.log('Doctor added:', data);
        setDoctors((prevDoctors) => [...prevDoctors, { dr_id: data.id, ...newDoctor }]);
        setNewDoctor({
          dr_nombre1: '',
          dr_nombre2: '',
          dr_apellido1: '',
          dr_apellido2: '',
          dr_especialidad: '',
          dr_telefono: '',
          dr_correo: '',
          dr_consultorio: '',
        });
      })
      .catch((error) => console.error('Error adding doctor:', error));
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.dr_nombre1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.dr_correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="personal-container">
        <h1 className="personal-title">Lista de Personal</h1>

        <form className="new-client-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="dr_nombre1"
            placeholder="Nombre 1"
            value={newDoctor.dr_nombre1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dr_nombre2"
            placeholder="Nombre 2"
            value={newDoctor.dr_nombre2}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dr_apellido1"
            placeholder="Apellido 1"
            value={newDoctor.dr_apellido1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dr_apellido2"
            placeholder="Apellido 2"
            value={newDoctor.dr_apellido2}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dr_especialidad"
            placeholder="Especialidad"
            value={newDoctor.dr_especialidad}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dr_telefono"
            placeholder="Teléfono"
            value={newDoctor.dr_telefono}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="dr_correo"
            placeholder="Correo"
            value={newDoctor.dr_correo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dr_consultorio"
            placeholder="Consultorio"
            value={newDoctor.dr_consultorio}
            onChange={handleChange}
          />
          <button type="submit">Agregar Doctor</button>
        </form>

        <input
          type="text"
          placeholder="Buscar empleado por nombre o correo..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="personal-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.dr_id}>
                <td>{doctor.dr_id}</td>
                <td>{`${doctor.dr_nombre1} ${doctor.dr_nombre2 || ''} ${doctor.dr_apellido1} ${doctor.dr_apellido2 || ''}`.trim()}</td>
                <td>{doctor.dr_correo}</td>
                <td>{doctor.dr_telefono}</td>
                <td>{doctor.dr_especialidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
