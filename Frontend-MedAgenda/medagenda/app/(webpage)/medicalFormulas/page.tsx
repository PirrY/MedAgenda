"use client";
import React from "react";
import { FaFilePrescription, FaDownload } from "react-icons/fa";
import Heading from "../../../components/atoms/Heading";

export default function MedicalFormulasPage() {
    const formulas = [
        {
            id: 1,
            date: "2025-01-22",
            doctor: "Dr. David Martínez",
            specialty: "Cardiología",
            description: "Tratamiento para la hipertensión arterial.",
            file: "/formula1.pdf",
        },
        {
            id: 2,
            date: "2025-01-28",
            doctor: "Dra. Laura Gómez",
            specialty: "Dermatología",
            description: "Crema tópica para dermatitis atópica.",
            file: "/formula2.pdf",
        },
    ];

    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-16">
            <Heading text="Fórmulas" highlight="Médicas Disponibles" />

            <div className="mt-10 w-full max-w-4xl space-y-6">
                {formulas.map((formula) => (
                    <div
                        key={formula.id}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all"
                    >
                        <div className="flex items-start gap-4">
                            <FaFilePrescription className="text-[#2e7bb4] text-4xl flex-shrink-0" />

                            <div className="flex-1">
                                <p><strong>📅 Fecha:</strong> {formula.date}</p>
                                <p><strong>👨‍⚕️ Médico:</strong> {formula.doctor}</p>
                                <p><strong>🏥 Especialidad:</strong> {formula.specialty}</p>
                                <p className="mt-2 text-gray-700">
                                    <strong>📝 Descripción:</strong> {formula.description}
                                </p>

                                <button
                                    className="mt-4 flex items-center gap-2 text-white bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] px-5 py-2 rounded-xl shadow hover:shadow-lg transition-all"
                                >
                                    <FaDownload /> Descargar Fórmula
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
