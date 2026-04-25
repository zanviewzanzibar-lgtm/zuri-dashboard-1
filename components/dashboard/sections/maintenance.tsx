"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, User, Phone, Calendar, AlertTriangle } from "lucide-react";

const activeIssues = [
  { id: "M-047", location: "Room 210", issue: "AC unit failure", priority: "critical", status: "In Progress", assigned: "Ali Juma", openSince: "3h ago", estFix: "1h" },
  { id: "M-046", location: "Pool", issue: "Pump pressure low", priority: "medium", status: "Pending", assigned: "—", openSince: "1d ago", estFix: "2d" },
  { id: "M-045", location: "Restaurant Azul", issue: "Walk-in fridge temp high", priority: "high", status: "In Progress", assigned: "Said Abdallah", openSince: "2h ago", estFix: "30min" },
  { id: "M-044", location: "Lobby", issue: "Elevator button stuck, floor 3", priority: "medium", status: "Open", assigned: "—", openSince: "2d ago", estFix: "—" },
  { id: "M-043", location: "Room 305", issue: "Shower drain slow", priority: "low", status: "Scheduled", assigned: "—", openSince: "Today", estFix: "Tomorrow" },
];

const preventiveMaintenance = [
  { date: "Apr 15", task: "HVAC Filter Replacement", department: "All Floors", status: "scheduled" },
  { date: "Apr 18", task: "Elevator Inspection", department: "Building", status: "scheduled" },
  { date: "Apr 20", task: "Pool Pump Service", department: "Pool", status: "overdue" },
  { date: "Apr 22", task: "Generator Test", department: "Facilities", status: "scheduled" },
  { date: "Apr 25", task: "Fire System Check", department: "Safety", status: "scheduled" },
];

const vendors = [
  { name: "Elevator Co.", type: "Elevator", lastService: "Mar 15, 2026", nextScheduled: "Jun 15, 2026", phone: "+255 xxx xxx" },
  { name: "CoolTech HVAC", type: "HVAC", lastService: "Apr 1, 2026", nextScheduled: "Jul 1, 2026", phone: "+255 xxx xxx" },
  { name: "PowerGrid Electric", type: "Electrical", lastService: "Feb 20, 2026", nextScheduled: "May 20, 2026", phone: "+255 xxx xxx" },
  { name: "AquaFlow Plumbing", type: "Plumbing", lastService: "Mar 28, 2026", nextScheduled: "Jun 28, 2026", phone: "+255 xxx xxx" },
];

const partsInventory = [
  { part: "AC Filters", stock: 24, minimum: 10, status: "ok" },
  { part: "Light Bulbs (LED)", stock: 156, minimum: 50, status: "ok" },
  { part: "Faucet Cartridges", stock: 8, minimum: 15, status: "low" },
  { part: "Drain Cleaners", stock: 12, minimum: 10, status: "ok" },
  { part: "Electrical Fuses", stock: 3, minimum: 10, status: "critical" },
];

export function MaintenanceSection() {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red/20 text-red";
      case "high": return "bg-amber/20 text-amber";
      case "medium": return "bg-cyan/20 text-cyan";
      case "low": return "bg-green/20 text-green";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Issues Table */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Active Issues
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Location</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Issue</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Priority</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Assigned</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Open Since</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Est. Fix</th>
              </tr>
            </thead>
            <tbody>
              {activeIssues.map((issue, index) => (
                <tr
                  key={issue.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="p-4 text-sm font-mono text-cyan">{issue.id}</td>
                  <td className="p-4 text-sm">{issue.location}</td>
                  <td className="p-4 text-sm text-muted-foreground">{issue.issue}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyles(issue.priority)}`}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{issue.status}</td>
                  <td className="p-4 text-sm text-muted-foreground">{issue.assigned}</td>
                  <td className="p-4 text-sm text-muted-foreground">{issue.openSince}</td>
                  <td className="p-4 text-sm text-muted-foreground">{issue.estFix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preventive Maintenance Calendar */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Preventive Maintenance Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {preventiveMaintenance.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.status === "overdue" ? "bg-red/10 border-red/20" : "bg-white/[0.02] border-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-mono ${item.status === "overdue" ? "text-red" : "text-muted-foreground"}`}>
                    {item.date}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-muted-foreground">{item.department}</p>
                  </div>
                </div>
                {item.status === "overdue" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-red/20 text-red">OVERDUE</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vendor Contacts */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Vendor Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vendors.map((vendor, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{vendor.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    {vendor.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="block">Last Service</span>
                    <span className="text-foreground">{vendor.lastService}</span>
                  </div>
                  <div>
                    <span className="block">Next Scheduled</span>
                    <span className="text-foreground">{vendor.nextScheduled}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3 mr-1" />
                  {vendor.phone}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Parts Inventory */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Critical Parts Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {partsInventory.map((part, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  part.status === "critical" ? "bg-red/10 border-red/20" :
                  part.status === "low" ? "bg-amber/10 border-amber/20" :
                  "bg-white/[0.02] border-white/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {part.status !== "ok" && (
                    <AlertTriangle className={`w-4 h-4 ${
                      part.status === "critical" ? "text-red" : "text-amber"
                    }`} />
                  )}
                  <span className="text-sm font-medium">{part.part}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${
                    part.status === "critical" ? "text-red" :
                    part.status === "low" ? "text-amber" : "text-green"
                  }`}>
                    {part.stock}
                  </span>
                  <span className="text-xs text-muted-foreground">min: {part.minimum}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
