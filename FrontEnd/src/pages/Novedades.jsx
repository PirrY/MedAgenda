import React from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import './Novedades.css';

export function NovedadesYMedios() {
    return (
        <div>
            <Header />
            <div className='NovedadesYMedios'>
                <center>
                    <h1 className="form-title">Novedades y Medios Disponibles</h1>
                </center>
                <div className="infographic">
                    <div className="circle-section section-1">
                        <img src="\src\img\recordatorios.jpg" alt="Recordatorios" className="image-icon" />
                        <p>Integración de Recordatorios Automatizados: Los pacientes recibirán recordatorios automáticos
                            para citas y seguimiento de tratamientos, optimizando la puntualidad y asistencia.</p>
                    </div>
                    <div className="circle-section section-2">
                        <img src="\src\img\historialMedico.jpg" alt="Historial Médico" className="image-icon" />
                        <p>Mejora de la Usabilidad en el Historial Médico: Nueva interfaz para un acceso rápido y
                            organizado a los datos médicos de cada paciente.</p>
                    </div>
                    <div className="circle-section section-3">
                        <img src="\src\img\RecetasMedicas.jpg" alt="Recetas Electrónicas" className="image-icon" />
                        <p>Actualización de Recetas Electrónicas: Ahora se pueden enviar recetas electrónicas de manera
                            más rápida y segura a farmacias asociadas.</p>
                    </div>
                    <div className="circle-section section-4">
                        <img src="\src\img\videoconsulta.jpg" alt="Videoconsultas" className="image-icon" />
                        <p>Soporte de Videoconsultas: Función de videollamadas para consultas remotas entre médicos y pacientes,
                            integrando una interfaz simple y segura.</p>
                    </div>
                    <div className="circle-section section-5">
                        <img src="\src\img\NotificacionesMedicas.jpg" alt="Correo Electrónico" className="image-icon" />
                        <p>Correo Electrónico: Envío de notificaciones y confirmaciones de citas.</p>
                    </div>
                    <div className="circle-section section-6">
                        <img src="\src\img\MensajeriaSMS.jpg" alt="Mensajería SMS" className="image-icon" />
                        <p>Mensajería SMS: Recordatorios de citas y avisos de seguimiento directo a los celulares de los pacientes.</p>
                    </div>
                </div>
            </div>
            <div className="Footer-space">
                <Footer />
            </div>
        </div>
    );
}
