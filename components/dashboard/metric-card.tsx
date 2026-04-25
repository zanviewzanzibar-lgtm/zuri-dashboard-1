"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className="group glass-card hover-lift fade-up relative p-5 overflow-hidden"
      style={{ ["--i" as string]: delay }}
    >
      {/* Subtle radial wash on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at 20% 0%, oklch(0.75 0.15 195 / 0.12), transparent 60%)",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground/80 font-medium">
            {title}
          </span>
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-cyan/10 transition-colors duration-300">
            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-cyan transition-colors duration-300" />
          </div>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight tabular-nums">
            {value}
          </span>
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium mb-1 tabular-nums",
              changeType === "positive" && "text-green",
              changeType === "negative" && "text-red",
              changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {changeType === "positive" && <TrendingUp className="w-3.5 h-3.5" />}
            {changeType === "negative" && <TrendingDown className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
