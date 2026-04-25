"use client";

import { Mic } from "lucide-react";

export function AskZuriButton() {
  return (
    <button
      className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 group z-50"
      aria-label="Ask Zuri"
    >
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-cyan/20 blur-xl scale-150 opacity-50 group-hover:opacity-80 transition-all duration-500" />
      <div className="absolute inset-0 rounded-full bg-cyan/30 blur-md scale-125 opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
      
      {/* Animated ring */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan/40 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Main button */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan via-cyan to-cyan/80 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95">
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20" />
        
        {/* Icon */}
        <Mic className="relative w-6 h-6 text-primary-foreground drop-shadow-sm" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0">
        Ask Zuri
      </div>
    </button>
  );
}
