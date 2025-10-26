"use client";
import { motion } from "framer-motion";

interface ParagraphProps {
    children: React.ReactNode;
}

export default function Paragraph({ children }: ParagraphProps) {
    return (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-2xl text-gray-600 text-lg md:text-xl"
        >
            {children}
        </motion.p>
    );
}
