"use client";
import React from "react";
import Heading from "../../../components/atoms/Heading";

export default function PHome() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <Heading text="Bienvenido," highlight="[Nombre del paciente]" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
                    {/* Próximas citas */}
                    <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                        <div className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                Próximas Citas
                            </h3>
                            <p className="text-gray-500">
                                Consulta tus citas médicas agendadas y sus detalles.
                            </p>
                        </div>
                    </div>

                    {/* Fórmulas médicas */}
                    <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                        <div className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                Fórmulas Médicas
                            </h3>
                            <p className="text-gray-500">
                                Visualiza las prescripciones recientes y descárgalas fácilmente.
                            </p>
                        </div>
                    </div>

                    {/* Especialidades disponibles */}
                    <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                        <div className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-gray-800 font-semibold text-xl mb-2">
                                Especialidades Disponibles
                            </h3>
                            <p className="text-gray-500">
                                Explora las áreas médicas disponibles y agenda una nueva cita.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
