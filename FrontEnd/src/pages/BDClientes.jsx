import React, { useEffect, useState } from 'react';
import Header from '../components/molecules/Header'; 
import './BDClientes.css'; 

const BDClientes = () => {
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

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pacientes');
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPacientes();
  }, []);

  const handlePatientClick = async (id) => {
    setSelectedPatient(id);
    try {
      const response = await fetch(`http://localhost:5000/api/pacientes/${id}`);
      const data = await response.json();
      setPatientDetails(data);

      const appointmentResponse = await fetch(`http://localhost:5000/api/pacientes/${id}/appointments`);
      const appointmentData = await appointmentResponse.json();
      setAppointmentHistory(appointmentData);

      const prescriptionResponse = await fetch(`http://localhost:5000/api/pacientes/${id}/recetas`);
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
      const response = await fetch('http://localhost:5000/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  return (
    <div>
    <Header /> {/* Include the Header component */}
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
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Buscar paciente..." 
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
          {pacientes.map((paciente) => (
            <tr key={paciente.id_paciente} onClick={() => handlePatientClick(paciente.id_paciente)}>
              <td>{paciente.nombre1_paciente} {paciente.apellido1_paciente}</td>
              <td>{paciente.cedula_paciente}</td>
              <td>{paciente.telefono_paciente}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {patientDetails && (
        <div className="patient-details-container">
          <h2 className="patient-details-title">Detalles del Paciente</h2>
          <div className="patient-info">
            <h3 className="patient-info-header">Información Personal</h3>
            <p>Nombre: {patientDetails.nombre1_paciente} {patientDetails.apellido1_paciente}</p>
            <p>Cédula: {patientDetails.cedula_paciente}</p>
            <p>Teléfono: {patientDetails.telefono_paciente}</p>
            <p>Correo: {patientDetails.correo_paciente}</p>
          </div>
          <div className="patient-history">
            <h3 className="patient-history-header">Historial de Citas</h3>
            <ul>
              {appointmentHistory.map((appointment) => (
                <li key={appointment.id_cita}>
                  Fecha: {appointment.fecha_hora_cita}, Motivo: {appointment.motivo}, Estado: {appointment.estado_cita}
                </li>
              ))}
            </ul>
          </div>
          <div className="patient-history">
            <h3 className="patient-prescriptions-header">Recetas Médicas</h3>
            <ul>
              {prescriptions.map((prescription) => (
                <li key={prescription.id_receta}>
                  Descripción: {prescription.descripcion_receta}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default BDClientes;
