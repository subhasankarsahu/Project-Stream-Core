import { Link } from "react-router-dom"

export function VideoCard({ video }) {
  const owner = typeof video.owner === "object" ? video.owner : null
  return <Link to={`/watch/${video._id}`} className="group block">
    <div className="aspect-video overflow-hidden rounded-lg bg-surface"><img src={video.thumbnail} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" /></div>
    <div className="mt-3 flex gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-line text-xs font-bold">{owner?.avatar ? <img src={owner.avatar} alt={`${owner.username || "Creator"} profile`} className="h-full w-full object-cover" /> : owner?.username?.[0]?.toUpperCase() || "SC"}</div><div className="min-w-0"><h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white group-hover:text-accent">{video.title}</h3><p className="mt-1 text-xs text-muted">{owner?.username || "StreamCore creator"}</p><p className="text-xs text-muted">{(video.views || 0).toLocaleString()} views · {new Date(video.createdAt).toLocaleDateString()}</p></div></div>
  </Link>
}
