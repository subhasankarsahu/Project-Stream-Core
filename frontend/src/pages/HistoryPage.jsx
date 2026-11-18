import { useWatchHistory, useClearWatchHistory } from "../hooks/useProfileData"
import { VideoGrid } from "../components/ui/VideoGrid"
import { VideoTabs } from "../components/profile/VideoTabs"
import { Trash2 } from "lucide-react"

export function HistoryPage() {
  const { data, isLoading, isError } = useWatchHistory()
  const clearHistoryMutation = useClearWatchHistory()
  const videos = data || []

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire watch history?")) {
      clearHistoryMutation.mutate()
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 p-5 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your library</p>
          <h1 className="mt-2 text-3xl font-bold">Watch history</h1>
        </div>
        {videos.length > 0 && (
          <button
            onClick={handleClearHistory}
            disabled={clearHistoryMutation.isPending}
            className="flex items-center gap-2 rounded-lg bg-surface border border-white/10 px-4 py-2 text-sm font-medium text-muted hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-50"
            title="Clear all watch history"
          >
            <Trash2 className="h-4 w-4" />
            {clearHistoryMutation.isPending ? "Clearing..." : "Clear history"}
          </button>
        )}
      </div>
      <VideoTabs tabs={[{ label: "Profile", to: "/profile" }, { label: "Watch history", to: "/history", end: true }, { label: "Liked videos", to: "/liked" }]} />
      <VideoGrid videos={videos} isLoading={isLoading} isError={isError} />
    </section>
  )
}
