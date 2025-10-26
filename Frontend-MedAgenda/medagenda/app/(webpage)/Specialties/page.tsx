"use client";
import React, { useState } from "react";
import Heading from "../../../components/atoms/Heading";

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
    { name: "Cardiología" },
    { name: "Dermatilogía" }
];

export default function Page() {
    const [search, setSearch] = useState("");

    const filteredSpecialties = specialties.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-16">
            <Heading text="Especialidades" highlight="Médicas" />

            {/* Campo de búsqueda */}
            <div className="mt-4 mb-10 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Buscar especialidad..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e7bb4] text-gray-700"
                />
            </div>

            {/* Tarjetas de especialidades */}
            <div className="bg-white rounded-3xl shadow p-10 w-full max-w-5xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredSpecialties.map((s, i) => (
                        <div
                            key={i}
                            className="bg-[#94bfe3] text-gray-800 font-semibold text-center py-4 rounded-xl hover:bg-[#8bccc4] transition-colors duration-200 shadow-sm"
                        >
                            {s.name}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
