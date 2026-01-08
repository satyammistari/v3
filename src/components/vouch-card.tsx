"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RefObject } from "react";

interface VouchCardProps {
    image: string;
    name: string;
    text: string;
    rotation: number;
    containerRef: RefObject<HTMLDivElement>;
    index: number;
    parentWidth: number;
}

export function VouchCard({
    image,
    name,
    text,
    rotation,
    containerRef,
    index,
    parentWidth,
}: VouchCardProps) {
    // Random positioning within container (basic distribution)
    // We'll vary the grid slightly or use random offsets
    // For dragging, we use dragConstraints to the parent

    // Calculate a simplified random position to "scatter" them initially if needed,
    // but for a clean grid layout that becomes scattered, we might stick to relative or absolute positioning.
    // The prompt asks for "Draggable... Constrain to parent".
    // Let's use absolute positioning with random spreads or a loose grid.

    return (
        <motion.div
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
            initial={{ rotate: rotation, opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute p-3 pb-8 bg-white shadow-2xl border border-zinc-200 w-48 transition-shadow hover:shadow-cyan-500/20 cursor-grab active:cursor-grabbing"
            style={{
                // Simple scattering logic or use passed props if we want controlled scatter
                top: `${Math.floor(index / 3) * 200 + 50}px`,
                left: `${(index % 3) * 30 + (index % 3) * 20}px`, // This logic needs to be better for "scattered"
                // Let's rely on the parent to position them, or use simple inline styles for now.
                // Actually, let's let the parent pass style or position.
                // For simplicity in this reusable component, we accept `style` or we position relatively in the parent map.
                // But drag requires absolute usually for free movement.
                // I will use a simple staggered grid approach in the parent.
            }}
        >
            {/* Tape Effect (optional but adds to polaroid feel) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm border border-white/20 z-10 opacity-80" />

            <div className="w-full aspect-square bg-zinc-100 overflow-hidden mb-3 relative group-hover:shadow-inner transition-shadow">
                <Image
                    src={image}
                    alt={`Vouch by ${name}`}
                    fill
                    className="object-cover"
                    draggable={false} // Prevent default browser image drag
                />
            </div>

            <div className="space-y-1">
                <p className="font-mono text-[10px] text-zinc-800 leading-tight">
                    &quot;{text}&quot;
                </p>
                <p className="font-serif text-xs text-zinc-400 text-right italic">
                    - {name}
                </p>
            </div>
        </motion.div>
    );
}
