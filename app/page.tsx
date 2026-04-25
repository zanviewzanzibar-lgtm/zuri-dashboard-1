"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { OverviewSection } from "@/components/dashboard/sections/overview"
import { StaffSection } from "@/components/dashboard/sections/staff"
import { GuestsSection } from "@/components/dashboard/sections/guests"
import { RestaurantsSection } from "@/components/dashboard/sections/restaurants"
import { SecuritySection } from "@/components/dashboard/sections/security"
import { HousekeepingSection } from "@/components/dashboard/sections/housekeeping"
import { MaintenanceSection } from "@/components/dashboard/sections/maintenance"
import { FinanceSection } from "@/components/dashboard/sections/finance"
import { StoreSection } from "@/components/dashboard/sections/store"
import { ZuriSection } from "@/components/dashboard/sections/zuri"
import { SettingsSection } from "@/components/dashboard/sections/settings"
import { AskZuriButton } from "@/components/dashboard/ask-zuri-button"

export type Section =
  | "overview"
  | "staff"
  | "guests"
  | "restaurants"
  | "security"
  | "housekeeping"
  | "maintenance"
  | "finance"
  | "store"
  | "zuri"
  | "settings"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "staff":
        return <StaffSection />
      case "guests":
        return <GuestsSection />
      case "restaurants":
        return <RestaurantsSection />
      case "security":
        return <SecuritySection />
      case "housekeeping":
        return <HousekeepingSection />
      case "maintenance":
        return <MaintenanceSection />
      case "finance":
        return <FinanceSection />
      case "store":
        return <StoreSection />
      case "zuri":
        return <ZuriSection />
      case "settings":
        return <SettingsSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section)
          setMobileNavOpen(false)
        }}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-500 ease-out ${
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[280px]"
        }`}
      >
        <Header
          activeSection={activeSection}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <div className="p-4 sm:p-6 lg:p-8">{renderSection()}</div>
      </main>

      {/* Floating Ask Zuri Button */}
      <AskZuriButton />
    </div>
  )
}
