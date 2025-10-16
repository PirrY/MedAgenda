export default function Footer() {
    return (
        <footer className="w-full mt-10">
            {/* Línea superior azul */}
            <div className="h-1 w-full bg-[#566794]"></div>

            <div className="bg-white py-4 px-6 flex flex-col md:flex-row justify-center items-center gap-6 text-gray-700 text-sm border-t border-gray-200">
                <a href="#" className="hover:underline">Sobre nosotros</a>
                <a href="#" className="hover:underline">Políticas de privacidad</a>
            </div>

            <div className="bg-white text-gray-600 text-sm px-6 py-4 flex flex-col items-center gap-3">
                <p> {new Date().getFullYear()} MedAgenda</p>
                <div className="flex gap-4">
                    {/* Facebook */}
                    <a href="#" className="hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M22 12a10 10 0 10-11.5 9.95v-7.05H8v-2.9h2.5V9.5c0-2.47 1.48-3.83 3.74-3.83 1.08 0 2.21.2 2.21.2v2.43h-1.25c-1.24 0-1.63.77-1.63 1.56v1.87H16l-.4 2.9h-2.7v7.05A10 10 0 0022 12z" />
                        </svg>
                    </a>
                    {/* Twitter */}
                    <a href="#" className="hover:text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M19.46 7.14c.01.16.01.32.01.48 0 4.9-3.73 10.55-10.55 10.55-2.1 0-4.06-.61-5.71-1.67a7.48 7.48 0 005.51-1.54 3.72 3.72 0 01-3.47-2.58c.23.04.46.06.7.06.34 0 .67-.05.98-.13a3.72 3.72 0 01-2.98-3.64v-.05c.5.28 1.08.45 1.69.47a3.72 3.72 0 01-1.65-3.1c0-.68.18-1.32.5-1.87a10.55 10.55 0 007.66 3.88 4.2 4.2 0 01-.09-.85 3.72 3.72 0 016.44-2.54 7.28 7.28 0 002.36-.9 3.73 3.73 0 01-1.63 2.05 7.42 7.42 0 002.14-.59 8.01 8.01 0 01-1.85 1.92z" />
                        </svg>
                    </a>
                    {/* Instagram */}
                    <a href="#" className="hover:text-pink-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm4.75-.95a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
