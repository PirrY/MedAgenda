import React from 'react';
import './CalendarioAdmin.css'; 
import Header from '../components/molecules/Header'; 
import MyCalendar from '../components/molecules/Calendar'; 

export default function ShowCalendar() {
  return (
    <div>
      {/* Header implementado */}
      <Header />

      {/* Contenido del calendario */}
      <div className="calendario-container">
        <h1 className="calendario-title">Calendario</h1>
        
        {/* Componente de Calendario */}
        <MyCalendar />
      </div>
    </div>
  );
}

