import React, { useEffect } from 'react';
import './CalendarioAdmin.css'; 
import Header from '../components/molecules/Header'; 
import MyCalendar from '../components/molecules/Calendar'; 
import { useNavigate } from 'react-router-dom';

export default function ShowCalendar() {
  const navigate = useNavigate();

  // Check if the user is authenticated when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');  // Redirect to login page if not authenticated
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="calendario-container">
        {/* Componente de Calendario */}
        <MyCalendar />
      </div>
    </div>
  );
}
