"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
    const baseStyle = "w-full py-2 rounded-md transition-colors";
    const variants = {
        "primary": "bg-black text-white hover:bg-gray-800",
        "secondary": "bg-gray-200 text-gray-500 cursor-not-allowed",
    };

    return (
        <button {...props} className={`${baseStyle} ${variants[variant]} ${props.className ?? ""}`}>
            {children}
        </button>
    );
}
