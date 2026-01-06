"use client";

import { useEffect, useState } from "react";
import { WISDOM_QUOTES } from "@/data/wisdom-quotes";

export function useRotatingWisdom() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        // Rotation Logic: 2-hour window based on UTC hours
        // Formula: index = Math.floor(currentHour / 2) % totalQuotes
        const updateQuote = () => {
            const currentHour = new Date().getUTCHours();
            const windowIndex = Math.floor(currentHour / 2);
            const quoteIndex = windowIndex % WISDOM_QUOTES.length;
            setQuote(WISDOM_QUOTES[quoteIndex]);
        };

        updateQuote();

        // Check every minute to update if window changes
        const interval = setInterval(updateQuote, 60000);
        return () => clearInterval(interval);
    }, []);

    return quote;
}
