"use client";
import React from "react";
import Calendar from "../../../components/organisms/Calendar";
import Heading from "../../../components/atoms/Heading";
import { FaCalendarAlt } from "react-icons/fa";

export default function PAppointments() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header Section */}
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <div className="flex items-center gap-3 mb-6">
                    <FaCalendarAlt className="text-[#2e7bb4] text-4xl" />
                    <Heading text="Próximas" highlight="Citas" />
                </div>
                <p className="text-gray-600 mb-10 text-center max-w-lg">
                    Consulta tus citas médicas agendadas, accede a sus detalles y organiza tu agenda fácilmente
                </p>

                {/* Calendar Container */}
                <div className="shadow-xl rounded-2xl p-8 w-full max-w-4xl border-4"
                style={{ borderColor: "#4682B4", backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                >
                    <Calendar />
                </div>
            </main>
        </div>
    );
}
