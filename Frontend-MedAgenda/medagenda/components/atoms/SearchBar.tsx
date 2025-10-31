"use client";
import React from "react";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder={placeholder || "Buscar..."}
            value={value}
            onChange={onChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e7bb4] text-gray-700"
        />
    );
}
