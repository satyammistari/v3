"use client";

import { useState, useEffect } from "react";
import { WallOfVouches } from "@/components/wall-of-vouches";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AddVouchDialog } from "@/components/add-vouch-dialog";
import { supabase } from "@/lib/supabase";
import { VOUCHES as STATIC_VOUCHES } from "@/data/vouches";

export default function VouchesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [vouches, setVouches] = useState<any[]>(STATIC_VOUCHES); // Start with static
    const [isLoading, setIsLoading] = useState(true);

    const fetchVouches = async () => {
        try {
            // Fetch latest 50 vouches
            const { data, error } = await supabase
                .from('vouches')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                console.error("Error fetching vouches:", error);
            } else if (data) {
                // Merge static and dynamic, or just rely on dynamic?
                // Let's combine them so the static ones (your curated friends) are always there at the bottom or top.
                // Actually, if dynamic grows, static might be noise. But for now, let's simple concat.
                // Dynamic first (newest), then static.
                setVouches([...data, ...STATIC_VOUCHES]);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVouches();
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
            <div className="w-full max-w-4xl mx-auto px-6 py-12 space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2 font-serif">Wall of Vouches</h1>
                            <p className="text-white/60 text-sm max-w-lg">
                                A collection of kind words, shitposts, and memories from the people I&apos;ve worked with.
                            </p>
                        </div>

                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="hidden md:inline-flex bg-white text-black px-4 py-2 rounded-full text-xs font-bold font-mono hover:bg-zinc-200 transition-colors"
                        >
                            + ADD VOUCH
                        </button>
                    </div>
                </div>

                {/* The Wall */}
                <WallOfVouches vouches={vouches} />

                <Footer />
            </div>

            <AddVouchDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={fetchVouches}
            />
        </div>
    );
}
