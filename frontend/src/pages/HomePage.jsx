import { useSearchParams } from "react-router-dom"
import { useVideos } from "../hooks/useVideos"
import { VideoCard } from "../components/ui/VideoCard"

const chips = ["All", "Music", "Gaming", "Live", "News", "Mixes"]
export function HomePage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query") || undefined
  const { data, isLoading, isError } = useVideos({ page: 1, limit: 24, query, sortBy: "createdAt", sortType: "desc" })
  const videos = data?.docs || data?.videos || (Array.isArray(data) ? data : [])
  return <section className="p-5 md:p-8"><div className="mb-7 flex gap-2 overflow-x-auto pb-1">{chips.map((chip, index) => <button key={chip} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-white text-ink" : "bg-surface text-white hover:bg-line"}`}>{chip}</button>)}</div>{isLoading && <div className="py-20 text-center text-muted">Loading your feed...</div>}{isError && <div className="rounded-lg border border-line p-8 text-center text-muted">The feed is unavailable right now.</div>}{!isLoading && !isError && <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{videos.map((video) => <VideoCard key={video._id} video={video} />)}</div>}</section>
}
