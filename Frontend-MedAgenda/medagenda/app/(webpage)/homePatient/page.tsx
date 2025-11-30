"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendarCheck, FaFileMedical, FaStethoscope } from "react-icons/fa";
import Heading from "../../../components/atoms/Heading";

export default function PHome() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center px-6 py-16">
                <Heading text="Bienvenido," highlight="[Nombre del paciente]" />

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

                    {/* Opciones a la derecha (vertical) */}
                    <div className="flex flex-col w-full md:w-2/3 gap-8">

                        {/* Próximas citas */}
                        <div
                            className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl cursor-pointer"
                            onClick={() => router.push("/nextAppointments")}
                        >
                            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaCalendarCheck className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Próximas Citas
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Consulta tus citas médicas agendadas y sus detalles.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fórmulas médicas */}
                        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaFileMedical className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Fórmulas Médicas
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Visualiza las prescripciones recientes y descárgalas fácilmente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Especialidades disponibles */}
                        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
                            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow hover:shadow-lg transition-all duration-300">
                                <FaStethoscope className="text-[#2e7bb4] text-4xl" />
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-xl mb-1">
                                        Especialidades Disponibles
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Explora las áreas médicas disponibles y agenda una nueva cita.
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
