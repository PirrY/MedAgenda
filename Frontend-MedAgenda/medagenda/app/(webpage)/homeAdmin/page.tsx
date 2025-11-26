"use client";
import React from "react";
import Image from "next/image";
import Heading from "../../../components/atoms/Heading";
import { FaUsersCog, FaChartBar } from "react-icons/fa";

export default function AHome() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <Heading text="Panel del" highlight="Administrador" />

                <div className="flex flex-col md:flex-row items-center md:items-start mt-12 w-full max-w-6xl gap-12">

                    {/* Tarjetas a la izquierda */}
                    <div className="flex flex-col w-full md:w-2/3 gap-8">

                        {/* Gestión de Usuarios */}
                        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                            <div className="bg-white rounded-2xl p-6 min-h-[170px] flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaUsersCog className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Gestión de Usuarios
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Administra los perfiles de doctores, pacientes y personal del sistema.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas del Sistema */}
                        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                            <div className="bg-white rounded-2xl p-6 min-h-[170px] flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaChartBar className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Estadísticas del Sistema
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Consulta reportes sobre usuarios activos, citas y rendimiento general.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Imagen a la derecha */}
                    <div className="flex justify-center md:justify-end w-full md:w-1/3">
                        <Image
                            src="/robot-medico-admin.png"
                            alt="Robot médico administrador"
                            width={340}
                            height={340}
                            className="object-contain"
                        />
                    </div>

                </div>
            </main>
        </div>
    );
}
