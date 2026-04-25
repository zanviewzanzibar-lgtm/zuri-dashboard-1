"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Phone, AlertTriangle, Star } from "lucide-react";

const guestData = [
  { room: "204", name: "Marco Rossi", flag: "IT", type: "VIP", dayOf: 2, totalDays: 5, requests: "Late checkout, wine", status: "Happy", satisfaction: 5, lang: "IT" },
  { room: "110", name: "Anna Schmidt", flag: "DE", type: "Family", dayOf: 1, totalDays: 4, requests: "Baby crib (delivered)", status: "Happy", satisfaction: 5, lang: "DE" },
  { room: "305", name: "John Smith", flag: "GB", type: "Standard", dayOf: 3, totalDays: 3, requests: "Extra towels", status: "Satisfied", satisfaction: 4, lang: "EN" },
  { room: "412", name: "Fatima Noor", flag: "AE", type: "VIP", dayOf: 1, totalDays: 7, requests: "Spa booking (confirmed)", status: "Happy", satisfaction: 5, lang: "AR" },
  { room: "210", name: "David Lee", flag: "US", type: "Problem", dayOf: 2, totalDays: 3, requests: "AC not working", status: "Unhappy", satisfaction: 2, lang: "EN" },
  { room: "304", name: "Natasha Volkov", flag: "RU", type: "VIP", dayOf: 4, totalDays: 4, requests: "—", status: "Delighted", satisfaction: 5, lang: "RU" },
  { room: "118", name: "Chen Wei", flag: "CN", type: "Standard", dayOf: 2, totalDays: 5, requests: "Green tea", status: "Happy", satisfaction: 5, lang: "ZH" },
  { room: "207", name: "Sophie Martin", flag: "FR", type: "VIP", dayOf: 3, totalDays: 6, requests: "Champagne", status: "Happy", satisfaction: 5, lang: "FR" },
  { room: "315", name: "Kenji Tanaka", flag: "JP", type: "Standard", dayOf: 1, totalDays: 4, requests: "Quiet room", status: "Satisfied", satisfaction: 4, lang: "JA" },
  { room: "422", name: "Elena Garcia", flag: "ES", type: "Family", dayOf: 2, totalDays: 5, requests: "Extra bed", status: "Happy", satisfaction: 5, lang: "ES" },
  { room: "503", name: "Ahmed Hassan", flag: "EG", type: "Standard", dayOf: 4, totalDays: 4, requests: "—", status: "Satisfied", satisfaction: 4, lang: "AR" },
  { room: "108", name: "Lisa Anderson", flag: "US", type: "VIP", dayOf: 1, totalDays: 3, requests: "Airport pickup", status: "Happy", satisfaction: 5, lang: "EN" },
];

const upcomingArrivals = [
  { name: "Michael Brown", flag: "US", room: "401", eta: "14:00", status: "ready" },
  { name: "Yuki Sato", flag: "JP", room: "209", eta: "15:30", status: "in-progress" },
  { name: "Hans Mueller", flag: "DE", room: "312", eta: "16:00", status: "ready" },
  { name: "Priya Sharma", flag: "IN", room: "506", eta: "18:00", status: "not-started" },
];

const flagEmojis: Record<string, string> = {
  IT: "🇮🇹", DE: "🇩🇪", GB: "🇬🇧", AE: "🇦🇪", US: "🇺🇸", RU: "🇷🇺",
  CN: "🇨🇳", FR: "🇫🇷", JP: "🇯🇵", ES: "🇪🇸", EG: "🇪🇬", IN: "🇮🇳",
};

export function GuestsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "VIP": return "bg-amber/20 text-amber border-amber/30";
      case "Family": return "bg-cyan/20 text-cyan border-cyan/30";
      case "Problem": return "bg-red/20 text-red border-red/30";
      default: return "bg-secondary text-muted-foreground border-white/10";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Happy":
      case "Delighted": return "text-green";
      case "Satisfied": return "text-cyan";
      case "Unhappy": return "text-red";
      default: return "text-muted-foreground";
    }
  };

  const filteredGuests = guestData.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.room.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Checked In</p>
            <p className="text-2xl font-bold text-cyan">87</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Arrivals Today</p>
            <p className="text-2xl font-bold text-green">12</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Departures Today</p>
            <p className="text-2xl font-bold text-amber">8</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">VIP Guests</p>
            <p className="text-2xl font-bold text-amber">11</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Open Requests</p>
            <p className="text-2xl font-bold text-cyan">14</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Stay</p>
            <p className="text-2xl font-bold text-foreground">3.4 nights</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search guests or rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-secondary border-white/10"
        />
      </div>

      {/* Guest Table */}
      <Card className="glass-card border-white/10 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Current Guests</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Room</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Guest</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Stay</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Requests</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Satisfaction</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest, index) => (
                <tr
                  key={guest.room}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? "bg-white/[0.02]" : ""
                    }`}
                >
                  <td className="p-4">
                    <span className={`text-sm font-mono font-medium ${guest.type === "VIP" ? "text-amber" : ""}`}>
                      {guest.room}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{flagEmojis[guest.flag]}</span>
                      <span className="text-sm font-medium">{guest.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTypeStyles(guest.type)}`}>
                      {guest.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    Day {guest.dayOf} of {guest.totalDays}
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${guest.requests.includes("not working") ? "text-red" : "text-muted-foreground"}`}>
                      {guest.requests}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${getStatusStyles(guest.status)}`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < guest.satisfaction ? "text-amber fill-amber" : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {guest.type === "Problem" ? (
                        <Button size="sm" variant="ghost" className="h-8 px-3 text-red hover:text-red hover:bg-red/10">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          URGENT
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upcoming Arrivals */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Upcoming Arrivals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingArrivals.map((arrival) => (
              <div
                key={arrival.room}
                className="p-4 rounded-lg bg-secondary/50 border border-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{flagEmojis[arrival.flag]}</span>
                  <span className="font-medium text-sm">{arrival.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Room {arrival.room}</span>
                  <span>ETA: {arrival.eta}</span>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${arrival.status === "ready" ? "bg-green/20 text-green" :
                      arrival.status === "in-progress" ? "bg-amber/20 text-amber" :
                        "bg-red/20 text-red"
                    }`}>
                    {arrival.status === "ready" ? "Ready" : arrival.status === "in-progress" ? "In Progress" : "Not Started"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}