import { Link } from "react-router-dom"
import { useRelatedVideos } from "../../hooks/useWatchData"

export function RelatedVideos({ videoId }) {
  const { data, isLoading } = useRelatedVideos(videoId)
  const videos = (data?.docs || []).filter((video) => video._id !== videoId).slice(0, 6)
  return <aside><h2 className="mb-4 text-lg font-bold">Related videos</h2>{isLoading && <div className="space-y-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="flex animate-pulse gap-3"><div className="aspect-video w-40 rounded-lg bg-surface" /><div className="flex-1 space-y-2"><div className="h-3 rounded bg-surface" /><div className="h-3 w-2/3 rounded bg-surface" /></div></div>)}</div>}{!isLoading && <div className="space-y-4">{videos.map((video) => <Link key={video._id} to={`/watch/${video._id}`} className="group flex gap-3"><img src={video.thumbnail} alt="" className="aspect-video w-40 shrink-0 rounded-lg bg-surface object-cover" /><div className="min-w-0"><h3 className="line-clamp-2 text-sm font-semibold leading-5 group-hover:text-accent">{video.title}</h3><p className="mt-1 text-xs text-muted">{video.owner?.username || "Creator"}</p><p className="text-xs text-muted">{(video.views || 0).toLocaleString()} views</p></div></Link>)}</div>}</aside>
}
