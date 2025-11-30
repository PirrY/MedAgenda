"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const appointments = [
        {
            id: 1,
            date: "2025-12-01", 
            time: "10:00 AM",
            doctor: "Dr. David Martínez",
            specialty: "Cardiología",
        },
        {
            id: 2,
            date: "2025-12-02", 
            time: "2:30 PM",
            doctor: "Dra. Laura Gómez",
            specialty: "Dermatología",
        },
    ];

    const formattedDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "";

    const events = appointments.filter((appt) => appt.date === formattedDate);

    const tileClassName = ({ date }: { date: Date }) => {
        const formattedTileDate = date.toISOString().split("T")[0];
        if (appointments.some((appt) => appt.date === formattedTileDate)) {
            return "highlight-date";
        }
    };

    return (
        <div className="flex flex-col items-center px-6 py-16">

            <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                tileClassName={tileClassName} 
            />

            <div className="w-full max-w-lg mt-6">
                {formattedDate ? (
                    events.length > 0 ? (
                        events.map((appt) => (
                            <div key={appt.id} className="border rounded-xl p-4 mb-4 shadow-sm">
                                <p><strong>📅 Fecha:</strong> {appt.date}</p>
                                <p><strong>⏰ Hora:</strong> {appt.time}</p>
                                <p><strong>👨‍⚕️ Médico:</strong> {appt.doctor}</p>
                                <p><strong>🏥 Especialidad:</strong> {appt.specialty}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4 text-center">No hay citas para esta fecha.</p>
                    )
                ) : (
                    <p className="text-gray-500 mt-4 text-center">Selecciona una fecha para ver tus citas.</p>
                )}
            </div>

            {/* Estilos para resaltar la fecha */}
            <style jsx global>{`
                .highlight-date {
                    background-color: #c4f5d4 !important;
                    border-radius: 50% !important;
                    color: #146b4a !important;
                    font-weight: bold !important;
                    border: 2px solid #20936d !important;
                }
            `}</style>
        </div>
    );
}
