import { X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { primaryNavigation } from "./navigation"
import { BrandMark } from "../ui/BrandMark"

export function MobileSidebarDrawer({ open, onClose }) {
  return <>{open && <button onClick={onClose} className="fixed inset-0 z-30 bg-black/60 lg:hidden" aria-label="Close navigation" />}{<aside className={`fixed bottom-0 left-0 top-0 z-40 w-72 border-r border-line bg-ink p-4 transition-transform duration-200 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`} aria-label="Mobile navigation">
    <div className="mb-8 flex items-center justify-between"><span className="flex items-center gap-2 text-lg font-black"><BrandMark className="h-8 w-8" />StreamCore</span><button onClick={onClose} className="rounded-full p-2 text-muted hover:bg-surface hover:text-white" aria-label="Close navigation"><X size={19} /></button></div>
    <nav className="space-y-1">{primaryNavigation.map(({ label, to, icon: Icon, end }) => <NavLink key={label} end={end} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium ${isActive ? "bg-surface text-white" : "text-muted hover:bg-surface hover:text-white"}`}><Icon size={19} />{label}</NavLink>)}</nav>
  </aside>}</>
}
