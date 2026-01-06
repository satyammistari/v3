"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndIncrementCount = async () => {
      try {
        // Increment the count
        const incrementResponse = await fetch('/api/visitors', {
          method: 'POST',
        });
        const incrementData = await incrementResponse.json();

        // Fetch the current count
        const fetchResponse = await fetch('/api/visitors');
        const fetchData = await fetchResponse.json();

        setCount(fetchData.count || incrementData.count);
      } catch (error) {
        console.error('Error with visitor counter:', error);
        setCount(25784); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAndIncrementCount();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-[#111111] light:bg-zinc-100 rounded-full px-4 py-1.5 border border-zinc-800 light:border-zinc-300 flex items-center gap-2 shadow-sm">
        {/* Green Glowing Dot */}
        <div className="relative flex items-center justify-center w-2 h-2">
          <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        </div>

        <span className="text-xs text-zinc-400 light:text-zinc-600 font-medium" style={{ fontFamily: "var(--font-geist-mono)" }}>
          Visitor #
          <span className="text-zinc-100 light:text-zinc-900 ml-1">
            {loading ? "..." : (count || 25784).toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
}
