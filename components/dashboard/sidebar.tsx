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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "staff", label: "Staff Command", icon: Users },
  { id: "guests", label: "Guests", icon: UserCircle },
  { id: "restaurants", label: "Restaurants & Bars", icon: Utensils },
  { id: "security", label: "Security & Cameras", icon: Shield },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "finance", label: "Finance & Revenue", icon: DollarSign },
  { id: "store", label: "Store & POS", icon: ShoppingCart },
  { id: "zuri", label: "Zuri Brain", icon: Brain },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onCollapsedChange,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col transition-all duration-500 ease-out z-50",
        "bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 backdrop-blur-2xl",
        "border-r border-sidebar-border",
        "shadow-[4px_0_24px_-4px_rgba(0,0,0,0.08)]",
        "dark:shadow-[4px_0_32px_-4px_rgba(0,0,0,0.4)]",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Logo area with premium border */}
      <div className="h-20 flex items-center px-5 border-b border-sidebar-border relative overflow-hidden">
        {/* Gold border beam effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        <div className="flex items-center gap-4">
          {/* Premium logo container */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-xl bg-gold/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold via-gold to-gold/80 flex items-center justify-center shadow-lg shadow-gold/25">
              <Brain className="w-5 h-5 text-background" />
            </div>
          </div>
          {!collapsed && (
            <div className="animate-in slide-in-from-left-2 duration-300">
              <h1 className="font-serif font-semibold text-xl text-foreground tracking-tight">
                ZURI
              </h1>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                Grand Azure Hotel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1.5">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li 
                key={item.id} 
                className="animate-in fade-in slide-in-from-bottom-1 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300",
                    "group relative overflow-hidden",
                    isActive 
                      ? "bg-gradient-to-r from-gold/15 via-gold/10 to-transparent border border-gold/25 shadow-sm"
                      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Active glow indicator */}
                  {isActive && (
                    <>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-gold via-gold to-gold/50 rounded-r-full" />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-50" />
                    </>
                  )}
                  
                  {/* Icon with glow on active */}
                  <div className="relative">
                    {isActive && (
                      <div className="absolute inset-0 bg-gold blur-lg opacity-30" />
                    )}
                    <Icon
                      className={cn(
                        "relative w-5 h-5 flex-shrink-0 transition-all duration-300",
                        isActive ? "text-gold" : "group-hover:text-foreground"
                      )}
                    />
                  </div>
                  
                  {!collapsed && (
                    <span className={cn(
                      "text-sm font-medium truncate transition-colors duration-300",
                      isActive && "text-gold"
                    )}>
                      {item.label}
                    </span>
                  )}
                  
                  {/* Hover highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Premium footer with collapse button */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 group"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
