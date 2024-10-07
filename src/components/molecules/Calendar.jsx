import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Inicializa el localizador de momento para usar con react-big-calendar
const localizer = momentLocalizer(moment);

// Lista de eventos de ejemplo
const events = [
  {
    title: 'Reunión de equipo',
    start: new Date(2024, 9, 10, 10, 0), // 10 de Octubre, 10:00 AM
    end: new Date(2024, 9, 10, 12, 0), // 10 de Octubre, 12:00 PM
    allDay: false,
  },
  {
    title: 'Llamada con cliente',
    start: new Date(2024, 9, 12, 14, 0), // 12 de Octubre, 2:00 PM
    end: new Date(2024, 9, 12, 15, 0), // 12 de Octubre, 3:00 PM
    allDay: false,
  },
  {
    title: 'Día completo de descanso',
    start: new Date(2024, 9, 15),
    end: new Date(2024, 9, 16),
    allDay: true,
  },
];

function MyCalendar() {
  return (
    <div style={{ height: '500px', margin: '50px' }}>
      <h2>Calendario de Eventos</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;
