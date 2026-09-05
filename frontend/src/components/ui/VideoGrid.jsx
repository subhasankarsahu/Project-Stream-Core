import { VideoCard } from "./VideoCard"
import { VideoGridSkeleton } from "./VideoGridSkeleton"
import { EmptyState } from "./EmptyState"

export function VideoGrid({ videos, isLoading, isError, query }) {
  if (isLoading) return <VideoGridSkeleton />
  if (isError) return <EmptyState title="We could not load these videos" description="Check your connection and try again." />
  if (!videos.length) return <EmptyState title={query ? `No results for “${query}”` : "No videos yet"} description={query ? "Try a different search term." : "Published videos will appear here."} />
  return <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{videos.map((video) => <VideoCard key={video._id} video={video} />)}</div>
}
