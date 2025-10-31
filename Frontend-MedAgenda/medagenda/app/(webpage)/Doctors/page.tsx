"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Heading from "../../../components/atoms/Heading";

const doctors = [
    { name: "Dr. Juan Pérez", specialty: "Cardiología" },
    { name: "Dra. María López", specialty: "Dermatología" },
    { name: "Dr. Carlos Ruiz", specialty: "Neurología" },
    { name: "Dra. Ana Torres", specialty: "Cardiología" },
    { name: "Dr. Luis Gómez", specialty: "Pediatría" },
    { name: "Dra. Sofía Ramírez", specialty: "Ginecología" },
    { name: "Dr. Esteban Moreno", specialty: "Oftalmología" },
    { name: "Dra. Camila Rojas", specialty: "Psiquiatría" },
    { name: "Dr. Fernando Castro", specialty: "Endocrinología" },
    { name: "Dra. Juliana Torres", specialty: "Traumatología" },
    { name: "Dr. Andrés Silva", specialty: "Urología" },
    { name: "Dra. Paula Nieto", specialty: "Otorrinolaringología" },
    { name: "Dr. Sebastián Arias", specialty: "Oncología" },
    { name: "Dra. Laura Vargas", specialty: "Reumatología" },
    { name: "Dr. Nicolás Medina", specialty: "Gastroenterología" },
    { name: "Dra. Catalina Herrera", specialty: "Nefrología" },
    { name: "Dr. Diego Patiño", specialty: "Cardiología" },
    { name: "Dra. Valentina Gómez", specialty: "Dermatología" },
    { name: "Dr. Mateo Lozano", specialty: "Neurología" },
    { name: "Dra. Daniela Rincón", specialty: "Pediatría" },
];

export default function Page() {
    const searchParams = useSearchParams();
    const selectedSpecialty = searchParams.get("specialty");

    const filteredDoctors = selectedSpecialty
        ? doctors.filter((d) => d.specialty === selectedSpecialty)
        : doctors;

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-16 flex flex-col items-center">
            <Heading
                text="Doctores"
                highlight={selectedSpecialty ? `de ${selectedSpecialty}` : ""}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10">
                {filteredDoctors.map((d, i) => (
                    <div
                        key={i}
                        className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl"
                    >
                        <div className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-gray-800 font-semibold text-lg">
                                {d.name}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                {d.specialty}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
