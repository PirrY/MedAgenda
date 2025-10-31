"use client";
import React from "react";

interface DoctorCardProps {
    name: string;
    specialty: string;
}

export default function DoctorCard({ name, specialty }: DoctorCardProps) {
    return (
        <div className="bg-gradient-to-r from-[#2e7bb4] to-[#8bccc4] p-[2px] rounded-2xl">
            <div className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition-all duration-300">
                <h3 className="text-gray-800 font-semibold text-lg">{name}</h3>
                <p className="text-gray-500 text-sm mt-1">{specialty}</p>
            </div>
        </div>
    );
}
