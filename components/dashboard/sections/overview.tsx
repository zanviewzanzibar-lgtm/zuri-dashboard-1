"use client";

import { AlertTriangle, Star, TrendingUp, Activity, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/dashboard/count-up";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
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
  color: "cyan" | "green" | "amber" | "red";
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
    color: "cyan",
    subtitle: "vs yesterday",
    icon: TrendingUp,
  },
  {
    title: "Occupancy",
    value: 87,
    suffix: "%",
    change: "87/100 rooms",
    changeType: "positive",
    color: "green",
    icon: Activity,
  },
  {
    title: "Active Staff",
    value: 142,
    change: "on duty now",
    changeType: "positive",
    color: "green",
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
    color: "green",
    showStar: true,
    icon: Star,
  },
];

// Live Activity Feed Data
const activityFeed = [
  { time: "02:14", status: "green", message: "Room 412 cleaned. Aisha sent photo confirmation" },
  { time: "02:11", status: "amber", message: "POS anomaly: whiskey sale with no staff ID — Bar 2" },
  { time: "02:09", status: "red", message: "Night guard Hassan missed 2am checkpoint" },
  { time: "02:07", status: "green", message: "Guest Marco Rossi (VIP, Room 204) — wine delivered" },
  { time: "02:04", status: "amber", message: "Room 210 AC repair in progress — Ali Juma assigned" },
  { time: "01:58", status: "green", message: "Zuri sent morning briefings to 142 staff" },
  { time: "01:45", status: "green", message: "Competitor raised rates 40% — pricing alert sent" },
  { time: "01:30", status: "red", message: "Camera motion at storage entrance — alert sent" },
];

// Department Performance Data
const departmentData = [
  { name: "Housekeeping", value: 91, color: "var(--green)" },
  { name: "Security", value: 74, color: "var(--amber)" },
  { name: "F&B", value: 88, color: "var(--green)" },
  { name: "Front Office", value: 93, color: "var(--green)" },
  { name: "Maintenance", value: 82, color: "var(--green)" },
  { name: "Store", value: 79, color: "var(--amber)" },
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

// Occupancy Heatmap Data (30 days — deterministic seed for SSR stability)
const occupancyData = Array.from({ length: 30 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rand = seed / 233280;
  return { day: i + 1, value: Math.floor(rand * 30) + 70 };
});

export function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* KPI Cards Row - Premium 3D hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              className="glass-card hover-lift-3d fade-up overflow-hidden relative group"
              style={{ ["--i" as string]: index }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                kpi.color === "cyan" ? "from-cyan/5 to-transparent" :
                kpi.color === "green" ? "from-green/5 to-transparent" :
                kpi.color === "amber" ? "from-amber/5 to-transparent" :
                "from-red/5 to-transparent"
              }`} />
              
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="stat-label mb-2">
                      {kpi.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className={`stat-value tabular-nums text-${kpi.color}`}>
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
                        <Star className="w-5 h-5 text-amber fill-amber -translate-y-0.5" />
                      )}
                    </div>
                    <p className={`text-xs mt-2 tabular-nums font-medium ${
                      kpi.changeType === "positive" ? "text-green" :
                      kpi.changeType === "warning" ? "text-amber" : "text-red"
                    }`}>
                      {kpi.change}
                      {kpi.subtitle && <span className="text-muted-foreground/60"> {kpi.subtitle}</span>}
                    </p>
                  </div>
                  {Icon && (
                    <div className={`p-2 rounded-lg bg-${kpi.color}/10 text-${kpi.color}`}>
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
        {/* Live Activity Feed - 40% */}
        <Card className="glass-card hover-lift fade-up lg:col-span-5 shimmer" style={{ ["--i" as string]: 5 }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-75 glow-pulse" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
              </span>
              <span className="uppercase tracking-[0.08em] text-xs">Live Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0.5 max-h-[320px] overflow-y-auto pr-2">
            {activityFeed.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-all duration-300 group cursor-default"
              >
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125 ${
                    item.status === "green" ? "bg-green" :
                    item.status === "amber" ? "bg-amber" : "bg-red"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-muted-foreground/50 font-mono tabular-nums uppercase tracking-wider">
                    {item.time}
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">{item.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Department Performance - 35% */}
        <Card className="glass-card hover-lift fade-up lg:col-span-4" style={{ ["--i" as string]: 6 }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold uppercase tracking-[0.08em]">Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, i) => (
                <div 
                  key={dept.name} 
                  className="flex items-center gap-3 fade-up"
                  style={{ ["--i" as string]: i + 7 }}
                >
                  <span className="text-[11px] text-muted-foreground/70 w-24 truncate font-medium">{dept.name}</span>
                  <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${dept.value}%`,
                        background: `linear-gradient(90deg, ${dept.color}, ${dept.color}88)`,
                        boxShadow: `0 0 20px ${dept.color}`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold w-10 text-right tabular-nums ${
                      dept.value >= 85 ? "text-green" : "text-amber"
                    }`}
                  >
                    {dept.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zuri's Last Thought - 25% */}
        <Card
          className="glass-card-glow hover-lift fade-up lg:col-span-3 border-beam"
          style={{ ["--i" as string]: 7 }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-cyan flex items-center gap-2 uppercase tracking-[0.08em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 glow-pulse" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              {"Zuri's Thought"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
              {"\"Tonight I noticed the night guard Hassan missed his 2am check-in for the third time this week. I flagged it immediately and the owner was notified. This pattern suggests either fatigue or disengagement — I've added a coaching note to tomorrow's briefing.\""}
            </p>
            <p className="text-[10px] text-cyan/60 mt-4 font-mono tabular-nums uppercase tracking-wider">
              — 03:00 AM journal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Revenue Chart and Occupancy Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart with Area gradient */}
        <Card className="glass-card hover-lift fade-up" style={{ ["--i" as string]: 8 }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold uppercase tracking-[0.08em]">7-Day Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="var(--cyan)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--amber)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--amber)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="var(--amber)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    fill="url(#targetGradient)"
                    strokeOpacity={0.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--cyan)"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                    dot={{ fill: "var(--cyan)", strokeWidth: 0, r: 3 }}
                    activeDot={{ fill: "var(--cyan)", strokeWidth: 0, r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-cyan rounded-full" />
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-amber/50 rounded-full border-dashed" style={{ borderTop: "1px dashed var(--amber)" }} />
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Heatmap */}
        <Card className="glass-card hover-lift fade-up" style={{ ["--i" as string]: 9 }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold uppercase tracking-[0.08em]">30-Day Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-1.5">
              {occupancyData.map((day, i) => (
                <div
                  key={day.day}
                  className="aspect-square rounded-md flex items-center justify-center text-[9px] font-semibold tabular-nums transition-all duration-300 hover:scale-110 hover:z-10 cursor-default group"
                  style={{
                    background: day.value >= 90
                      ? `linear-gradient(135deg, var(--green), oklch(0.72 0.20 145 / 0.7))`
                      : day.value >= 75
                        ? `linear-gradient(135deg, var(--amber), oklch(0.80 0.18 85 / 0.7))`
                        : `linear-gradient(135deg, var(--red), oklch(0.62 0.25 25 / 0.7))`,
                    opacity: 0.5 + (day.value - 70) / 80,
                    boxShadow: day.value >= 90 ? "0 0 10px var(--green)" : undefined,
                    ["--i" as string]: i,
                  }}
                  title={`Day ${day.day}: ${day.value}%`}
                >
                  <span className="text-white/90 drop-shadow-sm">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-red/60" />
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">{"<75%"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber/60" />
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">75-89%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-green/60" />
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">90%+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
