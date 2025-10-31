"use client";
import { motion } from "framer-motion";

interface HeadingProps {
    text: string;
    highlight: string;
}

export default function Heading({ text, highlight }: HeadingProps) {
    return (
        <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: [1, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
            {text} <span className="text-[#2e7bb4]">{highlight}</span>
        </motion.h1>
    );
}
