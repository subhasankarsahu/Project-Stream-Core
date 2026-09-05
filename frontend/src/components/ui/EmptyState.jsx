import { SearchX, Video } from "lucide-react"

export function EmptyState({ title, description }) {
  const isSearch = title.toLowerCase().includes("result")
  const Icon = isSearch ? SearchX : Video
  return <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 text-center"><div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-surface text-muted"><Icon size={22} /></div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 max-w-sm text-sm text-muted">{description}</p></div>
}
