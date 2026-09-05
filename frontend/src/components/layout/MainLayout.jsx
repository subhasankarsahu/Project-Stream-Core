import { useState } from "react"
import { Outlet } from "react-router-dom"
import { MobileSidebarDrawer } from "../navigation/MobileSidebarDrawer"
import { Sidebar } from "../navigation/Sidebar"
import { TopNavbar } from "../navigation/TopNavbar"
import { useAuthStore } from "../../stores/authStore"

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const logout = useAuthStore((state) => state.logout)
  return <div className="min-h-screen bg-ink text-white">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-ink">Skip to content</a><TopNavbar onOpenMobileMenu={() => setMobileOpen(true)} />
    <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} onNavigate={() => {}} onSignOut={logout} />
    <MobileSidebarDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    <main id="main-content" tabIndex="-1" className={`min-h-screen pt-28 transition-[padding] duration-200 md:pt-16 ${collapsed ? "lg:pl-20" : "lg:pl-60"}`}><Outlet /></main>
  </div>
}
