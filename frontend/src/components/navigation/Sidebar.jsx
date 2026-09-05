import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"
import { primaryNavigation } from "./navigation"

export function Sidebar({ collapsed, onToggle, onNavigate, onSignOut }) {
  return <aside className={`fixed bottom-0 left-0 top-16 z-10 hidden border-r border-line bg-ink p-3 transition-[width] duration-200 lg:block ${collapsed ? "w-20" : "w-60"}`}>
    <nav className="space-y-1" aria-label="Primary navigation">{primaryNavigation.map(({ label, to, icon: Icon, end }) => <NavLink key={label} end={end} to={to} onClick={onNavigate} title={collapsed ? label : undefined} className={({ isActive }) => `flex items-center rounded-lg py-3 text-sm font-medium transition-colors ${collapsed ? "justify-center px-2" : "gap-4 px-4"} ${isActive ? "bg-surface text-white" : "text-muted hover:bg-surface hover:text-white"}`}><Icon size={19} /><span className={collapsed ? "sr-only" : ""}>{label}</span></NavLink>)}</nav>
    <button onClick={onToggle} className="mt-7 flex w-full items-center rounded-lg py-3 text-sm text-muted hover:bg-surface hover:text-white" title={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <ChevronRight className="mx-auto" size={19} /> : <><ChevronLeft size={19} className="ml-4" /><span className="ml-4">Collapse</span></>}</button>
    <button onClick={onSignOut} className={`mt-2 flex w-full items-center rounded-lg py-3 text-sm text-muted hover:bg-surface hover:text-white ${collapsed ? "justify-center px-2" : "gap-4 px-4"}`} title={collapsed ? "Sign out" : undefined}><LogOut size={19} /><span className={collapsed ? "sr-only" : ""}>Sign out</span></button>
  </aside>
}
