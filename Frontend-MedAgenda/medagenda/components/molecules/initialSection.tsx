"use client";
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";

export default function InitialSection() {
    return (
        <section
            className="relative w-full h-[480px] bg-cover bg-center flex items-center"
            style={{ backgroundImage: "url('/medico.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative max-w-4xl px-6 md:px-20 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    Atención médica confiable y a tu alcance
                </h2>
                <p className="text-lg md:text-xl mb-6 drop-shadow-lg max-w-2xl">
                    MedAgenda te conecta con especialistas certificados, te permite agendar citas, recibir recetas digitales y 
                    acceder a tu historial clínico desde cualquier lugar. Tu salud, más fácil, más segura y más humana
                </p>
                <div className="bg-[#4682B4] border border-blue-300 px-6 py-3 rounded-lg shadow-sm inline-block text-lg font-semibold">
                    Bienvenido a MedAgenda
                </div>
            </div>
        </section>
    );
}
