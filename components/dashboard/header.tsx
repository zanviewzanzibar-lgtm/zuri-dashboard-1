"use client";

import { useState, useEffect } from "react";
import { Sun, CloudSun, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  activeSection: string;
  onMenuClick?: () => void;
}

export function Header({ activeSection, onMenuClick }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      // Zanzibar time check (UTC+3)
      const zanzibarHour = now.getUTCHours() + 3;
      setIsDay(zanzibarHour >= 6 && zanzibarHour < 18);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Africa/Dar_es_Salaam",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "Africa/Dar_es_Salaam",
    });
  };

  const sectionTitles: Record<string, string> = {
    overview: "Overview",
    staff: "Staff Command",
    guests: "Guests",
    restaurants: "F&B",
    security: "Security",
    housekeeping: "Housekeeping",
    maintenance: "Maintenance",
    finance: "Finance",
    store: "Store & POS",
    zuri: "Zuri Brain",
    settings: "Settings",
  };

  return (
    <header className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-40 bg-gradient-to-r from-black/50 via-black/40 to-black/50 backdrop-blur-xl border-b border-white/[0.06]">
      {/* Left - Menu button (mobile) + Section Title + Status */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-white/[0.04] transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div>
          <h1 className="text-h1">
            {sectionTitles[activeSection] || "Dashboard"}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green flex-shrink-0" />
            <span className="text-tech text-muted-foreground/70">
              SYSTEMS NOMINAL // ZANZIBAR NODE 01
            </span>
          </div>
        </div>
      </div>

      {/* Center - Date/Time (hidden on very small screens) */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="text-time text-cyan text-glow-cyan">
          {formatTime(currentTime)}
        </div>
        <div className="text-tech text-muted-foreground/70 mt-1">
          {formatDate(currentTime).toUpperCase()}
        </div>
      </div>

      {/* Right - Status indicators */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Live Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-red/5 border border-red/20">
          <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red opacity-75 glow-pulse" />
            <span className="relative inline-flex rounded-full h-1.5 sm:h-2 w-1.5 sm:w-2 bg-red" />
          </span>
          <span className="text-tech text-red font-bold">Live</span>
        </div>

        {/* Occupancy - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green/5 border border-green/20 glow-green">
          <span className="text-body-sm font-bold tabular-nums text-green">87</span>
          <span className="text-tech text-muted-foreground/60">/100</span>
        </div>

        {/* Weather - hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground/80">
          {isDay ? (
            <Sun className="w-4 h-4 text-amber" />
          ) : (
            <CloudSun className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-body-sm font-medium tabular-nums">28°C</span>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-full bg-cyan/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            <Avatar className="relative h-8 w-8 sm:h-9 sm:w-9 border-2 border-white/10 group-hover:border-cyan/30 transition-colors duration-300">
              <AvatarFallback className="bg-gradient-to-br from-cyan/20 to-cyan/5 text-cyan text-body-sm font-bold">
                RE
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden xl:block">
            <p className="text-body-sm font-semibold text-foreground">Admin</p>
            <p className="text-tech text-muted-foreground/60">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
