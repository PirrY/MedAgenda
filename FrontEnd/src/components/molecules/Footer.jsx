import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        {/* Divider antes del footer */}
        <div className="b-example-divider"></div>

        <footer className="py-5 border-top">
          <div className="row">
            {/* Sección de Navegación */}
            <div className="col-6 col-md-2 mb-3">
              <h5>Navegación</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-body-secondary">Home</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/Login" className="nav-link p-0 text-body-secondary">Iniciar sesión</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/PatientRegistry" className="nav-link p-0 text-body-secondary">Registrarse</a>
                </li>
              </ul>
            </div>

            {/* Sección de Contenidos de Bienestar */}
            <div className="col-6 col-md-2 mb-3">
              <h5>Contenidos de Bienestar</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/MedicalServices" className="nav-link p-0 text-body-secondary">Servicios médicos</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">Directorio médico</a>
                </li>
              </ul>
            </div>

            {/* Sección de Políticas */}
            <div className="col-6 col-md-2 mb-3">
              <h5>Políticas de privacidad y uso</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">Recopilación de información</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">Protección de datos</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">Uso de la información</a>
                </li>
              </ul>
            </div>

            {/* Sección de Formulario */}
            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Recibe información en tu correo</h5>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                  <input id="newsletter1" type="email" className="form-control" placeholder="Email address" />
                  <button className="btn btn-primary" type="submit">Aceptar</button>
                </div>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="d-flex justify-content-between py-3 my-4 border-top">
            <p className="mb-0 text-body-secondary">&copy; 2024 MedAgenda, Inc</p>
            <ul className="nav justify-content-end">
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

