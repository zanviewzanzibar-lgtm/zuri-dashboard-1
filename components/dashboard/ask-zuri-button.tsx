"use client";

import { Mic } from "lucide-react";

export function AskZuriButton() {
  return (
    <button
      className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 group z-50"
      aria-label="Ask Zuri"
    >
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-150 opacity-40 group-hover:opacity-70 transition-all duration-500" />
      <div className="absolute inset-0 rounded-full bg-gold/30 blur-lg scale-125 opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
      
      {/* Animated ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gold/30 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Main button */}
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gold via-gold to-gold/85 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 glow-gold">
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/25" />
        
        {/* Icon */}
        <Mic className="relative w-6 h-6 text-background drop-shadow-sm" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-card/95 backdrop-blur-xl border border-border/50 text-sm font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-xl">
        Ask Zuri
      </div>
    </button>
  );
}
