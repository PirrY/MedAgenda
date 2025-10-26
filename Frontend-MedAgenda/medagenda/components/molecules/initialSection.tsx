"use client";
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";

export default function InitialSection() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-16 px-6">
            <Heading text="Bienvenido a" highlight="MedAgenda" />
            <Paragraph>
                Tu espacio digital para gestionar citas médicas, recibir recetas,
                acceder a tu historial y comunicarte con tus especialistas...
                Todo en un solo lugar, seguro y confiable
            </Paragraph>
        </section>
    );
}
