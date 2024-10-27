import React, { useState, useEffect } from 'react';
import './BDClientes.css'; 
import Header from '../components/molecules/Header'; 

export default function MostrarClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({
    nombre1_paciente: '',
    nombre2_paciente: '', // Added this field
    apellido1_paciente: '',
    apellido2_paciente: '', // Added this field
    cedula_paciente: '', // Added this field
    telefono_paciente: '',
    correo_paciente: '',
    direccion_paciente: '' // Added this field
  });
  const [clientesData, setClientesData] = useState([]);

  // Fetch the patient list from the server
  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/pacientes");
      const data = await response.json();
      setClientesData(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchClientes(); // Fetch patients when the component mounts
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      console.log("Response Status:", response.status); 

      if (response.ok) {
        alert("Client added successfully!");
       
        setNewClient({
          nombre1_paciente: '',
          nombre2_paciente: '',
          apellido1_paciente: '',
          apellido2_paciente: '',
          cedula_paciente: '',
          telefono_paciente: '',
          correo_paciente: '',
          direccion_paciente: ''
        });
        fetchClientes(); 
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData); 
        alert("Error adding client");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const filteredClientes = clientesData.filter((cliente) =>
    cliente.nombre1_paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.correo_paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="clientes-container">
        <h1 className="clientes-title">Lista de Clientes</h1>

        <input
          type="text"
          placeholder="Buscar cliente por nombre o correo..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id_paciente}>
                <td>{cliente.id_paciente}</td>
                <td>{cliente.nombre1_paciente} {cliente.apellido1_paciente}</td>
                <td>{cliente.correo_paciente}</td>
                <td>{cliente.telefono_paciente}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form to add new client */}
        <h2>Agregar Nuevo Cliente</h2>
        <form onSubmit={handleSubmit} className="add-client-form">
          <input
            type="text"
            name="nombre1_paciente"
            placeholder="Nombre"
            value={newClient.nombre1_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="nombre2_paciente"
            placeholder="Segundo Nombre"
            value={newClient.nombre2_paciente}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellido1_paciente"
            placeholder="Apellido"
            value={newClient.apellido1_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="apellido2_paciente"
            placeholder="Segundo Apellido"
            value={newClient.apellido2_paciente}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cedula_paciente"
            placeholder="Cédula"
            value={newClient.cedula_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="telefono_paciente"
            placeholder="Teléfono"
            value={newClient.telefono_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="correo_paciente"
            placeholder="Email"
            value={newClient.correo_paciente}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="direccion_paciente"
            placeholder="Dirección"
            value={newClient.direccion_paciente}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Agregar Cliente</button>
        </form>
      </div>
    </div>
  );
}
