import React from 'react'
import Header from '../components/molecules/Header'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      <Header />
      <h1>Bienvenido a MedAgenda</h1>
      <img src = "/src/img/imgMedicos.jpg" align="right" alt = "" height={300} width={400} />
    </div>
  );
}
