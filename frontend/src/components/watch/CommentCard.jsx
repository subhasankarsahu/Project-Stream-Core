import { Heart, MoreVertical, UserRound } from "lucide-react"

export function CommentCard({ comment, onLike }) {
  const owner = comment.owner || {}
  const isLiked = Boolean(comment.isLiked)
  const likesCount = comment.likesCount || 0

  return (
    <article className="flex gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-line text-xs font-bold">
        {owner.avatar ? (
          <img src={owner.avatar} alt="" className="h-full w-full object-cover" />
        ) : (
          <UserRound size={16} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">@{owner.username || "creator"}</span>
          <time className="text-xs text-muted" dateTime={comment.createdAt}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </time>
        </div>
        <p className="mt-1 text-sm leading-6 text-white">{comment.content}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted">
          <button
            onClick={() => onLike(comment._id)}
            className={`flex items-center gap-1 transition ${
              isLiked ? "text-red-400 font-semibold" : "hover:text-white"
            }`}
            aria-label="Like comment"
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            <span>{isLiked ? "Liked" : "Like"}</span>
            {likesCount > 0 && <span className="opacity-80">({likesCount})</span>}
          </button>
          <button className="hover:text-white">Reply</button>
        </div>
      </div>
      <button className="text-muted hover:text-white" aria-label="Comment options">
        <MoreVertical size={17} />
      </button>
    </article>
  )
}
