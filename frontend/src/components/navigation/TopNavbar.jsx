import { Menu, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import { NotificationPlaceholder } from "./NotificationPlaceholder"
import { SearchBar } from "./SearchBar"
import { UserMenu } from "./UserMenu"

export function TopNavbar({ onOpenMobileMenu }) {
  return <header className="fixed inset-x-0 top-0 z-20 flex h-28 items-start gap-3 border-b border-line bg-ink px-4 py-3 md:h-16 md:items-center md:gap-4 md:py-0">
    <button onClick={onOpenMobileMenu} className="rounded-full p-2 text-muted hover:bg-surface hover:text-white" aria-label="Open navigation"><Menu size={21} /></button>
    <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-black tracking-tight sm:text-xl"><span className="grid h-7 w-7 place-items-center rounded bg-accent text-sm">S</span><span className="hidden xs:inline">StreamCore</span></Link>
    <div className="absolute inset-x-4 bottom-2 md:static md:mx-auto md:flex md:w-full md:max-w-xl"><SearchBar /></div>
    <div className="ml-auto flex items-center gap-1 sm:gap-2"><Link to="/studio" className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-surface sm:flex"><Upload size={16} /> Create</Link><NotificationPlaceholder /><UserMenu /></div>
  </header>
}
