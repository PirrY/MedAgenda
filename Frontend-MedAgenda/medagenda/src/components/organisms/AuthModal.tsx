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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="mb-4 text-lg font-semibold">Come on in</h2>

                <div className="mb-4 flex border-b">
                    <button
                        className={`flex-1 py-2 ${tab === "login"
                                ? "border-b-2 border-black font-semibold"
                                : "text-gray-500"
                            }`}
                        onClick={() => setTab("login")}
                    >
                        SIGN IN
                    </button>
                    <button
                        className={`flex-1 py-2 ${tab === "register"
                                ? "border-b-2 border-black font-semibold"
                                : "text-gray-500"
                            }`}
                        onClick={() => setTab("register")}
                    >
                        I&apos;M NEW HERE
                    </button>
                </div>

                {/* Contenido dinámico */}
                {tab === "login" ? <LoginComponent /> : <RegisterComponent />}
            </div>
        </div>
    );
}
