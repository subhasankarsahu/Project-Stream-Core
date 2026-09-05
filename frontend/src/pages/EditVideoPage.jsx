import { Link, useNavigate, useParams } from "react-router-dom"
import { useVideo } from "../hooks/useVideos"
import { VideoUploadForm } from "../components/creator/VideoUploadForm"

export function EditVideoPage() {
  const { videoId } = useParams(); const navigate = useNavigate(); const { data: video, isLoading, isError } = useVideo(videoId)
  if (isLoading) return <div className="p-8 text-muted">Loading video...</div>
  if (isError || !video) return <div className="p-8 text-muted">Video not found.</div>
  return <section className="mx-auto max-w-3xl p-5 md:p-8"><Link to="/studio" className="text-sm text-muted hover:text-white">Back to Studio</Link><div className="mb-8 border-b border-line pb-5"><p className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">Creator studio</p><h1 className="mt-2 text-3xl font-bold">Edit video</h1><p className="mt-2 text-muted">Update the details your audience sees.</p></div><VideoUploadForm video={video} onComplete={() => navigate("/studio")} /></section>
}
