"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import LoginComponent from "../molecules/LoginComponent";
import RegisterComponent from "../molecules/RegisterComponent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // cierra modal al éxito
  defaultTab?: "login" | "register";
};

export default function AuthModal({ isOpen, onClose, onSuccess, defaultTab="login" }: Props) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex gap-2">
            <button
              className={`px-3 py-1 rounded ${tab==="login"?"bg-[#4682B4] text-white":"bg-gray-100"}`}
              onClick={() => setTab("login")}
            >
              Iniciar sesión
            </button>
            <button
              className={`px-3 py-1 rounded ${tab==="register"?"bg-[#4682B4] text-white":"bg-gray-100"}`}
              onClick={() => setTab("register")}
            >
              Crear cuenta
            </button>
          </div>

          {tab === "login" ? (
            <LoginComponent onSuccess={onSuccess} />
          ) : (
            <RegisterComponent />
          )}
  
          <div className="mt-4 text-center text-sm text-gray-600">
            {tab==="login" ? (
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
