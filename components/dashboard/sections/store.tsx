"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, ShoppingCart, Eye, X } from "lucide-react";

const inventoryCategories = [
  { name: "Beverages", items: 248, value: "$12,400", alerts: 2 },
  { name: "Food", items: 156, value: "$8,200", alerts: 0 },
  { name: "Linens", items: 340, value: "$15,600", alerts: 1 },
  { name: "Toiletries", items: 520, value: "$4,800", alerts: 1 },
  { name: "Minibar", items: 890, value: "$6,200", alerts: 0 },
  { name: "Cleaning", items: 124, value: "$2,400", alerts: 0 },
  { name: "Equipment", items: 45, value: "$28,000", alerts: 0 },
];

const lowStockAlerts = [
  { item: "Red Wine Cabernet", remaining: "3 bottles", severity: "critical", action: "Reorder NOW" },
  { item: "Bath Towels", remaining: "12 units", severity: "critical", action: "Below minimum" },
  { item: "Beer Lager", remaining: "18 bottles", severity: "low", action: "Reorder soon" },
];

const posTransactions = [
  { time: "22:47", location: "Rest. Azul", items: "Lobster x2, Wine", amount: 187, staff: "David Kim", status: "valid", flag: "" },
  { time: "22:41", location: "Sky Bar", items: "Whiskey x1", amount: 45, staff: "UNKNOWN", status: "suspicious", flag: "Review" },
  { time: "22:30", location: "Bar Oceano", items: "Vodka x3", amount: 89, staff: "Peter M", status: "alert", flag: "No Receipt" },
  { time: "21:15", location: "Rooftop", items: "Dinner x8", amount: 396, staff: "Ahmed Y", status: "valid", flag: "" },
  { time: "20:45", location: "Rest. Azul", items: "Seafood Platter", amount: 145, staff: "Maria S", status: "valid", flag: "" },
  { time: "20:30", location: "Spice Room", items: "Curry Set x4", amount: 112, staff: "David Kim", status: "valid", flag: "" },
];

const anomalyAlerts = [
  { time: "22:41", location: "Sky Bar", issue: "Whiskey sale with no staff ID", amount: 45 },
  { time: "22:30", location: "Bar Oceano", issue: "Transaction without receipt printed", amount: 89 },
];

const pendingOrders = [
  { supplier: "Coastal Wines", items: "Red Wine x24, White Wine x12", status: "In Transit", eta: "Apr 14", total: "$1,840" },
  { supplier: "Fresh Linens Co", items: "Bath Towels x100", status: "Processing", eta: "Apr 15", total: "$2,200" },
  { supplier: "Premium Spirits", items: "Whiskey x12, Vodka x24", status: "Confirmed", eta: "Apr 16", total: "$3,100" },
];

export function StoreSection() {
  return (
    <div className="space-y-6">
      {/* Low Stock Alerts Banner */}
      {lowStockAlerts.filter(a => a.severity === "critical").length > 0 && (
        <div className="p-4 rounded-lg bg-red/10 border border-red/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red" />
            <span className="font-medium text-red">Critical Stock Alerts</span>
          </div>
          <div className="space-y-2">
            {lowStockAlerts.filter(a => a.severity === "critical").map((alert, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">
                  <span className="text-red font-medium">{alert.item}</span>
                  <span className="text-muted-foreground"> — {alert.remaining}</span>
                </span>
                <Button size="sm" variant="destructive" className="h-7 text-xs">
                  {alert.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {inventoryCategories.map((category) => (
          <Card key={category.name} className="glass-card border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                {category.alerts > 0 && (
                  <span className="w-5 h-5 rounded-full bg-red/20 text-red text-xs flex items-center justify-center">
                    {category.alerts}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium mb-1">{category.name}</p>
              <p className="text-lg font-bold text-cyan">{category.items}</p>
              <p className="text-xs text-muted-foreground">{category.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* POS Transactions */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                {"Today's POS Transactions"}
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Location</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Items</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Staff</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {posTransactions.map((tx, index) => (
                    <tr
                      key={index}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        tx.status !== "valid" ? "bg-red/5" : index % 2 === 0 ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <td className="p-4 text-sm font-mono text-muted-foreground">{tx.time}</td>
                      <td className="p-4 text-sm">{tx.location}</td>
                      <td className="p-4 text-sm text-muted-foreground">{tx.items}</td>
                      <td className="p-4 text-sm font-medium text-cyan">${tx.amount}</td>
                      <td className="p-4">
                        <span className={`text-sm ${tx.staff === "UNKNOWN" ? "text-amber" : "text-muted-foreground"}`}>
                          {tx.staff}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tx.status === "valid" ? "bg-green/20 text-green" :
                          tx.status === "suspicious" ? "bg-amber/20 text-amber" :
                          "bg-red/20 text-red"
                        }`}>
                          {tx.status === "valid" ? "Valid" : tx.status === "suspicious" ? "Suspicious" : "Alert"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-red">{tx.flag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Anomaly Alerts */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              POS Anomaly Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {anomalyAlerts.map((alert, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-red/10 border border-red/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{alert.time}</span>
                  <span className="text-sm font-medium text-red">${alert.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{alert.location}</p>
                <p className="text-sm text-red mb-3">{alert.issue}</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-7 text-xs border border-white/10">
                    <Eye className="w-3 h-3 mr-1" />
                    Investigate
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground">
                    <X className="w-3 h-3 mr-1" />
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Supplier Orders */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Pending Supplier Orders</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Supplier</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Items</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Expected Delivery</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="p-4 text-sm font-medium">{order.supplier}</td>
                  <td className="p-4 text-sm text-muted-foreground">{order.items}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "In Transit" ? "bg-cyan/20 text-cyan" :
                      order.status === "Processing" ? "bg-amber/20 text-amber" :
                      "bg-green/20 text-green"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{order.eta}</td>
                  <td className="p-4 text-sm font-medium text-cyan">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
