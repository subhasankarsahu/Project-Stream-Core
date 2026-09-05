import { Users } from "lucide-react"

export function SubscriberInfo({ count = 0, subscribedCount = 0 }) {
  return <div className="grid gap-3 sm:grid-cols-2"><div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4"><div className="grid h-9 w-9 place-items-center rounded-full bg-line text-muted"><Users size={17} /></div><div><p className="text-xs text-muted">Subscribers</p><p className="text-lg font-bold">{count.toLocaleString()}</p></div></div><div className="rounded-lg border border-line bg-surface p-4"><p className="text-xs text-muted">Channels subscribed</p><p className="mt-1 text-lg font-bold">{subscribedCount.toLocaleString()}</p></div></div>
}
