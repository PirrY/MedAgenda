import React from 'react'; 
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Inicializa el localizador de momento para usar con react-big-calendar
const localizer = momentLocalizer(moment);

// Lista de eventos de ejemplo
const events = [
  {
    title: 'Reunión de equipo',
    start: new Date(2024, 9, 10, 10, 0),
    end: new Date(2024, 9, 10, 12, 0),
  },
  {
    title: 'Llamada con cliente',
    start: new Date(2024, 9, 12, 14, 0),
    end: new Date(2024, 9, 12, 15, 0),
  },
  {
    title: 'Día completo de descanso',
    start: new Date(2024, 9, 15),
    end: new Date(2024, 9, 16),
  },
];

export default function MyCalendar() {
  return (
    <div className="calendar" style={{ height: '500px', margin: '50px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']} // Asegúrate de incluir las vistas que necesitas
      />
    </div>
  );
}
