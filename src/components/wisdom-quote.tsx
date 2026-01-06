"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRotatingWisdom } from "@/hooks/use-rotating-wisdom";

export function WisdomQuote() {
    const quote = useRotatingWisdom();

    if (!quote) return null;

    return (
        <div className="h-10 flex items-center justify-center overflow-hidden px-4">
            <AnimatePresence mode="wait">
                <motion.p
                    key={quote}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="text-xs md:text-sm text-zinc-500 light:text-zinc-600 text-center max-w-lg mx-auto font-medium leading-relaxed"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                    {quote}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
