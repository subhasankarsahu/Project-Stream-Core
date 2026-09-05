import { useParams } from "react-router-dom"
import { useVideo } from "../hooks/useVideos"
import { useAuthStore } from "../stores/authStore"
import { useVideoInteraction } from "../hooks/useWatchData"
import { VideoPlayer } from "../components/watch/VideoPlayer"
import { VideoMeta } from "../components/watch/VideoMeta"
import { CommentList } from "../components/watch/CommentList"
import { RelatedVideos } from "../components/watch/RelatedVideos"
import { AddToPlaylistModal } from "../components/social/AddToPlaylistModal"
import { useState } from "react"

export function WatchPage() {
	const { videoId } = useParams()
	const user = useAuthStore((state) => state.user)
	const { data: video, isLoading, isError } = useVideo(videoId)
	if (isLoading) return <div className="mx-auto max-w-6xl p-5 md:p-8"><div className="aspect-video animate-pulse rounded-xl bg-surface" /><div className="mt-5 h-7 w-2/3 animate-pulse rounded bg-surface" /></div>
	if (isError || !video) return <div className="p-8 text-muted">Video not found or unavailable.</div>
	return <article className="mx-auto max-w-[1400px] p-5 md:p-8"><div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]"><div className="min-w-0"><VideoPlayer video={video} /><WatchDetails video={video} userId={user?._id} /><CommentList videoId={videoId} /></div><RelatedVideos videoId={videoId} /></div></article>
}

function WatchDetails({ video, userId }) {
	const [saveOpen, setSaveOpen] = useState(false)
	const { isLiked, isSubscribed, likeMutation, subscribeMutation } = useVideoInteraction(video, userId)
	return <div className="mt-5"><VideoMeta video={video} isLiked={isLiked} isSubscribed={isSubscribed} isLikePending={likeMutation.isPending} isSubscribePending={subscribeMutation.isPending} onLike={() => likeMutation.mutate()} onSubscribe={() => subscribeMutation.mutate()} onSave={() => setSaveOpen(true)} />{saveOpen && <AddToPlaylistModal videoId={video._id} userId={userId} onClose={() => setSaveOpen(false)} />}</div>
}
