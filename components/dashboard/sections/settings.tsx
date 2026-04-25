"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bell,
  Shield,
  Link2,
  Globe,
  RefreshCw,
  Check,
  ExternalLink,
  Zap,
  Brain,
  Hotel,
  Clock,
  Languages,
} from "lucide-react";

const integrations = [
  { id: "whatsapp", name: "WhatsApp Business", description: "Guest messaging and notifications", connected: true, lastSync: "Real-time" },
  { id: "booking", name: "Booking.com", description: "Reservation sync", connected: true, lastSync: "5 mins ago" },
  { id: "airbnb", name: "Airbnb", description: "Listing and booking sync", connected: true, lastSync: "10 mins ago" },
  { id: "stripe", name: "Stripe", description: "Payment processing", connected: true, lastSync: "Real-time" },
  { id: "pos", name: "POS System", description: "Restaurant and bar transactions", connected: true, lastSync: "Real-time" },
  { id: "cctv", name: "CCTV System", description: "Security camera integration", connected: true, lastSync: "Live" },
];

const notificationSettings = [
  { id: "security", label: "Security Alerts", description: "Critical security events and alerts", enabled: true },
  { id: "guest_requests", label: "Guest Requests", description: "New guest service requests", enabled: true },
  { id: "staff_issues", label: "Staff Issues", description: "Missed check-ins and performance alerts", enabled: true },
  { id: "maintenance", label: "Maintenance Alerts", description: "Equipment failures and critical repairs", enabled: true },
  { id: "revenue", label: "Revenue Insights", description: "Daily revenue summaries and anomalies", enabled: false },
  { id: "inventory", label: "Inventory Alerts", description: "Low stock warnings", enabled: true },
];

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(notificationSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary border border-border p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="hotel" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <Hotel className="w-4 h-4 mr-2" />
            Hotel
          </TabsTrigger>
          <TabsTrigger value="zuri" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <Brain className="w-4 h-4 mr-2" />
            Zuri AI
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
            <Link2 className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium">Owner Profile</CardTitle>
              <CardDescription>Your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 bg-cyan/20">
                  <AvatarFallback className="bg-cyan/20 text-cyan text-2xl font-semibold">RE</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Rer" className="bg-secondary border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="rer@grandazure.com" className="bg-secondary border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+255 xxx xxx xxx" className="bg-secondary border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Owner" disabled className="bg-secondary border-white/10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-cyan text-primary-foreground hover:bg-cyan/90" disabled={isSaving}>
              {isSaving ? (
                <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Saving...</>
              ) : (
                <><Check className="w-4 h-4 mr-2" />Save Changes</>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Hotel Tab */}
        <TabsContent value="hotel" className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium">Hotel Information</CardTitle>
              <CardDescription>Configure your hotel settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input id="hotelName" defaultValue="Grand Azure Hotel" className="bg-secondary border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rooms">Total Rooms</Label>
                  <Input id="rooms" defaultValue="100" className="bg-secondary border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="eat">
                    <SelectTrigger className="bg-secondary border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="bg-secondary border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="tzs">TZS</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input defaultValue="Stone Town, Zanzibar, Tanzania" className="bg-secondary border-white/10" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zuri AI Tab */}
        <TabsContent value="zuri" className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan" />
                Zuri AI Configuration
              </CardTitle>
              <CardDescription>Configure how Zuri operates and communicates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Staff Communication Languages</p>
                    <p className="text-sm text-muted-foreground">Languages for staff briefings</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-cyan/20 text-cyan border-cyan/30">Swahili</Badge>
                  <Badge className="bg-cyan/20 text-cyan border-cyan/30">English</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Morning Briefing Time</p>
                    <p className="text-sm text-muted-foreground">When to send daily briefings</p>
                  </div>
                </div>
                <Select defaultValue="0600">
                  <SelectTrigger className="w-[120px] bg-secondary border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0500">05:00</SelectItem>
                    <SelectItem value="0530">05:30</SelectItem>
                    <SelectItem value="0600">06:00</SelectItem>
                    <SelectItem value="0630">06:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Auto-translate Guest Messages</p>
                    <p className="text-sm text-muted-foreground">Automatically translate guest communications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Security Alert Escalation</p>
                    <p className="text-sm text-muted-foreground">Immediately notify owner of critical alerts</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Auto-apply Pricing Recommendations</p>
                    <p className="text-sm text-muted-foreground">Let Zuri automatically adjust room rates</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium">Alert Preferences</CardTitle>
              <CardDescription>Choose which alerts Zuri sends to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{notification.label}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Switch checked={notification.enabled} onCheckedChange={() => toggleNotification(notification.id)} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium">Connected Services</CardTitle>
              <CardDescription>Manage your system integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-cyan" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-green/20 text-green border-green/30">Connected</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</span>
                      <Button variant="ghost" size="sm" className="h-8">
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                        Sync
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
