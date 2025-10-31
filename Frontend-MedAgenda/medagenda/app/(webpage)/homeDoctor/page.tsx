"use client";
import React from "react";
import Heading from "../../../components/atoms/Heading";

export default function DHome() {
    return (
        <div className="flex flex-col min-h-screen ">
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <Heading text="Bienvenido," highlight="Doctor" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-5xl">
                    {/* Agenda del día */}
                    <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                        <div className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                Agenda del Mes
                            </h3>
                            <p className="text-gray-500">
                                Revisa tus citas programadas, horarios disponibles y pacientes asignados.
                            </p>
                        </div>
                    </div>

                    {/* Pacientes recientes */}
                    <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                        <div className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                Pacientes Recientes
                            </h3>
                            <p className="text-gray-500">
                                Consulta las historias clínicas y el historial de tus últimos pacientes.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
