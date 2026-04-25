"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const venues = [
  { id: "azul", name: "Restaurant Azul", capacity: 110, current: 78 },
  { id: "rooftop", name: "Rooftop Terrace", capacity: 80, current: 45 },
  { id: "spice", name: "The Spice Room", capacity: 60, current: 32 },
  { id: "bar-oceano", name: "Bar Oceano", capacity: 40, current: 28 },
  { id: "sky-bar", name: "Sky Bar", capacity: 50, current: 35 },
];

const posTransactions = [
  { time: "22:47", location: "Rest. Azul", items: "Grilled Lobster x2, Wine x1", amount: 187, staff: "David Kim", status: "valid" },
  { time: "22:45", location: "Bar Oceano", items: "Cocktails x4", amount: 64, staff: "Peter Mwangi", status: "valid" },
  { time: "22:41", location: "Sky Bar", items: "Whiskey x1", amount: 45, staff: "UNKNOWN", status: "suspicious" },
  { time: "22:38", location: "Rooftop", items: "Dinner x6", amount: 312, staff: "Ahmed Yusuf", status: "valid" },
  { time: "22:30", location: "Bar Oceano", items: "Vodka x3", amount: 89, staff: "Peter M", status: "alert" },
];

const inventoryAlerts = [
  { item: "Beer Lager", status: "low", remaining: "12 bottles" },
  { item: "Red Wine Cabernet", status: "critical", remaining: "3 bottles" },
  { item: "Sparkling Water", status: "ok", remaining: "200 units" },
];

const tableData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: ["occupied", "empty", "reserved", "issue"][Math.floor(Math.random() * 4)],
}));

export function RestaurantsSection() {
  const [selectedVenue, setSelectedVenue] = useState("azul");

  const currentVenue = venues.find((v) => v.id === selectedVenue);

  return (
    <div className="space-y-6">
      {/* Venue Tabs */}
      <div className="flex flex-wrap gap-2">
        {venues.map((venue) => (
          <button
            key={venue.id}
            onClick={() => setSelectedVenue(venue.id)}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              selectedVenue === venue.id
                ? "bg-cyan/20 text-cyan border border-cyan/30"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            {venue.name} ({venue.current}/{venue.capacity})
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total F&B Revenue Today</p>
            <p className="text-2xl font-bold text-cyan">$8,240</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Covers Served Today</p>
            <p className="text-2xl font-bold text-foreground">347</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Ticket</p>
            <p className="text-2xl font-bold text-foreground">$23.70</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Most Ordered</p>
            <p className="text-lg font-bold text-green">Grilled Lobster (47x)</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Slowest Item</p>
            <p className="text-lg font-bold text-amber">Truffle Risotto (3x)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Grid & Venue Info */}
        <div className="lg:col-span-8 space-y-6">
          {/* Current Venue Occupancy */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{currentVenue?.name} - Table Layout</span>
                <span className="text-cyan">
                  {currentVenue?.current}/{currentVenue?.capacity} covers ({Math.round((currentVenue?.current || 0) / (currentVenue?.capacity || 1) * 100)}%)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {tableData.map((table) => (
                  <div
                    key={table.id}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium border ${
                      table.status === "occupied" ? "bg-green/20 border-green/30 text-green" :
                      table.status === "empty" ? "bg-secondary border-white/10 text-muted-foreground" :
                      table.status === "reserved" ? "bg-amber/20 border-amber/30 text-amber" :
                      "bg-red/20 border-red/30 text-red"
                    }`}
                  >
                    T{table.id}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-green/20 border border-green/30" />
                  <span className="text-muted-foreground">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-secondary border border-white/10" />
                  <span className="text-muted-foreground">Empty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber/20 border border-amber/30" />
                  <span className="text-muted-foreground">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-red/20 border border-red/30" />
                  <span className="text-muted-foreground">Issue</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Alerts */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Inventory Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryAlerts.map((item) => (
                  <div
                    key={item.item}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      item.status === "critical" ? "bg-red/10 border border-red/20" :
                      item.status === "low" ? "bg-amber/10 border border-amber/20" :
                      "bg-green/10 border border-green/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.status !== "ok" && (
                        <AlertTriangle className={`w-4 h-4 ${item.status === "critical" ? "text-red" : "text-amber"}`} />
                      )}
                      <span className="text-sm font-medium">{item.item}</span>
                    </div>
                    <span className={`text-sm ${
                      item.status === "critical" ? "text-red" :
                      item.status === "low" ? "text-amber" : "text-green"
                    }`}>
                      {item.remaining}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* POS Live Feed */}
        <div className="lg:col-span-4">
          <Card className="glass-card border-white/10 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
                </span>
                POS Live Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {posTransactions.map((tx, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    tx.status === "valid" ? "bg-white/[0.02] border-white/5" :
                    tx.status === "suspicious" ? "bg-amber/10 border-amber/20" :
                    "bg-red/10 border-red/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{tx.time}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      tx.status === "valid" ? "bg-green/20 text-green" :
                      tx.status === "suspicious" ? "bg-amber/20 text-amber" :
                      "bg-red/20 text-red"
                    }`}>
                      {tx.status === "valid" ? "Valid" : tx.status === "suspicious" ? "Flag" : "Alert"}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{tx.location}</p>
                  <p className="text-xs text-muted-foreground">{tx.items}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-cyan">${tx.amount}</span>
                    <span className={`text-xs ${tx.staff === "UNKNOWN" ? "text-amber" : "text-muted-foreground"}`}>
                      {tx.staff}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
