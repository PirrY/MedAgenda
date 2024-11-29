import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/molecules/Header';
import './BDClientes.css';

const BDClientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPatient, setNewPatient] = useState({
    nombre1_paciente: '',
    nombre2_paciente: '',
    apellido1_paciente: '',
    apellido2_paciente: '',
    cedula_paciente: '',
    telefono_paciente: '',
    correo_paciente: '',
    direccion_paciente: ''
  });
  
  // Nuevo estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');
    }
  }, [navigate]);

  const fetchPacientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/pacientes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pacientes');
      }
      const data = await response.json();
      setPacientes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPacientes([]); // Ensure pacientes is always an array
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handlePatientClick = async (id) => {
    setSelectedPatient(id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/pacientes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPatientDetails(data);

      const appointmentResponse = await fetch(`http://localhost:5000/api/pacientes/${id}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const appointmentData = await appointmentResponse.json();
      setAppointmentHistory(appointmentData);

      const prescriptionResponse = await fetch(`http://localhost:5000/api/pacientes/${id}/recetas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const prescriptionData = await prescriptionResponse.json();
      setPrescriptions(prescriptionData);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newPatient),
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      const addedPatient = await response.json();
      setPacientes((prev) => [...prev, { ...newPatient, id_paciente: addedPatient.id }]);
      setNewPatient({ 
        nombre1_paciente: '',
        nombre2_paciente: '',
        apellido1_paciente: '',
        apellido2_paciente: '',
        cedula_paciente: '',
        telefono_paciente: '',
        correo_paciente: '',
        direccion_paciente: ''
      });
    } catch (error) {
      console.error('Error adding new patient:', error);
    }
  };

  // Filtrar pacientes por nombre o cédula
  const filteredPatients = pacientes.filter((paciente) => {
    const fullName = `${paciente.nombre1_paciente} ${paciente.nombre2_paciente} ${paciente.apellido1_paciente} ${paciente.apellido2_paciente}`.toLowerCase();
    const cedula = paciente.cedula_paciente.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || cedula.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Header />
      <div className="clientes-container">
        <h1 className="clientes-title">Pacientes</h1>
        
        <form onSubmit={handleAddPatient} className='clientes-form'>
          <h2>Añadir Nuevo Paciente</h2>
          <input
            type="text"
            className='input_text'
            name="nombre1_paciente"
            placeholder="Nombre 1"
            value={newPatient.nombre1_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            className='input_text'
            name="nombre2_paciente"
            placeholder="Nombre 2"
            value={newPatient.nombre2_paciente}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className='input_text'
            name="apellido1_paciente"
            placeholder="Apellido 1"
            value={newPatient.apellido1_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            className='input_text'
            name="apellido2_paciente"
            placeholder="Apellido 2"
            value={newPatient.apellido2_paciente}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className='input_text'
            name="cedula_paciente"
            placeholder="Cédula"
            value={newPatient.cedula_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            className='input_text'
            name="telefono_paciente"
            placeholder="Teléfono"
            value={newPatient.telefono_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            className='input_text'
            name="correo_paciente"
            placeholder="Correo"
            value={newPatient.correo_paciente}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className='input_text'
            name="direccion_paciente"
            placeholder="Dirección"
            value={newPatient.direccion_paciente}
            onChange={handleInputChange}
          />
          <button type="submit" className='form-button'>Añadir Paciente</button>
        </form>

        {/* Input para la búsqueda */}
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Buscar paciente..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((paciente) => (
              <tr key={paciente.id_paciente} onClick={() => handlePatientClick(paciente.id_paciente)}>
                <td>{paciente.nombre1_paciente} {paciente.nombre2_paciente}</td>
                <td>{paciente.cedula_paciente}</td>
                <td>{paciente.telefono_paciente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BDClientes;
