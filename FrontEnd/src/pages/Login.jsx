import React, { useState } from 'react';
import './Login.css';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before login attempt

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pwd: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save token
        navigate('/ahome'); // Redirect to AHome page
      } else {
        setError(data.error || 'Error al iniciar sesión.'); // Display backend error
      }
    } catch (err) {
      setError('Error de red. Por favor, inténtalo más tarde.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <div className="login-page">
        <Header />
        <h1 className="text-h1">Iniciar Sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Nombre de usuario:</label>
          <input
            type="email"
            placeholder="Ingrese su correo  "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión como Doctor</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}
