"use client";

import { Mic } from "lucide-react";

export function AskZuriButton() {
  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 flex items-center gap-3">
      {/* Version badge */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
        <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse flex-shrink-0" />
        <span className="text-tech text-muted-foreground/80">V2.4_BETA</span>
      </div>
      
      {/* Mic button */}
      <button
        className="group relative"
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
      </button>
    </div>
  );
}
