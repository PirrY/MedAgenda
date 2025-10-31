import React from "react";
import SpecialtyCard from "../molecules/SpecialtyCard";

interface SpecialtyGridProps {
    specialties: { name: string }[];
    onSelect: (specialty: string) => void;
}

export default function SpecialtyGrid({ specialties, onSelect }: SpecialtyGridProps) {
    return (
        <div className="bg-white rounded-3xl shadow p-10 w-full max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {specialties.map((s, i) => (
                    <SpecialtyCard
                        key={i}
                        name={s.name}
                        onClick={() => onSelect(s.name)}
                    />
                ))}
            </div>
        </div>
    );
}
