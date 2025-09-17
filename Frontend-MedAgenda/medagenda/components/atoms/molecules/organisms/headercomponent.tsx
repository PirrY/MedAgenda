"use client";

import { Search } from "lucide-react";

export default function HeaderComponent() {
    return (
        <header className="w-full shadow-md">
            {/* Sección 1 */}
            <div className="bg-blue-900 text-white text-sm px-6 py-2 flex justify-end gap-6">
                <button className="hover:underline">Idioma</button>
                <button className="hover:underline">Iniciar sesión</button>
                <button className="hover:underline">Registro</button>
            </div>

            {/* Sección 2 */}
            <div className="bg-gradient-to-r from-green-500 via-white to-blue-900 py-8 flex justify-center">
                <h1 className="text-5xl font-extrabold tracking-wider text-center uppercase text-blue-900 drop-shadow-md">
                    <span className="text-green-600">Med</span>
                    <span className="text-blue-900">Agenda</span>
                </h1>
            </div>

            {/* Sección 3 */}
            <div className="bg-white py-4 px-6 flex justify-center">
                <div className="relative w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Buscar médico, especialidad, clínica..."
                        className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
                </div>
            </div>
        </header>
    );
}
