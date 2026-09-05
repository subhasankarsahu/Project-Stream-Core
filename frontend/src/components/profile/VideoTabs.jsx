import { NavLink } from "react-router-dom"

export function VideoTabs({ tabs }) {
  return <nav className="flex gap-6 overflow-x-auto border-b border-line" aria-label="Profile sections">{tabs.map(({ label, to, end }) => <NavLink key={label} end={end} to={to} className={({ isActive }) => `border-b-2 px-1 pb-3 text-sm font-semibold whitespace-nowrap ${isActive ? "border-white text-white" : "border-transparent text-muted hover:text-white"}`}>{label}</NavLink>)}</nav>
}
