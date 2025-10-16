"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
    const baseStyle = "w-full py-2 rounded-md transition-colors";
    const variants = {
        "primary": "bg-[#259487] text-white hover:bg-[#4682B4]",
        "secondary": "bg-gray-200 text-gray-500 cursor-not-allowed",
    };

    return (
        <button {...props} className={`${baseStyle} ${variants[variant]} ${props.className ?? ""}`}>
            {children}
        </button>
    );
}
