import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../stores/authStore"

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const initials = user?.username?.slice(0, 2).toUpperCase() || "SC"
  return <div className="relative">
    <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-full p-1 hover:bg-surface" aria-expanded={open} aria-haspopup="menu">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-xs font-bold">{initials}</span><ChevronDown size={15} className="hidden text-muted sm:block" />
    </button>
    {open && <div className="absolute right-0 top-12 z-30 w-60 rounded-lg border border-line bg-surface p-2 shadow-2xl" role="menu">
      <div className="border-b border-line px-3 pb-3"><p className="truncate text-sm font-semibold">{user?.fullName || user?.username || "StreamCore user"}</p><p className="truncate text-xs text-muted">@{user?.username || "creator"}</p></div>
      <Link onClick={() => setOpen(false)} to="/studio" className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-line hover:text-white" role="menuitem"><UserRound size={16} /> Your channel</Link>
      <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-line hover:text-white" role="menuitem"><Settings size={16} /> Settings</button>
      <button onClick={logout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-line hover:text-white" role="menuitem"><LogOut size={16} /> Sign out</button>
    </div>}
  </div>
}
