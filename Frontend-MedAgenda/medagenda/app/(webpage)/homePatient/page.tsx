"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCalendarCheck, FaFileMedical, FaStethoscope } from "react-icons/fa";
import CalendarComponent from "../../../components/organisms/Calendar";
import useAuth from "../../../hooks/useAuth";
import { getPatientAppointments } from "../../../libs/appointmentService";
import { DoctorAppointmentView } from "../../../interfaces/appointment";

export default function PHome() {
    const router = useRouter();
    const { getFirstName, isLoading: authLoading } = useAuth();
    const [appointments, setAppointments] = useState<DoctorAppointmentView[]>([]);
    const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getPatientAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setAppointments([]);
            } finally {
                setIsLoadingAppointments(false);
            }
        };

        fetchAppointments();
    }, []);

    const firstName = getFirstName();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <main className="flex-grow flex flex-col items-center px-6 py-12">
                {/* Saludo personalizado */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                        {authLoading ? (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                Bienvenido
                            </span>
                        ) : (
                            <>
                                Hola,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                    {firstName || "Paciente"}
                                </span>
                            </>
                        )}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Gestiona tu salud de manera fácil y rápida
                    </p>
                </div>

                {/* Calendario de citas */}
                <div className="w-full max-w-7xl mb-12">
                    <div className="bg-white rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <FaCalendarCheck className="text-blue-600 text-3xl" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Tus Próximas Citas
                            </h2>
                        </div>
                        <CalendarComponent
                            appointments={appointments}
                            isLoading={isLoadingAppointments}
                        />
                    </div>
                </div>

                {/* Acciones rápidas */}
                <div className="w-full max-w-7xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Acciones Rápidas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Agendar nueva cita */}
                        <div
                            className="group bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => router.push("/Clinics")}
                        >
                            <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center text-center shadow hover:shadow-lg transition-all duration-300">
                                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <FaStethoscope className="text-[#2e7bb4] text-4xl" />
                                </div>
                                <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                    Agendar Cita
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Busca especialistas y agenda una nueva cita médica
                                </p>
                            </div>
                        </div>

                        {/* Fórmulas médicas */}
                        <div
                            className="group bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => router.push("/medicalFormulas")}
                        >
                            <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center text-center shadow hover:shadow-lg transition-all duration-300">
                                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <FaFileMedical className="text-[#2e7bb4] text-4xl" />
                                </div>
                                <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                    Mis Fórmulas
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Revisa y descarga tus prescripciones médicas
                                </p>
                            </div>
                        </div>

                        {/* Ver todas las citas */}
                        <div
                            className="group bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => router.push("/nextAppointments")}
                        >
                            <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center text-center shadow hover:shadow-lg transition-all duration-300">
                                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <FaCalendarCheck className="text-[#2e7bb4] text-4xl" />
                                </div>
                                <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                    Todas mis Citas
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Vista completa de tu historial de citas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estadísticas rápidas */}
                {!isLoadingAppointments && (
                    <div className="w-full max-w-7xl mt-12">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="text-4xl font-bold mb-2">
                                        {appointments.length}
                                    </p>
                                    <p className="text-blue-100">
                                        {appointments.length === 1 ? "Cita Agendada" : "Citas Agendadas"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold mb-2">
                                        {new Set(appointments.map(a => a.clinic_id)).size}
                                    </p>
                                    <p className="text-blue-100">
                                        {new Set(appointments.map(a => a.clinic_id)).size === 1
                                            ? "Clínica Visitada"
                                            : "Clínicas Visitadas"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold mb-2">
                                        {appointments.filter(a =>
                                            new Date(a.start_date_time) > new Date()
                                        ).length}
                                    </p>
                                    <p className="text-blue-100">
                                        {appointments.filter(a =>
                                            new Date(a.start_date_time) > new Date()
                                        ).length === 1
                                            ? "Cita Próxima"
                                            : "Citas Próximas"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
