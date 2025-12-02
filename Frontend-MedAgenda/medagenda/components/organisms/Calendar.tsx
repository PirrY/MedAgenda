"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DoctorAppointmentView } from "../../interfaces/appointment";

interface CalendarComponentProps {
    appointments: DoctorAppointmentView[];
    isLoading?: boolean;
}

export default function CalendarComponent({ appointments, isLoading = false }: CalendarComponentProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const formattedDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "";

    // Convertir las citas del formato de la API al formato del calendario
    const calendarAppointments = appointments.map(appt => {
        const startDate = new Date(appt.start_date_time);
        const endDate = new Date(appt.end_date_time);

        return {
            id: appt.appointment_id,
            date: startDate.toISOString().split("T")[0],
            startTime: startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            endTime: endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            doctor: `${appt.first_name} ${appt.first_last_name}`,
            clinic: appt.clinic_name,
            description: appt.appointment_description || "Sin descripción",
            startDateTime: startDate,
        };
    });

    const events = calendarAppointments.filter((appt) => appt.date === formattedDate);

    // Ordenar eventos por hora
    events.sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());

    const tileClassName = ({ date }: { date: Date }) => {
        const formattedTileDate = date.toISOString().split("T")[0];
        const hasAppointment = calendarAppointments.some((appt) => appt.date === formattedTileDate);
        const isToday = formattedTileDate === new Date().toISOString().split("T")[0];

        if (hasAppointment) {
            return "highlight-date";
        }
        if (isToday) {
            return "today-date";
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando citas...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Calendario */}
            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md">
                    <Calendar
                        onChange={(value) => setSelectedDate(value as Date)}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        className="modern-calendar"
                        locale="es-ES"
                    />
                </div>
            </div>

            {/* Lista de citas del día seleccionado */}
            <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {selectedDate.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h3>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {events.length > 0 ? (
                            events.map((appt) => (
                                <div
                                    key={appt.id}
                                    className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-l-4 border-blue-600 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-semibold text-gray-800">
                                                {appt.startTime} - {appt.endTime}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-sm">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-gray-700"><strong>Doctor:</strong> {appt.doctor}</span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-gray-700"><strong>Clínica:</strong> {appt.clinic}</span>
                                        </div>

                                        {appt.description && appt.description !== "Sin descripción" && (
                                            <div className="flex items-start gap-2 mt-2 pt-2 border-t border-blue-200">
                                                <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="text-gray-600 italic">{appt.description}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-500">No hay citas para esta fecha</p>
                                <p className="text-sm text-gray-400 mt-1">Selecciona otra fecha en el calendario</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Estilos mejorados para el calendario */}
            <style jsx global>{`
                .modern-calendar {
                    width: 100%;
                    border: none;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    background: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                .modern-calendar .react-calendar__navigation {
                    margin-bottom: 1.5rem;
                    display: flex;
                    gap: 0.5rem;
                }

                .modern-calendar .react-calendar__navigation button {
                    color: #2563eb;
                    min-width: 44px;
                    background: none;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                }

                .modern-calendar .react-calendar__navigation button:hover {
                    background-color: #eff6ff;
                }

                .modern-calendar .react-calendar__navigation button:disabled {
                    background-color: transparent;
                    color: #cbd5e1;
                }

                .modern-calendar .react-calendar__month-view__weekdays {
                    text-transform: uppercase;
                    font-weight: 600;
                    font-size: 0.75rem;
                    color: #64748b;
                    margin-bottom: 0.5rem;
                }

                .modern-calendar .react-calendar__tile {
                    padding: 0.75rem 0.25rem;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                    font-weight: 500;
                    color: #334155;
                }

                .modern-calendar .react-calendar__tile:hover {
                    background-color: #f1f5f9;
                }

                .modern-calendar .react-calendar__tile--active {
                    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                    color: white;
                    font-weight: 600;
                }

                .modern-calendar .react-calendar__tile--now {
                    background-color: #fef3c7;
                    color: #92400e;
                    font-weight: 600;
                }

                .modern-calendar .highlight-date {
                    background: linear-gradient(135deg, #10b981 0%, #34d399 100%) !important;
                    color: white !important;
                    font-weight: 700 !important;
                    position: relative;
                }

                .modern-calendar .highlight-date::after {
                    content: '•';
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 1.5rem;
                    line-height: 0;
                    color: white;
                }

                .modern-calendar .react-calendar__tile--active.highlight-date {
                    background: linear-gradient(135deg, #059669 0%, #10b981 100%) !important;
                }
            `}</style>
        </div>
    );
}
