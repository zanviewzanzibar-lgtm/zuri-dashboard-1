"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "Africa/Dar_es_Salaam",
    });
  };

  const sectionTitles: Record<string, string> = {
    overview: "Overview",
    staff: "Staff Command",
    guests: "Guests",
    restaurants: "Restaurants & Bars",
    security: "Security",
    housekeeping: "Housekeeping",
    maintenance: "Maintenance",
    finance: "Finance & Revenue",
    store: "Store & POS",
    zuri: "Zuri Brain",
    settings: "Settings",
  };

  return (
    <header className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      {/* Left - Menu button (mobile) + Section Title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 -ml-2 rounded-xl hover:bg-secondary/50 transition-all duration-300 group"
        >
          <Menu className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            {sectionTitles[activeSection] || "Dashboard"}
          </h2>
          <p className="text-xs text-muted-foreground font-medium hidden sm:block">
            Grand Azure Hotel, Zanzibar
          </p>
        </div>
      </div>

      {/* Center - Date/Time */}
      <div className="hidden md:flex flex-col items-center">
        <div className="text-2xl lg:text-3xl font-mono font-semibold text-gold tabular-nums tracking-tight" style={{ textShadow: "0 0 30px oklch(0.78 0.14 80 / 0.4)" }}>
          {formatTime(currentTime)}
        </div>
        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium tracking-wide">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Right - Status indicators */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/25 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald hidden sm:inline">Live</span>
        </div>

        {/* Occupancy */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 shadow-sm shadow-gold/20">
          <span className="text-sm font-serif font-semibold tabular-nums text-gold">87</span>
          <span className="text-xs text-muted-foreground">/100 rooms</span>
        </div>

        {/* Weather */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
          {isDay ? (
            <Sun className="w-4 h-4 text-gold" />
          ) : (
            <Moon className="w-4 h-4 text-sapphire-light" />
          )}
          <span className="text-sm font-medium tabular-nums text-foreground">28°C</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-secondary/50 transition-all duration-300 group">
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full border-2 border-background" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
            <Avatar className="relative h-10 w-10 border-2 border-gold/30 group-hover:border-gold/60 transition-all duration-300 shadow-lg">
              <AvatarImage src="/avatars/owner.jpg" alt="Owner" />
              <AvatarFallback className="bg-gradient-to-br from-gold/20 to-gold/5 text-gold text-sm font-serif font-semibold">
                RE
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden xl:block">
            <p className="text-sm font-medium text-foreground">Rer</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
