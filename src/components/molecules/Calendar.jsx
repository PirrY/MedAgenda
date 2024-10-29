import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    motivo: '',
    id_paciente_invol: '',
    id_dr_encar: '',
    start: '',
    end: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/citas');
      const formattedEvents = response.data.map(appointment => ({
        id: appointment.id_cita,
        title: appointment.motivo,
        start: new Date(appointment.fecha_hora_cita),
        end: new Date(new Date(appointment.fecha_hora_cita).getTime() + 30 * 60000), 
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSelect = ({ start }) => {
    setSelectedSlot(start);
    setAppointmentDetails({ ...appointmentDetails, start: start, end: start }); 
    setModalIsOpen(true);
  };

  const handleEventClick = (event) => {
    setAppointmentDetails({
      motivo: event.title,
      id_paciente_invol: '', 
      id_dr_encar: '', 
      start: event.start,
      end: event.end,
    });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formattedStart = moment(appointmentDetails.start).format('YYYY-MM-DD HH:mm:ss');
    const formattedEnd = moment(appointmentDetails.end).format('YYYY-MM-DD HH:mm:ss');

    const newAppointment = {
      fecha_hora_cita: formattedStart, 
      ...appointmentDetails,
      estado_cita: 'Activa',
    };

    try {
      await axios.post('http://localhost:5000/api/citas', newAppointment);
      alert('Appointment scheduled successfully');
      fetchAppointments(); 
      closeModal(); 
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAppointmentDetails({
      motivo: '',
      id_paciente_invol: '',
      id_dr_encar: '',
      start: '',
      end: '',
    });
  };

  return (
    <div className="calendario-container">
      <h1 className="calendario-title">Calendario</h1>
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelect}
          onSelectEvent={handleEventClick} 
          style={{ height: 500, margin: '20px 0' }} 
        />
      </div>
      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{appointmentDetails.motivo ? 'Editar Cita' : 'Agendar Cita'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Razón: </label>
            <input
              type="text"
              name="motivo"
              value={appointmentDetails.motivo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>ID Paciente: </label>
            <input
              type="text"
              name="id_paciente_invol"
              value={appointmentDetails.id_paciente_invol}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>ID Doctor: </label>
            <input
              type="text"
              name="id_dr_encar"
              value={appointmentDetails.id_dr_encar}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Hora Inicio: </label>
            <input
              type="datetime-local"
              name="start"
              value={moment(appointmentDetails.start).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Hora fin: </label>
            <input
              type="datetime-local"
              name="end"
              value={moment(appointmentDetails.end).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Confirmar</button>
          <button type="button" onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
};

export default MyCalendar;
