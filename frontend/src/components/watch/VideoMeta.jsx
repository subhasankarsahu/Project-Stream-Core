import { BookmarkPlus, Check, Heart, Share2, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export function VideoMeta({
  video,
  isLiked,
  isSubscribed,
  onLike,
  onSubscribe,
  onSave,
  isLikePending,
  isSubscribePending,
  userId
}) {
  const owner = video.owner || {}
  const ownerName = owner.username || "creator"
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore clipboard error
    }
  }

  const handleLikeClick = () => {
    if (!userId) {
      navigate("/login")
      return
    }
    onLike()
  }

  const handleSubscribeClick = () => {
    if (!userId) {
      navigate("/login")
      return
    }
    onSubscribe()
  }

  const handleSaveClick = () => {
    if (!userId) {
      navigate("/login")
      return
    }
    onSave()
  }

  const subscriberText =
    owner.subscribersCount !== undefined
      ? `${owner.subscribersCount.toLocaleString()} subscriber${owner.subscribersCount === 1 ? "" : "s"}`
      : owner.fullname || "StreamCore creator"

  const likesCount = video.likesCount !== undefined ? video.likesCount : null

  return (
    <section className="border-b border-line pb-5">
      <h1 className="text-xl font-bold leading-tight md:text-2xl">{video.title}</h1>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <Link to={`/channel/${ownerName}`} className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-line text-sm font-bold">
            {owner.avatar ? (
              <img src={owner.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserRound size={18} />
            )}
          </span>
          <span>
            <span className="block font-semibold text-white">{ownerName}</span>
            <span className="block text-xs text-muted">{subscriberText}</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSubscribeClick}
            disabled={isSubscribePending}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              isSubscribed
                ? "bg-surface text-white hover:bg-line"
                : "bg-white text-ink hover:bg-gray-200"
            }`}
          >
            {isSubscribed && <Check className="mr-1 inline" size={15} />}
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
          <button
            onClick={handleLikeClick}
            disabled={isLikePending}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isLiked ? "bg-white text-ink" : "bg-surface text-white hover:bg-line"
            }`}
          >
            <Heart size={17} fill={isLiked ? "currentColor" : "none"} />
            <span>{isLiked ? "Liked" : "Like"}</span>
            {likesCount !== null && likesCount > 0 && (
              <span className="text-xs opacity-80">({likesCount.toLocaleString()})</span>
            )}
          </button>
          <button
            onClick={handleSaveClick}
            className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-white hover:bg-line transition"
          >
            <BookmarkPlus size={17} /> Save
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-white hover:bg-line transition relative"
            title="Copy video link"
          >
            <Share2 size={17} />
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted">
        <span>{(video.views || 0).toLocaleString()} views</span>
        <span>·</span>
        <time dateTime={video.createdAt}>
          {new Date(video.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
      <details className="mt-4 rounded-lg bg-surface p-4">
        <summary className="cursor-pointer text-sm font-semibold text-white">Description</summary>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted">{video.description}</p>
      </details>
    </section>
  )
}
