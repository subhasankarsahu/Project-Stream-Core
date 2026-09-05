import { useWatchHistory } from "../hooks/useProfileData"
import { VideoGrid } from "../components/ui/VideoGrid"
import { VideoTabs } from "../components/profile/VideoTabs"
export function HistoryPage() { const { data, isLoading, isError } = useWatchHistory(); const videos = data || []; return <section className="mx-auto max-w-7xl space-y-6 p-5 md:p-8"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your library</p><h1 className="mt-2 text-3xl font-bold">Watch history</h1></div><VideoTabs tabs={[{ label: "Profile", to: "/profile" }, { label: "Watch history", to: "/history", end: true }, { label: "Liked videos", to: "/liked" }]} /><VideoGrid videos={videos} isLoading={isLoading} isError={isError} /></section> }
