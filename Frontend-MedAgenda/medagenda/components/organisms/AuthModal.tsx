"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import LoginComponent from "../molecules/LoginComponent";
import RegisterComponent from "../molecules/RegisterComponent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultTab?: "login" | "register";
};

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  defaultTab = "login",
}: Props) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Contenedor del modal centrado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#566794]/30">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-[#259487] transition-colors duration-200"
          >
            ✕
          </button>

          <h2 className="mb-6 text-2xl font-bold text-center text-[#4682B4]">
            Bienvenido a{" "}
            <span className="text-[#259487]">
              MedAgenda
            </span>
          </h2>

          <div className="mb-6 flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 ${tab === "login"
                ? "border-b-2 border-[#259487] text-[#259487]"
                : "text-gray-500 hover:text-[#4682B4]"
                }`}
              onClick={() => setTab("login")}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 ${tab === "register"
                ? "border-b-2 border-[#259487] text-[#259487]"
                : "text-gray-500 hover:text-[#4682B4]"
                }`}
              onClick={() => setTab("register")}
            >
              Crear Cuenta
            </button>
          </div>

          {tab === "login" ? (
            <LoginComponent onSuccess={onSuccess} />
          ) : (
            <RegisterComponent onSuccess={onSuccess} />
          )}

          <div className="mt-4 text-center text-sm text-gray-600">
            {tab === "login" ? (
              <span>
                ¿No tienes cuenta?{" "}
                <button className="underline text-[#4682B4]" onClick={() => setTab("register")}>
                  Regístrate
                </button>
              </span>
            ) : (
              <span>
                ¿Ya tienes cuenta?{" "}
                <button className="underline text-[#4682B4]" onClick={() => setTab("login")}>
                  Inicia sesión
                </button>
              </span>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
