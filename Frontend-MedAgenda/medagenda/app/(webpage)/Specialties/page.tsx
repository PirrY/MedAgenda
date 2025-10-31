"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../../../components/atoms/Heading";
import SearchBar from "../../../components/atoms/SearchBar";
import SpecialtyGrid from "../../../components/organisms/SpecialtyGrid";

const specialties = [
    { name: "Cardiología" },
    { name: "Dermatología" },
    { name: "Neurología" },
    { name: "Pediatría" },
    { name: "Ginecología" },
    { name: "Oftalmología" },
    { name: "Psiquiatría" },
    { name: "Endocrinología" },
    { name: "Traumatología" },
    { name: "Urología" },
    { name: "Otorrinolaringología" },
    { name: "Oncología" },
    { name: "Reumatología" },
    { name: "Gastroenterología" },
    { name: "Nefrología" }
];

export default function Page() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const filteredSpecialties = specialties.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectSpecialty = (specialty: string) => {
        router.push(`/Doctors?specialty=${encodeURIComponent(specialty)}`);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-16">
            <Heading text="Especialidades" highlight="Médicas" />

            <div className="mt-4 mb-10 w-full max-w-md">
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar especialidad..."
                />
            </div>

            <SpecialtyGrid specialties={filteredSpecialties} onSelect={handleSelectSpecialty} />
        </main>
    );
}
