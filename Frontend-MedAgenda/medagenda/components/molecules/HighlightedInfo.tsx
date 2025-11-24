import InfoCard from "../atoms/InfoCard";

export default function HighlightedInfo() {
    return (
        <section
            className="relative w-full py-10 px-6 md:px-16 bg-cover bg-center text-center mt-12"
            style={{ backgroundImage: "url('/medicina.jpg')" }}
        >
            {/* Capa oscura */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">
                        Atención sanitaria integral
                    </h3>
                    <p className="text-white mb-8">
                        En MedAgenda, ofrecemos un espacio digital diseñado para optimizar tu experiencia médica.
                        Conecta con especialistas certificados, recibe orientación profesional y gestiona tus
                        documentos clínicos fácilmente.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard title="Especialistas confiables" text="Profesionales certificados en diversas áreas médicas." />
                        <InfoCard title="Historial siempre disponible" text="Accede a citas, diagnósticos y recetas desde cualquier lugar." />
                        <InfoCard title="Consultas en línea" text="Atención médica por videollamada sin salir de casa." />
                        <InfoCard title="Gestión digital" text="Tus documentos médicos organizados de forma segura." />
                    </div>
                </div>

                <div></div>
            </div>
        </section>
    );
}
