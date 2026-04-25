"use client";

import { cn } from "@/lib/utils";
import type { Section } from "@/app/page";
import {
  Home,
  Users,
  UserCircle,
  Utensils,
  Shield,
  Sparkles,
  Wrench,
  DollarSign,
  ShoppingCart,
  Brain,
  Settings,
  X,
} from "lucide-react";
import { useEffect } from "react";

interface MobileNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "staff", label: "Staff", icon: Users },
  { id: "guests", label: "Guests", icon: UserCircle },
  { id: "restaurants", label: "F&B", icon: Utensils },
  { id: "security", label: "Security", icon: Shield },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "store", label: "Store", icon: ShoppingCart },
  { id: "zuri", label: "Zuri", icon: Brain },
  { id: "settings", label: "Settings", icon: Settings },
];

// Bottom tab items for quick access (5 main items)
const bottomTabs: Section[] = ["overview", "guests", "staff", "finance", "zuri"];

export function MobileNav({
  activeSection,
  onSectionChange,
  isOpen,
  onOpenChange,
}: MobileNavProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Bottom Tab Bar - Always visible on mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background/95 to-background/90 backdrop-blur-2xl border-t border-border/50 safe-area-bottom shadow-[0_-4px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomTabs.map((tabId) => {
            const item = navItems.find((n) => n.id === tabId)!;
            const Icon = item.icon;
            const isActive = activeSection === tabId;
            return (
              <button
                key={tabId}
                onClick={() => onSectionChange(tabId)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[56px]",
                  isActive
                    ? "text-gold bg-gold/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  {isActive && (
                    <div className="absolute inset-0 bg-gold blur-lg opacity-30" />
                  )}
                  <Icon className={cn("relative w-5 h-5", isActive && "text-gold")} />
                </div>
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
          {/* More button to open full menu */}
          <button
            onClick={() => onOpenChange(true)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300 min-w-[56px]"
          >
            <div className="w-5 h-5 flex flex-col items-center justify-center gap-[3px]">
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
            </div>
            <span className="text-[10px] font-medium tracking-wide">More</span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[100] transition-all duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={() => onOpenChange(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/98 to-card/95 border-t border-border/50 rounded-t-3xl transition-transform duration-500 ease-out max-h-[85vh] overflow-hidden shadow-2xl",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gold/20 blur-xl opacity-60" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center glow-gold">
                  <Brain className="w-5 h-5 text-background" />
                </div>
              </div>
              <div>
                <h2 className="font-serif font-semibold text-lg text-foreground tracking-tight">ZURI</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Grand Azure Hotel
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2.5 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-3 gap-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
                      "hover:bg-secondary/50 active:scale-95",
                      isActive && "bg-gold/10 border border-gold/25"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="relative">
                      {isActive && (
                        <div className="absolute inset-0 bg-gold blur-xl opacity-30" />
                      )}
                      <div
                        className={cn(
                          "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                          isActive
                            ? "bg-gold/15 text-gold"
                            : "bg-secondary/50 text-muted-foreground"
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium text-center",
                        isActive ? "text-gold" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
