"use client";
import React from 'react';
import { FaGraduationCap, FaUsers, FaHeart, FaLightbulb, FaChalkboardTeacher, FaHospital, FaCalendarAlt, FaUserMd } from 'react-icons/fa';

export default function AboutUsPage() {
  const teamMembers = [
    { name: "Diana Sofia Paque", role: "Desarrolladora Full Stack" },
    { name: "Miguel Sobando", role: "Desarrollador Frontend" },
    { name: "Santiago Cochini", role: "Desarrollador Backend" },
    { name: "Daniel Giraldo", role: "Jefe de Procrastinación" },
  ];

  const features = [
    {
      icon: FaUserMd,
      title: "Conexión Directa",
      description: "Conectamos pacientes con doctores de manera eficiente y confiable"
    },
    {
      icon: FaHospital,
      title: "Para Clínicas",
      description: "Plataforma completa para que clínicas independientes gestionen sus operaciones"
    },
    {
      icon: FaCalendarAlt,
      title: "Gestión de Citas",
      description: "Sistema intuitivo para agendar, modificar y gestionar citas médicas"
    },
    {
      icon: FaHeart,
      title: "Comunicación Efectiva",
      description: "Facilita la comunicación entre pacientes, doctores y administradores"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#4682B4] to-[#5C95FF] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Acerca de <span className="text-cyan-300">MedAgenda</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Revolucionando la gestión de citas médicas para clínicas independientes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Proyecto Académico */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <FaGraduationCap className="text-5xl text-[#4682B4]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Proyecto Académico
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                MedAgenda es un proyecto desarrollado por estudiantes de la{" "}
                <span className="font-semibold text-[#4682B4]">Universidad Autónoma de Manizales</span>,
                como parte de la materia de{" "}
                <span className="font-semibold text-[#4682B4]">Programación Frontend</span>,
                bajo la guía del profesor{" "}
                <span className="font-semibold text-[#4682B4]">Cristian Gutiérrez</span>.
              </p>
              <p>
                Nuestro objetivo es crear una solución tecnológica que facilite la conexión entre
                pacientes y profesionales de la salud, mientras proporcionamos a las clínicas independientes
                una plataforma moderna, eficiente y fácil de usar para gestionar sus operaciones diarias.
              </p>
            </div>
          </div>
        </div>

        {/* Nuestra Misión */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestra Misión
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4682B4] to-[#5C95FF] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="text-[#4682B4] text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo de Desarrollo */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaUsers className="text-4xl text-[#4682B4]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Nuestro Equipo
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cuatro estudiantes comprometidos trabajando juntos para crear una solución innovadora
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4682B4] to-[#5C95FF] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-[#4682B4] font-semibold mb-3">
                  {member.role}
                </p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Universidad Autónoma de Manizales
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologías y Aprendizaje */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-[#4682B4] to-[#5C95FF] rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-4 mb-6">
              <FaLightbulb className="text-5xl text-cyan-300" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Tecnologías Utilizadas
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Frontend</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Next.js 15 con App Router
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    React 19 & TypeScript
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    React Hook Form & Zod
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Características</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Autenticación JWT
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Gestión de roles (Admin, Doctor, Paciente)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Diseño responsive
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                    Interfaz intuitiva y moderna
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Agradecimientos */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <FaChalkboardTeacher className="text-6xl text-[#4682B4] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Agradecimientos Especiales
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-4">
            Queremos expresar nuestro profundo agradecimiento al profesor{" "}
            <span className="font-bold text-[#4682B4]">Cristian Gutiérrez</span> por su
            guía, conocimientos y apoyo durante el desarrollo de este proyecto.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Este proyecto representa no solo un requisito académico, sino también
            nuestro compromiso con el aprendizaje y el desarrollo de soluciones
            tecnológicas que puedan tener un impacto positivo en el sector salud.
          </p>
        </div>

      </div>

      {/* Footer Call to Action */}
      <div className="bg-gradient-to-r from-[#4682B4] to-[#5C95FF] py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Listo para mejorar la gestión de tu clínica?
          </h3>
          <p className="text-blue-100 text-lg mb-6">
            Únete a MedAgenda y descubre una nueva forma de conectar con tus pacientes
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-[#4682B4] px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Comenzar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}
