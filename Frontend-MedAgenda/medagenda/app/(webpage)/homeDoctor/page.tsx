"use client";
import React from "react";
import Image from "next/image";
import Heading from "../../../components/atoms/Heading";
import { FaCalendarAlt, FaUserInjured } from "react-icons/fa";

export default function DHome() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <Heading text="Bienvenido" highlight="Doctor" />

                <div className="flex flex-col md:flex-row items-center md:items-start mt-12 w-full max-w-6xl gap-12">

                    {/* Imagen a la izquierda */}
                    <div className="flex justify-center md:justify-start w-full md:w-1/3">
                        <Image
                            src="/robot-medico.png"
                            alt="Robot médico"
                            width={320}
                            height={320}
                            className="object-contain"
                        />
                    </div>

                    {/* Tarjetas a la derecha */}
                    <div className="flex flex-col w-full md:w-2/3 gap-8">

                        {/* Agenda del Mes */}
                        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                            <div className="bg-white rounded-2xl p-6 min-h-[170px] flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaCalendarAlt className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Agenda del Mes
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Revisa tus citas programadas, horarios disponibles y pacientes asignados.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pacientes Recientes */}
                        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                            <div className="bg-white rounded-2xl p-6 min-h-[170px] flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaUserInjured className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Pacientes Recientes
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Consulta las historias clínicas y el historial de tus últimos pacientes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
