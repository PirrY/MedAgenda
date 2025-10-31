"use client";
import React from "react";
import DoctorCard from "../atoms/DoctorCard";

interface Doctor {
    name: string;
    specialty: string;
}

interface DoctorGridProps {
    doctors: Doctor[];
}

export default function DoctorGrid({ doctors }: DoctorGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10">
            {doctors.map((d, i) => (
                <DoctorCard key={i} name={d.name} specialty={d.specialty} />
            ))}
        </div>
    );
}
