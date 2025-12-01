"use client";
import React from "react";
import {
    FaUserMd,
    FaUsers,
    FaClipboardList,
    FaCalendarCheck,
} from "react-icons/fa";
import Heading from "../../../components/atoms/Heading";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AdminStatsPage() {
    // Datos de ejemplo
    const quickStats = [
        { id: 1, label: "Pacientes Activos", value: 128, icon: <FaUsers /> },
        { id: 2, label: "Citas del Mes", value: 56, icon: <FaCalendarCheck /> },
        { id: 3, label: "Médicos Registrados", value: 22, icon: <FaUserMd /> },
        { id: 4, label: "Fórmulas Generadas", value: 75, icon: <FaClipboardList /> },
    ];

    const appointmentData = [
        { month: "Ene", citas: 30 },
        { month: "Feb", citas: 45 },
        { month: "Mar", citas: 50 },
        { month: "Abr", citas: 60 },
        { month: "May", citas: 70 },
        { month: "Jun", citas: 55 },
    ];

    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-16">

            <Heading text="Estadísticas del" highlight="Administrador" />

            {/* Estadísticas*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl">
                {quickStats.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 border border-gray-200 hover:shadow-lg transition-all"
                    >
                        <div className="text-[#2e7bb4] text-4xl">{stat.icon}</div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gráfica de Citas */}
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-4xl border border-gray-200 mt-10">
                <h3 className="text-xl font-semibold mb-4 text-[#2e7bb4] text-center">
                    Citas por Mes
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={appointmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="citas" fill="#2e7bb4" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Información Adicional */}
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-4xl border border-gray-200 mt-10">
                <h3 className="text-xl font-semibold mb-4 text-[#2e7bb4]">
                    Información General
                </h3>
                <ul className="space-y-3 text-gray-700">
                    <li>🔹 Especialidades disponibles: <strong>12</strong></li>
                    <li>🔹 Promedio de citas por médico: <strong>18 al mes</strong></li>
                    <li>🔹 Pacientes nuevos este mes: <strong>24</strong></li>
                    <li>🔹 Fórmulas generadas este mes: <strong>31</strong></li>
                </ul>
            </div>
        </div>
    );
}
