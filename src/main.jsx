import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home, Login, Account, Register } from './pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home/>},
  { path: '/', element: <Account/>},
  { path: '/', element: <Login/>},
  { path: '/', element: <Register/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    <RouterProvider router={router}/>
  </StrictMode>,
)
