"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AddVouchDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddVouchDialog({ isOpen, onClose, onSuccess }: AddVouchDialogProps) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message || !image) return;

        setIsSubmitting(true);

        try {
            // 1. Upload Image
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('vouches')
                .upload(filePath, image);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('vouches')
                .getPublicUrl(filePath);

            // 3. Insert into Table
            const rotation = Math.random() * 8 - 4; // Random rotation between -4 and 4

            const { error: insertError } = await supabase
                .from('vouches')
                .insert([
                    {
                        name,
                        text: message,
                        image_url: publicUrl,
                        rotation,
                    },
                ]);

            if (insertError) throw insertError;

            // Success!
            onSuccess();
            onClose();
            // Reset form
            setName("");
            setMessage("");
            setImage(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error("Error submitting vouch:", error);
            alert("Failed to submit vouch. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6 space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-semibold text-white">Add to the Wall</h3>
                                    <p className="text-sm text-zinc-400">Leave a mark, a meme, or a kind word.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Image Upload Area */}
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`
                      relative w-full aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group overflow-hidden
                      ${previewUrl ? 'border-transparent' : 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}
                    `}
                                    >
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                                                    <Upload className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-zinc-500 font-mono">Click to upload image</p>
                                            </>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            hidden
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-zinc-500 font-mono uppercase ml-1 block mb-1.5">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 placeholder:text-zinc-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-500 font-mono uppercase ml-1 block mb-1.5">Message</label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Write something..."
                                                rows={3}
                                                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 placeholder:text-zinc-600 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !name || !message || !image}
                                        className="w-full bg-white text-black font-semibold h-10 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Posting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Post Vouch</span>
                                                <Check className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
