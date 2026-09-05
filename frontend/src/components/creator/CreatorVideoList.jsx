import { Edit3, Eye, EyeOff, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { videoApi } from "../../api/video.api"

export function CreatorVideoList({ videos = [] }) {
  const queryClient = useQueryClient()
  const updateCache = () => { queryClient.invalidateQueries({ queryKey: ["videos"] }); queryClient.invalidateQueries({ queryKey: ["channel-videos"] }); queryClient.invalidateQueries({ queryKey: ["dashboard-videos"] }) }
  const publishMutation = useMutation({ mutationFn: (id) => videoApi.togglePublish(id), onSuccess: updateCache })
  const deleteMutation = useMutation({ mutationFn: (id) => videoApi.remove(id), onSuccess: updateCache })
  if (!videos.length) return <p className="rounded-lg border border-dashed border-line p-6 text-sm text-muted">Your uploaded videos will appear here.</p>
  return <div className="space-y-3">{videos.map((video) => <article key={video._id} className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-3 sm:flex-row sm:items-center"><img src={video.thumbnail} alt="" className="aspect-video w-full rounded-md object-cover sm:w-40" /><div className="min-w-0 flex-1"><h3 className="truncate font-semibold">{video.title}</h3><p className="mt-1 text-xs text-muted">{video.isPublished ? "Published" : "Unpublished"} · {(video.views || 0).toLocaleString()} views</p></div><div className="flex gap-2"><Link to={`/studio/videos/${video._id}/edit`} className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-muted hover:text-white"><Edit3 size={15} /> Edit</Link><button onClick={() => publishMutation.mutate(video._id)} disabled={publishMutation.isPending} className="rounded-md border border-line p-2 text-muted hover:text-white" aria-label={video.isPublished ? "Unpublish video" : "Publish video"}>{video.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}</button><button onClick={() => { if (window.confirm("Delete this video permanently?")) deleteMutation.mutate(video._id) }} disabled={deleteMutation.isPending} className="rounded-md border border-line p-2 text-muted hover:border-accent hover:text-accent" aria-label="Delete video"><Trash2 size={16} /></button></div></article>)}</div>
}
