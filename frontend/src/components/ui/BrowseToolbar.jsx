import { SlidersHorizontal } from "lucide-react"

export function BrowseToolbar({ sortBy, sortType, onSortChange, resultCount }) {
  return <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted">{resultCount ? `${resultCount.toLocaleString()} videos` : "Browse videos"}</p><label className="flex items-center gap-2 text-sm text-muted"><SlidersHorizontal size={16} /><span className="sr-only">Sort videos</span><select value={`${sortBy}:${sortType}`} onChange={(event) => onSortChange(event.target.value)} className="rounded-lg border border-line bg-surface px-3 py-2 text-white outline-none focus:border-muted"><option value="createdAt:desc">Newest</option><option value="createdAt:asc">Oldest</option><option value="views:desc">Most viewed</option><option value="views:asc">Least viewed</option><option value="title:asc">Title A-Z</option></select></label></div>
}
