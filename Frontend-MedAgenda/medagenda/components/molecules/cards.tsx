"use client";

export default function ServicesCards() {
    const services = [
        {
            title: "Agendar Citas",
            description: "Programa tus citas médicas en pocos pasos y recibe recordatorios.",
        },
        {
            title: "Recibir Recetas",
            description: "Accede a tus fórmulas médicas digitales de forma rápida y segura.",
        },
        {
            title: "Buscar Especialistas",
            description: "Encuentra médicos por especialidad, ubicación o disponibilidad.",
        },
        {
            title: "Historial Médico",
            description: "Consulta tu historial clínico y resultados de manera organizada.",
        },
        {
            title: "Videoconsultas",
            description: "Conéctate con tu médico desde cualquier lugar a través de telemedicina.",
        },
        {
            title: "Notificaciones",
            description: "Recibe alertas sobre tus citas, medicamentos y estudios pendientes.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {services.map((service, i) => (
                <div
                    key={i}
                    className="group w-72 h-48 [perspective:1000px] mx-auto"
                >
                    <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        {/* Frente */}
                        <div className="absolute inset-0 flex items-center justify-center 
                            border-4 border-[#259487] bg-white text-gray-700
                            text-xl font-bold rounded-2xl shadow-lg 
                            [backface-visibility:hidden]">
                            {service.title}
                        </div>
                        {/* Reverso */}
                        <div className="absolute inset-0 flex items-center justify-center 
                            border-5 border-[#566794] bg-white text-gray-800 
                            text-center text-sm p-4 rounded-2xl shadow-lg 
                            [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            {service.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
