import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "../api/dashboard.api"
import { VideoUploadForm } from "../components/creator/VideoUploadForm"
import { CreatorVideoList } from "../components/creator/CreatorVideoList"

export function StudioPage() {
  const { data: videos = [], isLoading, isError } = useQuery({ queryKey: ["dashboard-videos"], queryFn: dashboardApi.videos })
  return <section className="space-y-10"><div><p className="text-sm font-semibold uppercase tracking-widest text-accent">Creator studio</p><h1 className="mt-2 text-3xl font-bold">Publish a video</h1><p className="mt-2 text-muted">Upload to Cloudinary and shape how your audience finds it.</p></div><div className="max-w-3xl rounded-xl border border-line bg-surface p-5 md:p-7"><VideoUploadForm /></div><div><div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-xl font-bold">Your videos</h2><p className="mt-1 text-sm text-muted">Edit details, change visibility, or remove an upload.</p></div></div>{isLoading && <p className="text-sm text-muted">Loading your videos...</p>}{isError && <p className="text-sm text-accent">Unable to load your videos.</p>}{!isLoading && !isError && <CreatorVideoList videos={videos} />}</div></section>
}
