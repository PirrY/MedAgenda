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
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-6 py-10">
            {services.map((service, i) => (
                <div key={i} className="group w-full h-64 [perspective:1000px]">

                    <div className="relative w-full h-full transition-transform duration-700 
                        [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                        <div className="absolute text-center inset-0 bg-white shadow-md rounded-3xl p-8 
                            flex flex-col gap-4 border-4 border-[#259487] 
                            [backface-visibility:hidden]">

                            <div className="w-14 h-14 bg-[#E4F0FF] rounded-xl flex items-center justify-center">
                                <span className="text-[#2B74C7] text-3xl">🩺</span>
                            </div>

                            <h3 className="text-[#2B74C7] font-bold text-lg uppercase tracking-wide">
                                {service.title}
                            </h3>
                        </div>

                        <div className="absolute inset-0 bg-white shadow-md rounded-3xl p-6 
                            border-4 border-[#566794] text-gray-700 text-sm text-center flex items-center justify-center
                            [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            {service.description}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
