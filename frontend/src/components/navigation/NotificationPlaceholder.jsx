import { Bell } from "lucide-react"

export function NotificationPlaceholder() {
  return <button className="relative rounded-full p-2 text-muted hover:bg-surface hover:text-white" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" /></button>
}
