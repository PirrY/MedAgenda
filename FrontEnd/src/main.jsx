import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home, Login, Account, Register, ADashboard, MostrarClientes, ShowCalendar, MostrarPersonal, MedicalDirectory, MedicalServices, NovedadesYMedios, PatientRegistry } from './pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const router = createBrowserRouter([
  { path: '/', element: <Home/>},
  { path: '/Account', element: <Account/>},
  { path: '/Login', element: <Login/>},
  { path: '/MedicalRegister', element: <Register/>},
  { path: '/AHome', element: <ADashboard/>},
  { path: '/BDClientes', element: <MostrarClientes/>},
  { path: '/ACalendar', element: <ShowCalendar/>},
  { path: '/BDPersonal', element: <MostrarPersonal/>},
  { path: '/MedicalDirectory', element: <MedicalDirectory/>},
  { path: '/MedicalServices', element: <MedicalServices/>},
  { path: '/Novedades', element: <NovedadesYMedios/>},
  { path: '/PatientRegistry', element: <PatientRegistry/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    <RouterProvider router={router}/>
  </StrictMode>,
)
