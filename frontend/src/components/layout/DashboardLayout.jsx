import { BarChart3, Clapperboard, LayoutDashboard, Settings } from "lucide-react"
import { NavLink, Outlet } from "react-router-dom"

const dashboardNavigation = [["Overview", "/studio", LayoutDashboard], ["Upload video", "/studio/upload", Clapperboard], ["Analytics", "/studio/analytics", BarChart3], ["Settings", "/studio/settings", Settings]]

export function DashboardLayout() {
  return <div className="min-h-screen bg-ink p-5 text-white md:p-8"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row"><aside className="w-full shrink-0 lg:w-52"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted">Creator studio</p><nav className="flex gap-1 overflow-x-auto lg:block lg:space-y-1">{dashboardNavigation.map(([label, to, Icon]) => <NavLink key={label} end={to === "/studio"} to={to} className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-surface text-white" : "text-muted hover:bg-surface hover:text-white"}`}><Icon size={17} />{label}</NavLink>)}</nav></aside><section className="min-w-0 flex-1"><Outlet /></section></div></div>
}
