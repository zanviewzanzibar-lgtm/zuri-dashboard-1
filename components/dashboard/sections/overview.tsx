"use client";

import { AlertTriangle, Star, TrendingUp, Activity, Zap, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/dashboard/count-up";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// KPI Data
type Kpi = {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  changeType: "positive" | "warning" | "negative";
  color: "gold" | "emerald" | "amber" | "rose";
  subtitle?: string;
  showStar?: boolean;
  icon?: React.ElementType;
};

const kpiCards: Kpi[] = [
  {
    title: "Total Revenue",
    value: 14820,
    prefix: "$",
    change: "+12%",
    changeType: "positive",
    color: "gold",
    subtitle: "vs yesterday",
    icon: TrendingUp,
  },
  {
    title: "Occupancy Rate",
    value: 87,
    suffix: "%",
    change: "87/100 rooms",
    changeType: "positive",
    color: "emerald",
    icon: Activity,
  },
  {
    title: "Active Staff",
    value: 142,
    change: "on duty now",
    changeType: "positive",
    color: "emerald",
    icon: Zap,
  },
  {
    title: "Open Issues",
    value: 7,
    change: "3 critical",
    changeType: "warning",
    color: "amber",
    icon: AlertTriangle,
  },
  {
    title: "Guest Rating",
    value: 4.8,
    decimals: 1,
    change: "",
    changeType: "positive",
    color: "gold",
    showStar: true,
    icon: Star,
  },
];

// Live Activity Feed Data
const activityFeed = [
  { time: "02:14", status: "emerald", message: "Room 412 cleaned. Aisha sent photo confirmation", priority: "low" },
  { time: "02:11", status: "amber", message: "POS anomaly: whiskey sale with no staff ID — Bar 2", priority: "medium" },
  { time: "02:09", status: "rose", message: "Night guard Hassan missed 2am checkpoint", priority: "high" },
  { time: "02:07", status: "emerald", message: "Guest Marco Rossi (VIP, Room 204) — wine delivered", priority: "low" },
  { time: "02:04", status: "amber", message: "Room 210 AC repair in progress — Ali Juma assigned", priority: "medium" },
  { time: "01:58", status: "emerald", message: "Zuri sent morning briefings to 142 staff", priority: "low" },
  { time: "01:45", status: "emerald", message: "Competitor raised rates 40% — pricing alert sent", priority: "low" },
  { time: "01:30", status: "rose", message: "Camera motion at storage entrance — alert sent", priority: "high" },
];

// Department Performance Data
const departmentData = [
  { name: "Front Office", value: 93, color: "var(--emerald)" },
  { name: "Housekeeping", value: 91, color: "var(--emerald)" },
  { name: "F&B Service", value: 88, color: "var(--emerald)" },
  { name: "Maintenance", value: 82, color: "var(--gold)" },
  { name: "Store & POS", value: 79, color: "var(--amber)" },
  { name: "Security", value: 74, color: "var(--amber)" },
];

// Revenue Data (7 days)
const revenueData = [
  { day: "Mon", revenue: 12400, target: 11000 },
  { day: "Tue", revenue: 14200, target: 12000 },
  { day: "Wed", revenue: 11800, target: 12500 },
  { day: "Thu", revenue: 15600, target: 13000 },
  { day: "Fri", revenue: 18200, target: 15000 },
  { day: "Sat", revenue: 21400, target: 18000 },
  { day: "Sun", revenue: 14820, target: 14000 },
];

// Occupancy Heatmap Data
const occupancyData = Array.from({ length: 30 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rand = seed / 233280;
  return { day: i + 1, value: Math.floor(rand * 30) + 70 };
});

const getColorClass = (color: string) => {
  const colors: Record<string, string> = {
    gold: "text-gold",
    emerald: "text-emerald",
    amber: "text-amber",
    rose: "text-rose",
  };
  return colors[color] || "text-foreground";
};

const getBgColorClass = (color: string) => {
  const colors: Record<string, string> = {
    gold: "bg-gold/10",
    emerald: "bg-emerald/10",
    amber: "bg-amber/10",
    rose: "bg-rose/10",
  };
  return colors[color] || "bg-secondary";
};

export function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* KPI Cards Row - Premium Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:bg-card/60 dark:border-white/[0.08] dark:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] overflow-hidden relative group"
              style={{ ["--i" as string]: index, animationDelay: `${index * 50}ms` }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getBgColorClass(kpi.color)}`} />
              
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-sans font-medium uppercase tracking-[0.1em] text-muted-foreground mb-3">
                      {kpi.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-3xl sm:text-4xl font-serif font-semibold tracking-tight tabular-nums ${getColorClass(kpi.color)}`}>
                        <CountUp
                          end={kpi.value}
                          prefix={kpi.prefix}
                          suffix={kpi.suffix}
                          decimals={kpi.decimals ?? 0}
                          delay={index * 100}
                          duration={1400}
                        />
                      </p>
                      {kpi.showStar && (
                        <Star className="w-5 h-5 text-gold fill-gold -translate-y-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-3">
                      {kpi.changeType === "positive" && kpi.change.startsWith("+") && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald" />
                      )}
                      <p className={`text-xs tabular-nums font-medium ${
                        kpi.changeType === "positive" ? "text-emerald" :
                        kpi.changeType === "warning" ? "text-amber" : "text-rose"
                      }`}>
                        {kpi.change}
                        {kpi.subtitle && <span className="text-muted-foreground ml-1">{kpi.subtitle}</span>}
                      </p>
                    </div>
                  </div>
                  {Icon && (
                    <div className={`p-2.5 rounded-xl ${getBgColorClass(kpi.color)} ${getColorClass(kpi.color)} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Row 2: Activity Feed, Department Performance, Zuri's Thought */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Activity Feed */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:bg-card/60 dark:border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] lg:col-span-5" style={{ ["--i" as string]: 5 }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-sans font-semibold flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>
              <span className="uppercase tracking-[0.12em] text-xs text-muted-foreground">Live Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 max-h-[360px] overflow-y-auto pr-2">
            {activityFeed.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-all duration-300 group cursor-default"
              >
                <span
                  className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125 ${
                    item.status === "emerald" ? "bg-emerald" :
                    item.status === "amber" ? "bg-amber" : "bg-rose"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-muted-foreground font-mono tabular-nums uppercase tracking-wider block mb-0.5">
                    {item.time}
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">{item.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:bg-card/60 dark:border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] lg:col-span-4" style={{ ["--i" as string]: 6 }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-xs font-sans font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {departmentData.map((dept, i) => (
                <div 
                  key={dept.name} 
                  className="animate-in fade-in slide-in-from-bottom-1 duration-500"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground font-medium">{dept.name}</span>
                    <span
                      className={`text-sm font-serif font-semibold tabular-nums ${
                        dept.value >= 85 ? "text-emerald" : dept.value >= 75 ? "text-gold" : "text-amber"
                      }`}
                    >
                      {dept.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${dept.value}%`,
                        background: `linear-gradient(90deg, ${dept.color}, ${dept.color}aa)`,
                        boxShadow: `0 0 16px ${dept.color}`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zuri's Last Thought */}
        <Card
          className="bg-card/80 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-[0_4px_32px_-8px_rgba(212,175,55,0.15)] dark:bg-card/60 dark:border-gold/30 dark:shadow-[0_4px_40px_-8px_rgba(212,175,55,0.25)] transition-all duration-500 hover:-translate-y-1 lg:col-span-3 relative overflow-hidden"
          style={{ ["--i" as string]: 7 }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-sans font-semibold text-gold flex items-center gap-2.5 uppercase tracking-[0.12em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-pulse" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              {"Zuri's Thought"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic text-muted-foreground leading-relaxed font-serif">
              {"\"Tonight I noticed the night guard Hassan missed his 2am check-in for the third time this week. I flagged it immediately and the owner was notified. This pattern suggests either fatigue or disengagement — I've added a coaching note to tomorrow's briefing.\""}
            </p>
            <p className="text-[10px] text-gold/60 mt-5 font-mono tabular-nums uppercase tracking-wider">
              — 03:00 AM journal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Revenue Chart and Occupancy Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:bg-card/60 dark:border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)]" style={{ ["--i" as string]: 8 }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-sans font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                7-Day Revenue
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-gold rounded-full" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-amber/50 rounded-full" style={{ borderTop: "1px dashed var(--amber)" }} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Target</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="var(--gold)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--amber)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--amber)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-sans)" }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-sans)" }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                    dx={-8}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="var(--amber)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="url(#targetGradient)"
                    strokeOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--gold)"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={{ fill: "var(--gold)", strokeWidth: 0, r: 4 }}
                    activeDot={{ fill: "var(--gold)", strokeWidth: 0, r: 6, style: { filter: "drop-shadow(0 0 8px var(--gold))" } }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Heatmap */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:bg-card/60 dark:border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)]" style={{ ["--i" as string]: 9 }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-sans font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                30-Day Occupancy
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-rose/50" />
                  <span className="text-[10px] text-muted-foreground uppercase">{"<75%"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber/60" />
                  <span className="text-[10px] text-muted-foreground uppercase">75-89%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald/60" />
                  <span className="text-[10px] text-muted-foreground uppercase">90%+</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {occupancyData.map((day, i) => (
                <div
                  key={day.day}
                  className="aspect-square rounded-lg flex items-center justify-center text-[10px] font-serif font-semibold tabular-nums transition-all duration-300 hover:scale-110 hover:z-10 cursor-default group"
                  style={{
                    background: day.value >= 90
                      ? `linear-gradient(135deg, var(--emerald), oklch(0.72 0.16 160 / 0.7))`
                      : day.value >= 75
                        ? `linear-gradient(135deg, var(--amber), oklch(0.80 0.14 80 / 0.7))`
                        : `linear-gradient(135deg, var(--rose), oklch(0.65 0.18 20 / 0.7))`,
                    opacity: 0.5 + (day.value - 70) / 80,
                    boxShadow: day.value >= 90 ? "0 0 12px var(--emerald)" : undefined,
                    ["--i" as string]: i,
                  }}
                  title={`Day ${day.day}: ${day.value}%`}
                >
                  <span className="text-white/95 drop-shadow-sm">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
