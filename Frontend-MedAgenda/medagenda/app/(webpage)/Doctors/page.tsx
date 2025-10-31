"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Heading from "../../../components/atoms/Heading";
import DoctorGrid from "../../../components/organisms/DoctorGrid";

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
            <DoctorGrid doctors={filteredDoctors} />
        </main>
    );
}
