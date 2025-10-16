"use client";
import { useState } from "react";
import LoginComponent from "../molecules/LoginComponent";
import RegisterComponent from "../molecules/RegisterComponent";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"login" | "register">("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#566794]/30">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-[#259487] transition-colors duration-200"
        >
          ✕
        </button>

        <h2 className="mb-6 mt-4 text-2xl font-bold text-center text-[#4682B4]">
          Bienvenido a <span className="text-[#259487]">MedAgenda</span>
        </h2>

        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 ${
              tab === "login"
                ? "border-b-2 border-[#259487] text-[#259487]"
                : "text-gray-500 hover:text-[#4682B4]"
            }`}
            onClick={() => setTab("login")}
          >
            Iniciar Sesión
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 ${
              tab === "register"
                ? "border-b-2 border-[#259487] text-[#259487]"
                : "text-gray-500 hover:text-[#4682B4]"
            }`}
            onClick={() => setTab("register")}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Contenido dinámico */}
        {tab === "login" ? <LoginComponent /> : <RegisterComponent />}
      </div>
    </div>
  );
}
