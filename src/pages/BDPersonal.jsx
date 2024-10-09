import React, { useState } from 'react';
import './BDPersonal.css'; 
import Header from '../components/molecules/Header'; 

const personalData = [
  { id: 1, nombre: 'Santiago Jiménez', email: 'santiago.jimenezc@autonoma.edu.co', telefono: '123-456-7890', especialidad: 'Pediatra' },
  
];

export default function MostrarPersonal() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersonal = personalData.filter((trabajador) =>
    trabajador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header implementado */}
      <Header />

      {/* Contenido de la lista de personal */}
      <div className="personal-container">
        <h1 className="personal-title">Lista de Personal</h1>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar empleado por nombre o correo..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Tabla con la lista de trabajadores */}
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
            {filteredPersonal.map((trabajador) => (
              <tr key={trabajador.id}>
                <td>{trabajador.id}</td>
                <td>{trabajador.nombre}</td>
                <td>{trabajador.email}</td>
                <td>{trabajador.telefono}</td>
                <td>{trabajador.especialidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
