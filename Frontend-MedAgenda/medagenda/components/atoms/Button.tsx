"use client";

import { ButtonHTMLAttributes, useState, useCallback } from "react";
import { RateLimiter } from "../../utils/rateLimiting";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    rateLimitMs?: number;
    loading?: boolean;
};

export default function Button({
    children,
    variant = "primary",
    rateLimitMs = 1000,
    loading = false,
    onClick,
    disabled,
    ...props
}: ButtonProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [rateLimiter] = useState(() => new RateLimiter(rateLimitMs));

    const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Check if rate limited
        if (!rateLimiter.canExecute()) {
            return;
        }

        // Prevent multiple clicks while processing
        if (isProcessing || loading || disabled) {
            return;
        }

        if (onClick) {
            setIsProcessing(true);
            try {
                await onClick(e);
            } catch (error) {
                // Error handling
            } finally {
                setIsProcessing(false);
            }
        }
    }, [onClick, isProcessing, loading, disabled, rateLimiter]);

    const baseStyle = "w-full py-2 rounded-md transition-colors flex items-center justify-center gap-2";
    const variants = {
        "primary": "bg-[#259487] text-white hover:bg-[#4682B4]",
        "secondary": "bg-gray-200 text-gray-500 cursor-not-allowed",
    };

    const isDisabled = disabled || loading || isProcessing;

    return (
        <button
            {...props}
            onClick={handleClick}
            disabled={isDisabled}
            className={`${baseStyle} ${variants[variant]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${props.className ?? ""}`}
        >
            {(loading || isProcessing) && (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
}
