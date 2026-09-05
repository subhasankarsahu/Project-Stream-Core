import { useParams } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { useChannel, useChannelSubscription, useChannelVideos } from "../hooks/useProfileData"
import { ChannelHeader } from "../components/profile/ChannelHeader"
import { SubscriberInfo } from "../components/profile/SubscriberInfo"
import { VideoTabs } from "../components/profile/VideoTabs"
import { VideoGrid } from "../components/ui/VideoGrid"

export function ChannelPage() {
  const { username } = useParams()
  const currentUser = useAuthStore((state) => state.user)
  const { data: channel, isLoading, isError } = useChannel(username)
  const videosQuery = useChannelVideos(channel?._id)
  const subscription = useChannelSubscription(username, channel?._id)
  if (isLoading) return <ProfileSkeleton />
  if (isError || !channel) return <div className="p-8 text-muted">Channel not found.</div>
  const videos = videosQuery.data?.docs || []
  const isOwnProfile = currentUser?._id === channel._id
  return <section className="mx-auto max-w-7xl space-y-6 p-5 md:p-8"><ChannelHeader channel={channel} isOwnProfile={isOwnProfile} isSubscribed={channel.isSubscribed} isPending={subscription.isPending} onSubscribe={() => subscription.mutate()} /><SubscriberInfo count={channel.subscribersCount} subscribedCount={channel.channelsSubscribedToCount} /><VideoTabs tabs={[{ label: "Videos", to: `/channel/${username}`, end: true }]} /><VideoGrid videos={videos} isLoading={videosQuery.isLoading} isError={videosQuery.isError} /></section>
}
function ProfileSkeleton() { return <div className="space-y-6 p-5 md:p-8"><div className="h-64 animate-pulse rounded-xl bg-surface" /><div className="h-24 animate-pulse rounded-xl bg-surface" /></div> }
