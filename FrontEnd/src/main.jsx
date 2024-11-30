import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route

import { Home, Login, ADashboard, MostrarClientes, ShowCalendar, MostrarPersonal, MedicalServices, NovedadesYMedios, MedicalDirectory, ProteccionDatos, RecopilacionInfo, UsoInfo} from './pages';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="medicalServices" element={<MedicalServices/>}/>
        <Route path="Novedades" element={<NovedadesYMedios/>}/>
        <Route path="medicalDirectory" element={<MedicalDirectory/>}/>
        <Route path="proteccionDatos" element={<ProteccionDatos/>}/>
        <Route path="recopilacionInfo" element={<RecopilacionInfo/>}/>
        <Route path="usoInfo" element={<UsoInfo/>}/>
        <Route 
          path="/AHome" 
          element={
            <PrivateRoute>
              <ADashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/BDClientes" 
          element={
            <PrivateRoute>
              <MostrarClientes />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ACalendar" 
          element={
            <PrivateRoute>
              <ShowCalendar />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/BDPersonal" 
          element={
            <PrivateRoute>
              <MostrarPersonal />
            </PrivateRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
