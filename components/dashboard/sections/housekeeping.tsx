"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, Star } from "lucide-react";

// Generate room data for 100 rooms
const generateRoomData = () => {
  const rooms = [];
  for (let floor = 1; floor <= 10; floor++) {
    for (let room = 1; room <= 10; room++) {
      const roomNum = floor * 100 + room;
      const rand = Math.random();
      let status: "clean" | "occupied" | "cleaning" | "dirty" | "outOfOrder";
      if (rand < 0.34) status = "clean";
      else if (rand < 0.78) status = "occupied";
      else if (rand < 0.90) status = "cleaning";
      else if (rand < 0.98) status = "dirty";
      else status = "outOfOrder";
      
      const isVIP = [204, 304, 412, 108, 207].includes(roomNum);
      rooms.push({ number: roomNum, status, isVIP });
    }
  }
  return rooms;
};

const roomData = generateRoomData();

const taskBoard = {
  pending: [
    { room: 501, type: "Checkout Clean", staff: "Zainab M.", deadline: "11:00", priority: "high" },
    { room: 307, type: "Daily Refresh", staff: "—", deadline: "12:00", priority: "normal" },
    { room: 204, type: "Turndown", staff: "Aisha M.", deadline: "18:00", priority: "vip" },
  ],
  inProgress: [
    { room: 412, type: "Checkout Clean", staff: "Aisha M.", deadline: "10:30", priority: "vip" },
    { room: 305, type: "Daily Refresh", staff: "Zainab M.", deadline: "11:00", priority: "normal" },
  ],
  completed: [
    { room: 118, type: "Checkout Clean", staff: "Grace N.", deadline: "09:00", priority: "normal" },
    { room: 207, type: "Turndown", staff: "Fatma A.", deadline: "08:30", priority: "vip" },
    { room: 315, type: "Daily Refresh", staff: "Aisha M.", deadline: "09:30", priority: "normal" },
  ],
};

const supplies = [
  { name: "Clean Linens", percentage: 68, status: "ok" },
  { name: "Towels", percentage: 71, status: "ok" },
  { name: "Toiletries", percentage: 44, status: "low" },
  { name: "Minibar Items", percentage: 52, status: "ok" },
];

export function HousekeepingSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "clean": return "bg-green text-green-foreground";
      case "occupied": return "bg-cyan text-cyan-foreground";
      case "cleaning": return "bg-amber text-amber-foreground";
      case "dirty": return "bg-red text-red-foreground";
      case "outOfOrder": return "bg-muted text-muted-foreground";
      default: return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red/20 text-red border-red/30";
      case "vip": return "bg-amber/20 text-amber border-amber/30";
      default: return "bg-secondary text-muted-foreground border-white/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Rooms Cleaned</p>
            <p className="text-2xl font-bold text-green">34/42</p>
            <p className="text-xs text-muted-foreground">scheduled</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Clean Time</p>
            <p className="text-2xl font-bold text-foreground">28 min</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Fastest Today</p>
            <p className="text-lg font-bold text-cyan">Aisha (19 min)</p>
            <p className="text-xs text-muted-foreground">Room 412</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Urgent (Arrival {"<"}2h)</p>
            <p className="text-2xl font-bold text-red">3</p>
            <p className="text-xs text-red">204, 310, 507</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Status Grid */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Room Status Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-1">
                {roomData.map((room) => (
                  <div
                    key={room.number}
                    className={`aspect-square rounded flex items-center justify-center text-[10px] font-medium relative ${getStatusColor(room.status)} ${
                      room.isVIP ? "ring-2 ring-amber ring-offset-1 ring-offset-background" : ""
                    }`}
                    title={`Room ${room.number}: ${room.status}${room.isVIP ? " (VIP)" : ""}`}
                  >
                    {room.number % 100}
                    {room.isVIP && (
                      <Star className="absolute -top-1 -right-1 w-2.5 h-2.5 text-amber fill-amber" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-green" />
                  <span className="text-muted-foreground">Clean</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-cyan" />
                  <span className="text-muted-foreground">Occupied</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-amber" />
                  <span className="text-muted-foreground">Cleaning</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-red" />
                  <span className="text-muted-foreground">Dirty</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-muted" />
                  <span className="text-muted-foreground">Out of Order</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber fill-amber" />
                  <span className="text-muted-foreground">VIP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supplies */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Linen & Supplies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supplies.map((supply) => (
              <div key={supply.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">{supply.name}</span>
                  <span className={`text-sm font-medium ${
                    supply.status === "low" ? "text-amber" : "text-green"
                  }`}>
                    {supply.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      supply.status === "low" ? "bg-amber" : "bg-green"
                    }`}
                    style={{ width: `${supply.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Task Board (Kanban) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber" />
              Pending ({taskBoard.pending.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {taskBoard.pending.map((task, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getPriorityColor(task.priority)}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Room {task.room}</span>
                  {task.priority === "vip" && <Star className="w-3 h-3 text-amber fill-amber" />}
                </div>
                <p className="text-xs text-muted-foreground">{task.type}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <User className="w-3 h-3" />
                    {task.staff}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {task.deadline}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan" />
              In Progress ({taskBoard.inProgress.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {taskBoard.inProgress.map((task, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getPriorityColor(task.priority)}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Room {task.room}</span>
                  {task.priority === "vip" && <Star className="w-3 h-3 text-amber fill-amber" />}
                </div>
                <p className="text-xs text-muted-foreground">{task.type}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <User className="w-3 h-3" />
                    {task.staff}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {task.deadline}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green" />
              Completed ({taskBoard.completed.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {taskBoard.completed.map((task, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border bg-green/5 border-green/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-green">Room {task.room}</span>
                  {task.priority === "vip" && <Star className="w-3 h-3 text-amber fill-amber" />}
                </div>
                <p className="text-xs text-muted-foreground">{task.type}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <User className="w-3 h-3" />
                    {task.staff}
                  </div>
                  <div className="flex items-center gap-1 text-green">
                    <Clock className="w-3 h-3" />
                    {task.deadline}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
