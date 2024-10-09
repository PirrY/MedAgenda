import React, { useState } from 'react';
import './BDClientes.css'; 
import Header from '../components/molecules/Header'; 

// Lista de clientes ejemplo
const clientesData = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '123-456-7890' },
  { id: 2, nombre: 'María Gómez', email: 'maria.gomez@example.com', telefono: '987-654-3210' },
  { id: 3, nombre: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', telefono: '456-789-1234' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@example.com', telefono: '789-123-4567' },
];

export default function MostrarClientes() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra la lista de clientes
  const filteredClientes = clientesData.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header implementado */}
      <Header />

      {/* Contenido de la lista de clientes */}
      <div className="clientes-container">
        <h1 className="clientes-title">Lista de Clientes</h1>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar cliente por nombre o correo..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Tabla con la lista de clientes */}
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
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
