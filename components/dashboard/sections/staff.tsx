"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageSquare, Phone, AlertTriangle, Zap } from "lucide-react";

const departments = ["All", "Housekeeping", "Security", "F&B", "Front Office", "Maintenance", "Store", "Management"];

const staffData = [
  { id: 1, name: "Aisha Mohammed", dept: "Housekeeping", role: "Room Attendant", shift: "08-16", status: "on-duty", score: 87, reliability: 92, task: "Cleaning Room 412", lastCheckin: "02:14" },
  { id: 2, name: "John Peter", dept: "Security", role: "Night Guard", shift: "20-08", status: "alert", score: 72, reliability: 75, task: "Gate Patrol", lastCheckin: "MISSED 02:00" },
  { id: 3, name: "Fatma Ali", dept: "Front Office", role: "Receptionist", shift: "16-00", status: "on-duty", score: 91, reliability: 95, task: "Guest Check-in", lastCheckin: "01:55" },
  { id: 4, name: "Grace Njeri", dept: "Housekeeping", role: "Supervisor", shift: "08-16", status: "on-duty", score: 98, reliability: 99, task: "Floor Inspection", lastCheckin: "02:10" },
  { id: 5, name: "Hassan Omar", dept: "Security", role: "CCTV Operator", shift: "00-08", status: "idle", score: 76, reliability: 78, task: "Monitoring", lastCheckin: "01:30" },
  { id: 6, name: "David Kim", dept: "F&B", role: "Waiter", shift: "18-02", status: "on-duty", score: 89, reliability: 94, task: "Table Service", lastCheckin: "02:12" },
  { id: 7, name: "Maria Santos", dept: "F&B", role: "Bartender", shift: "18-02", status: "on-duty", score: 85, reliability: 88, task: "Bar Service", lastCheckin: "02:08" },
  { id: 8, name: "Ahmed Yusuf", dept: "F&B", role: "Chef", shift: "14-22", status: "on-duty", score: 94, reliability: 96, task: "Kitchen Prep", lastCheckin: "02:05" },
  { id: 9, name: "Peter Mwangi", dept: "F&B", role: "Bartender", shift: "18-02", status: "on-duty", score: 82, reliability: 85, task: "Cocktail Service", lastCheckin: "02:00" },
  { id: 10, name: "Ali Juma", dept: "Maintenance", role: "Technician", shift: "08-16", status: "on-duty", score: 88, reliability: 90, task: "AC Repair Room 210", lastCheckin: "02:04" },
  { id: 11, name: "Said Abdallah", dept: "Maintenance", role: "Technician", shift: "08-16", status: "on-duty", score: 86, reliability: 91, task: "Fridge Repair", lastCheckin: "02:02" },
  { id: 12, name: "Amina Hassan", dept: "Front Office", role: "Concierge", shift: "08-16", status: "on-duty", score: 93, reliability: 97, task: "Guest Services", lastCheckin: "02:10" },
  { id: 13, name: "Joseph Kamau", dept: "Security", role: "Guard", shift: "08-16", status: "on-duty", score: 84, reliability: 89, task: "Lobby Patrol", lastCheckin: "02:08" },
  { id: 14, name: "Zainab Mwanza", dept: "Housekeeping", role: "Room Attendant", shift: "08-16", status: "on-duty", score: 90, reliability: 93, task: "Cleaning Room 305", lastCheckin: "02:06" },
  { id: 15, name: "James Ochieng", dept: "Store", role: "Cashier", shift: "08-16", status: "on-duty", score: 81, reliability: 86, task: "POS Operations", lastCheckin: "02:00" },
];

export function StaffSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || staff.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-duty": return "bg-green";
      case "alert": return "bg-red";
      case "idle": return "bg-amber";
      default: return "bg-muted";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green";
    if (score >= 80) return "text-cyan";
    if (score >= 70) return "text-amber";
    return "text-red";
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-white/10"
          />
        </div>
        <Button className="bg-cyan text-primary-foreground hover:bg-cyan/90">
          <Zap className="w-4 h-4 mr-2" />
          Generate Morning Briefings
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">On Duty</p>
            <p className="text-2xl font-bold text-green">142</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Off Duty</p>
            <p className="text-2xl font-bold text-muted-foreground">8</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Late Check-in</p>
            <p className="text-2xl font-bold text-amber">3</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Top Performer</p>
            <p className="text-lg font-bold text-cyan">Grace Njeri (98%)</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Tabs */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              selectedDept === dept
                ? "bg-cyan/20 text-cyan border border-cyan/30"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Staff Table */}
      <Card className="glass-card border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Staff</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Department</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Role</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Shift</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Performance</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Reliability</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Current Task</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Last Check-in</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => (
                <tr
                  key={staff.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          {staff.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{staff.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{staff.dept}</td>
                  <td className="p-4 text-sm text-muted-foreground">{staff.role}</td>
                  <td className="p-4 text-sm font-mono text-muted-foreground">{staff.shift}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(staff.status)}`} />
                      <span className="text-xs capitalize">{staff.status.replace("-", " ")}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan rounded-full"
                          style={{ width: `${staff.score}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${getScoreColor(staff.score)}`}>
                        {staff.score}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${staff.reliability >= 90 ? "text-green" : "text-amber"}`}>
                      {staff.reliability}%
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground max-w-[150px] truncate">
                    {staff.task}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-mono ${
                      staff.lastCheckin.includes("MISSED") ? "text-red" : "text-muted-foreground"
                    }`}>
                      {staff.lastCheckin}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {staff.status === "alert" ? (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red hover:text-red hover:bg-red/10">
                          <AlertTriangle className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
