"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Shield, 
  User, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Radio,
  MessageSquare,
  Navigation,
  Activity
} from "lucide-react";

const securityAgents = [
  { 
    id: 1, 
    name: "John Peter", 
    role: "Night Patrol", 
    zone: "Zone A - Main Building",
    status: "active",
    lastReport: "2 min ago",
    currentLocation: "Lobby Entrance",
    checkpointsCompleted: 3,
    checkpointsTotal: 6,
    alerts: 1,
    lastMessage: "All clear at main entrance. Proceeding to parking area."
  },
  { 
    id: 2, 
    name: "Hassan Mwangi", 
    role: "Perimeter Guard", 
    zone: "Zone B - Pool & Beach",
    status: "active",
    lastReport: "5 min ago",
    currentLocation: "Beach Gate",
    checkpointsCompleted: 4,
    checkpointsTotal: 5,
    alerts: 0,
    lastMessage: "Beach area secured. Light maintenance needed on east fence."
  },
  { 
    id: 3, 
    name: "Ali Rashid", 
    role: "Building Security", 
    zone: "Zone C - Staff Areas",
    status: "break",
    lastReport: "12 min ago",
    currentLocation: "Staff Cafeteria",
    checkpointsCompleted: 2,
    checkpointsTotal: 4,
    alerts: 0,
    lastMessage: "Taking scheduled 15-min break. Kitchen area clear."
  },
  { 
    id: 4, 
    name: "Fatima Salim", 
    role: "VIP Floor Security", 
    zone: "Zone D - Floors 5-7",
    status: "active",
    lastReport: "1 min ago",
    currentLocation: "Floor 6 Corridor",
    checkpointsCompleted: 5,
    checkpointsTotal: 5,
    alerts: 0,
    lastMessage: "VIP floor sweep complete. Suite 601 guest reported noise complaint - resolved."
  },
];

const liveReports = [
  { time: "22:47", agent: "Fatima Salim", type: "report", message: "Suite 601 noise complaint resolved. Guests in 603 were having a celebration, now quiet." },
  { time: "22:45", agent: "John Peter", type: "alert", message: "Motion detected at storage entrance. Investigating now.", severity: "high" },
  { time: "22:42", agent: "Hassan Mwangi", type: "report", message: "Completed beach perimeter check. All access points secured." },
  { time: "22:38", agent: "Ali Rashid", type: "checkpoint", message: "Kitchen area checkpoint confirmed. Staff area all clear." },
  { time: "22:35", agent: "John Peter", type: "report", message: "Unknown vehicle in parking lot for 90+ minutes. License plate recorded: ZNZ-4521." },
  { time: "22:30", agent: "Fatima Salim", type: "checkpoint", message: "Floor 7 checkpoint confirmed. Roof access secured." },
  { time: "22:25", agent: "Hassan Mwangi", type: "report", message: "Pool area closed and locked. Chemical levels checked - all normal." },
  { time: "22:20", agent: "System", type: "shift", message: "Night shift started. 4 agents on duty." },
];

const zoneStatus = [
  { zone: "Zone A", name: "Main Building", status: "secure", incidents: 1 },
  { zone: "Zone B", name: "Pool & Beach", status: "secure", incidents: 0 },
  { zone: "Zone C", name: "Staff Areas", status: "secure", incidents: 0 },
  { zone: "Zone D", name: "VIP Floors", status: "secure", incidents: 0 },
  { zone: "Zone E", name: "Parking", status: "attention", incidents: 1 },
  { zone: "Zone F", name: "Storage", status: "alert", incidents: 1 },
];

export function SecuritySection() {
  return (
    <div className="space-y-6">
      {/* Live Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {securityAgents.map((agent, index) => (
          <Card 
            key={agent.id} 
            className={`glass-card border-white/10 hover-lift fade-up ${
              agent.alerts > 0 ? 'border-amber/30' : ''
            }`}
            style={{ "--i": index } as React.CSSProperties}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    agent.status === 'active' ? 'bg-green/20' : 'bg-amber/20'
                  }`}>
                    <User className={`w-5 h-5 ${
                      agent.status === 'active' ? 'text-green' : 'text-amber'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${
                    agent.status === 'active' ? 'bg-green animate-pulse' : 'bg-amber'
                  }`} />
                  <span className={`text-[10px] uppercase tracking-wider ${
                    agent.status === 'active' ? 'text-green' : 'text-amber'
                  }`}>
                    {agent.status === 'active' ? 'LIVE' : 'BREAK'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{agent.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Navigation className="w-3 h-3" />
                  <span>{agent.zone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Last report: {agent.lastReport}</span>
                </div>
              </div>

              {/* Checkpoint Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  <span>Checkpoints</span>
                  <span>{agent.checkpointsCompleted}/{agent.checkpointsTotal}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan to-green rounded-full transition-all duration-500"
                    style={{ width: `${(agent.checkpointsCompleted / agent.checkpointsTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Last Message */}
              <div className="p-2 bg-white/5 rounded-lg">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  &ldquo;{agent.lastMessage}&rdquo;
                </p>
              </div>

              {agent.alerts > 0 && (
                <div className="mt-3 flex items-center gap-2 text-amber">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{agent.alerts} active alert</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Reports Feed */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan animate-pulse" />
                <CardTitle className="text-sm font-medium">Live Reports Feed</CardTitle>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Auto-refreshing
              </span>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[400px] overflow-y-auto">
                {liveReports.map((report, index) => (
                  <div 
                    key={index}
                    className={`flex gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                      report.type === 'alert' ? 'bg-red/5' : ''
                    }`}
                  >
                    <span className="text-xs font-mono text-muted-foreground w-12 shrink-0">
                      {report.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{report.agent}</span>
                        {report.type === 'alert' && (
                          <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded bg-red/20 text-red">
                            ALERT
                          </span>
                        )}
                        {report.type === 'checkpoint' && (
                          <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded bg-green/20 text-green">
                            CHECKPOINT
                          </span>
                        )}
                        {report.type === 'shift' && (
                          <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded bg-cyan/20 text-cyan">
                            SHIFT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{report.message}</p>
                    </div>
                    {report.type === 'alert' && (
                      <Button size="sm" variant="outline" className="shrink-0 h-8 text-xs border-red/30 text-red hover:bg-red/10">
                        Respond
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone Status & Quick Actions */}
        <div className="space-y-6">
          {/* Zone Status */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan" />
                Zone Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {zoneStatus.map((zone, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      zone.status === 'secure' ? 'bg-green' :
                      zone.status === 'attention' ? 'bg-amber' : 'bg-red animate-pulse'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{zone.zone}</p>
                      <p className="text-[10px] text-muted-foreground">{zone.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {zone.incidents > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        zone.status === 'alert' ? 'bg-red/20 text-red' : 'bg-amber/20 text-amber'
                      }`}>
                        {zone.incidents}
                      </span>
                    )}
                    {zone.status === 'secure' ? (
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    ) : zone.status === 'attention' ? (
                      <AlertTriangle className="w-4 h-4 text-amber" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-white/10">
                <MessageSquare className="w-4 h-4" />
                Broadcast to All Agents
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-white/10">
                <Activity className="w-4 h-4" />
                Request Status Update
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-red/30 text-red hover:bg-red/10">
                <AlertTriangle className="w-4 h-4" />
                Trigger Emergency Alert
              </Button>
            </CardContent>
          </Card>

          {/* Shift Summary */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Night Shift Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-semibold text-cyan">4</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Agents Active</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-semibold text-green">14</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Checkpoints Done</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-semibold text-amber">2</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Open Incidents</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-semibold text-foreground">6h</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Shift Remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
