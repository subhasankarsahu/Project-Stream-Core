import { useAuthStore } from "../stores/authStore"
import { ProfileCard } from "../components/profile/ProfileCard"
import { SubscriberInfo } from "../components/profile/SubscriberInfo"
import { VideoTabs } from "../components/profile/VideoTabs"
import { Link } from "react-router-dom"
import { useChannel } from "../hooks/useProfileData"

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  if (!user) return null
  const { data: channel } = useChannel(user.username)
  const profile = channel || user
  return <section className="mx-auto max-w-5xl space-y-6 p-5 md:p-8"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your profile</p><h1 className="mt-2 text-3xl font-bold">Account overview</h1></div><ProfileCard user={profile} /><SubscriberInfo count={profile.subscribersCount || 0} subscribedCount={profile.channelsSubscribedToCount || 0} /><VideoTabs tabs={[{ label: "Profile", to: "/profile", end: true }, { label: "Watch history", to: "/history" }, { label: "Liked videos", to: "/liked" }]} /><p className="text-sm text-muted">Manage your channel presentation in <Link to="/studio" className="text-white hover:text-accent">Creator Studio</Link>.</p></section>
}
