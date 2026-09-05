import { Link, NavLink, Outlet } from "react-router-dom"
import { Clapperboard, Compass, Home, Library, LogOut, Menu, Search, Upload, UserRound } from "lucide-react"
import { useAuthStore } from "../../stores/authStore"

const navItems = [["Home", "/", Home], ["Explore", "/?sortBy=createdAt", Compass], ["Library", "/?view=library", Library], ["Studio", "/studio", Clapperboard]]

export function AppShell() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  return <div className="min-h-screen bg-ink text-white">
    <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-ink px-4">
      <button className="rounded-full p-2 hover:bg-surface" aria-label="Open navigation"><Menu size={21} /></button>
      <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight"><span className="grid h-7 w-7 place-items-center rounded bg-accent text-sm">S</span>StreamCore</Link>
      <div className="mx-auto hidden w-full max-w-xl items-center overflow-hidden rounded-full border border-line bg-surface md:flex"><input className="w-full bg-transparent px-5 py-2 text-sm outline-none placeholder:text-muted" placeholder="Search videos" /><button className="border-l border-line px-5 py-2 text-muted hover:text-white" aria-label="Search"><Search size={19} /></button></div>
      <Link to="/studio" className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-surface sm:flex"><Upload size={16} /> Create</Link>
      <div className="grid h-9 w-9 place-items-center rounded-full bg-accent font-bold">{user?.username?.[0]?.toUpperCase() || <UserRound size={17} />}</div>
    </header>
    <aside className="fixed bottom-0 left-0 top-16 z-10 hidden w-60 border-r border-line bg-ink p-3 lg:block"><nav className="space-y-1">{navItems.map(([label, to, Icon]) => <NavLink key={label} to={to} className={({ isActive }) => `flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium ${isActive ? "bg-surface text-white" : "text-muted hover:bg-surface hover:text-white"}`}><Icon size={19} />{label}</NavLink>)}</nav><button onClick={logout} className="mt-8 flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm text-muted hover:bg-surface hover:text-white"><LogOut size={19} /> Sign out</button></aside>
    <main className="min-h-screen pt-16 lg:pl-60"><Outlet /></main>
  </div>
}
