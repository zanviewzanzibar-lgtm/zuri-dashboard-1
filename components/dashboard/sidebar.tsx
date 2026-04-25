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
        "bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-2xl",
        "border-r border-white/[0.08]",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo area with premium border beam */}
      <div className="h-16 flex items-center px-4 border-b border-white/[0.06] relative border-beam">
        <div className="flex items-center gap-3">
          {/* Animated logo container */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-xl bg-cyan/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-cyan/70 flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          {!collapsed && (
            <div className="slide-in-left">
              <h1 className="font-bold text-lg text-foreground tracking-tight font-mono">ZURI AI</h1>
              <p className="text-[10px] uppercase tracking-[0.15em] text-cyan font-medium">GRAND AZURE</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li 
                key={item.id} 
                className="fade-up"
                style={{ ["--i" as string]: index }}
              >
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
                    "hover:bg-white/[0.04]",
                    "group relative overflow-hidden",
                    isActive && "bg-cyan/10 border border-cyan/20",
                    !isActive && "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Active glow indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent opacity-50" />
                  )}
                  
                  {/* Icon with glow on active */}
                  <div className="relative">
                    {isActive && (
                      <div className="absolute inset-0 bg-cyan blur-lg opacity-40" />
                    )}
                    <Icon
                      className={cn(
                        "relative w-5 h-5 flex-shrink-0 transition-all duration-300",
                        isActive ? "text-cyan" : "group-hover:text-foreground"
                      )}
                    />
                  </div>
                  
                  {!collapsed && (
                    <span className={cn(
                      "text-sm font-medium truncate transition-colors duration-300",
                      isActive && "text-cyan"
                    )}>
                      {item.label}
                    </span>
                  )}
                  
                  {/* Hover highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-2 border-t border-white/[0.06]">
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
