"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

const kpiData = [
  { title: "Month Revenue", value: "$387,420", change: "+13.5%", prev: "vs $341,200 last month", positive: true },
  { title: "RevPAR", value: "$148.30", change: "+8.2%", prev: "", positive: true },
  { title: "ADR", value: "$170.50", change: "", prev: "", positive: true },
  { title: "Occupancy MTD", value: "86.9%", change: "", prev: "", positive: true },
  { title: "F&B Revenue MTD", value: "$89,340", change: "", prev: "", positive: true },
  { title: "Spa & Activities", value: "$22,100", change: "", prev: "", positive: true },
];

const revenueBySource = [
  { name: "Direct", value: 34, color: "var(--cyan)" },
  { name: "Booking.com", value: 28, color: "var(--green)" },
  { name: "Airbnb", value: 22, color: "var(--amber)" },
  { name: "Corporate", value: 16, color: "var(--chart-5)" },
];

const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: 10000 + Math.random() * 8000,
}));

const departmentRevenue = [
  { name: "Rooms", value: 274000 },
  { name: "F&B", value: 89000 },
  { name: "Spa", value: 22000 },
  { name: "Other", value: 14000 },
];

const competitorPricing = [
  { hotel: "Grand Blue", theirPrice: 185, ourPrice: 170, diff: -8 },
  { hotel: "Ocean View", theirPrice: 155, ourPrice: 170, diff: 9 },
  { hotel: "Palm Resort", theirPrice: 195, ourPrice: 170, diff: -13 },
];

const expenses = [
  { category: "Staff", amount: 42000 },
  { category: "F&B Supply", amount: 18000 },
  { category: "Utilities", amount: 8000 },
  { category: "Marketing", amount: 4000 },
  { category: "Maintenance", amount: 3000 },
];

export function FinanceSection() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="glass-card border-white/10">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{kpi.title}</p>
              <p className="text-xl font-bold text-cyan">{kpi.value}</p>
              {kpi.change && (
                <p className="text-xs text-green flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  {kpi.change}
                </p>
              )}
              {kpi.prev && <p className="text-xs text-muted-foreground">{kpi.prev}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Source */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Revenue by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {revenueBySource.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {revenueBySource.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: source.color }} />
                  <span className="text-xs text-muted-foreground">{source.name}</span>
                  <span className="text-xs font-medium ml-auto">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Revenue Line Chart */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Daily Revenue (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyRevenue}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--cyan)"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Department */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Revenue by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRevenue} layout="vertical">
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    width={60}
                  />
                  <Bar dataKey="value" fill="var(--cyan)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor Pricing */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Competitor Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Hotel</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Their Price</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Our Price</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorPricing.map((comp, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-3 text-sm">{comp.hotel}</td>
                      <td className="p-3 text-sm text-muted-foreground">${comp.theirPrice}</td>
                      <td className="p-3 text-sm font-medium text-cyan">${comp.ourPrice}</td>
                      <td className="p-3">
                        <span className={`text-sm ${comp.diff > 0 ? "text-green" : "text-amber"}`}>
                          {comp.diff > 0 ? "+" : ""}{comp.diff}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-cyan/10 border border-cyan/20">
              <p className="text-sm text-cyan mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Zuri Recommendation
              </p>
              <p className="text-sm text-muted-foreground">
                {"\"Demand is high this weekend. Recommend increasing rates to $185-195. Estimated additional revenue: $2,100.\""}
              </p>
              <Button className="mt-3 bg-cyan text-primary-foreground hover:bg-cyan/90">
                Apply Pricing
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expense Tracker */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{expense.category}</span>
                    <span className="text-sm font-medium">${(expense.amount / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber rounded-full"
                      style={{ width: `${(expense.amount / 42000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Monthly Expenses</span>
                <span className="text-lg font-bold text-foreground">$75,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Owner Report */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Weekly Owner Report Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg bg-secondary/30 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Grand Azure Hotel - Week 15, 2026</h3>
              <span className="text-xs text-muted-foreground">Auto-generated by Zuri AI</span>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                <p className="text-xl font-bold text-green">$98,420</p>
                <p className="text-xs text-green">+12% vs last week</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Occupancy</p>
                <p className="text-xl font-bold text-cyan">87.2%</p>
                <p className="text-xs text-cyan">Above target</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Guest Satisfaction</p>
                <p className="text-xl font-bold text-green">4.8/5.0</p>
                <p className="text-xs text-green">Excellent</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="text-green">Highlight:</span> VIP guest Natasha Volkov left a 5-star review after personalized Russian communication.
              </p>
              <p className="text-muted-foreground">
                <span className="text-amber">Attention:</span> Pool pump maintenance overdue - recommend scheduling this week.
              </p>
              <p className="text-muted-foreground">
                <span className="text-cyan">Recommendation:</span> Weekend pricing adjustment could generate additional $2,100 revenue.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
