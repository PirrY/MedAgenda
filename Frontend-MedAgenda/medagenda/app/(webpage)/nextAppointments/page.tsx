"use client";
import React, { useEffect, useState } from "react";
import CalendarComponent from "../../../components/organisms/Calendar";
import Heading from "../../../components/atoms/Heading";
import { FaCalendarAlt } from "react-icons/fa";
import { getPatientAppointments } from "../../../libs/appointmentService";
import { DoctorAppointmentView } from "../../../interfaces/appointment";

export default function PAppointments() {
    const [appointments, setAppointments] = useState<DoctorAppointmentView[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getPatientAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setAppointments([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <div className="flex items-center gap-3 mb-6">
                    <FaCalendarAlt className="text-[#2e7bb4] text-4xl" />
                    <Heading text="Próximas" highlight="Citas" />
                </div>
                <p className="text-gray-600 mb-10 text-center max-w-lg">
                    Consulta tus citas médicas agendadas, accede a sus detalles y organiza tu agenda fácilmente
                </p>

                <div className="w-full max-w-7xl">
                    <div className="bg-white rounded-2xl p-8 shadow-xl">
                        <CalendarComponent
                            appointments={appointments}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
