"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VouchCard } from "@/components/vouch-card";

// Use a simple random number generator that's deterministic based on index if needed,
// or just standard Math.random for "scattered look".
// To prevent hydration mismatch, we generate positions in useEffect.

interface WallOfVouchesProps {
    vouches: any[]; // Ideally typed with Vouch interface
}

export function WallOfVouches({ vouches }: WallOfVouchesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        // Resize observer could go here
    }, []);

    return (
        <section className="w-full max-w-[1200px] mx-auto py-12 px-6">
            <div
                ref={containerRef}
                className="relative min-h-[600px] w-full bg-zinc-950/15 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
                    <h2 className="text-3xl font-serif text-white/90" style={{ fontFamily: "serif" }}>
                        Wall of Vouches
                    </h2>
                    <span className="font-mono text-xs text-white/40 border border-white/10 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                        {vouches.length} VOUCHES
                    </span>
                </div>

                {/* Scattered Cards Area */}
                <div className="relative w-full h-full min-h-[600px] p-12 mt-12">
                    {/* 
              Distribute cards in a loose grid to avoid total overlap, 
              then apply random offsets. 
              2 columns for mobile, 3 for desktop ideal in 800px.
              3 columns: ~250px col width.
           */}
                    {containerWidth > 0 && vouches.map((vouch, index) => {
                        // Simple grid logic
                        const cols = containerWidth < 500 ? 1 : 3;
                        const row = Math.floor(index / cols);
                        const col = index % cols;

                        // Base positions
                        const leftBase = (col * (containerWidth / cols)) + (containerWidth / cols / 2) - 96; // Center in col (96 = half card width)
                        const topBase = row * 240 + 40; // 240px vertical spacing

                        // Add randomness (client-side only logic handled by simple offsets here? 
                        // Ideally this should be in state to match server/client, but for "drag" initial pos it's okay)
                        // We'll trust the randomness is visually fine or use deterministic offsets.
                        const randomX = (index * 47) % 60 - 30; // Deterministic pseudo-random
                        const randomY = (index * 23) % 40 - 20;

                        return (
                            <motion.div
                                key={vouch.id}
                                style={{
                                    position: "absolute",
                                    left: leftBase + randomX,
                                    top: topBase + randomY,
                                }}
                            >
                                <VouchCard
                                    image={vouch.image || vouch.image_url} // Handle both property names
                                    name={vouch.name}
                                    text={vouch.text}
                                    rotation={vouch.rotation}
                                    containerRef={containerRef}
                                    index={index}
                                    parentWidth={containerWidth}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Signature */}
                <div className="absolute bottom-6 right-6 z-10 pointer-events-none text-right">
                    <p className="font-serif text-sm text-zinc-500 mb-1 italic">
                        With all my heart,
                    </p>
                    <div className="w-32 h-8 relative ml-auto">
                        {/* Simple SVG signature placeholder mimicking 'love by darshan' */}
                        <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
                            <path d="M10,25 Q30,5 50,25 T90,25 T130,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-400" />
                            <text x="70" y="35" fontSize="10" fill="currentColor" className="text-zinc-500 font-serif">love by darshan</text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
