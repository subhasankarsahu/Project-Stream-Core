import { useForm } from "react-hook-form"
import { useAuthStore } from "../../stores/authStore"
import { useCreateComment, useVideoComments } from "../../hooks/useWatchData"
import { CommentCard } from "./CommentCard"

export function CommentList({ videoId }) {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading, isError } = useVideoComments(videoId)
  const createComment = useCreateComment(videoId)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
  const comments = Array.isArray(data) ? data : data?.docs || []
  const submit = async ({ content }) => { await createComment.mutateAsync({ content }); reset() }
  return <section className="mt-7"><div className="flex items-center gap-2"><h2 className="text-lg font-bold">Comments</h2><span className="text-sm text-muted">{comments.length}</span></div><form onSubmit={handleSubmit(submit)} className="mt-5 flex gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold">{user?.username?.[0]?.toUpperCase() || "SC"}</div><div className="flex min-w-0 flex-1 gap-2"><input {...register("content", { required: true, maxLength: 500 })} placeholder="Add a comment..." className="min-w-0 flex-1 border-b border-line bg-transparent px-1 py-2 text-sm outline-none focus:border-white" /><button disabled={isSubmitting} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink disabled:opacity-50">{isSubmitting ? "Posting..." : "Comment"}</button></div></form>{createComment.isError && <p className="mt-3 text-sm text-accent">Unable to post comment. Please try again.</p>}{isLoading && <p className="mt-7 text-sm text-muted">Loading comments...</p>}{isError && <p className="mt-7 text-sm text-muted">Comments are unavailable right now.</p>}{!isLoading && !isError && <div className="mt-7 space-y-6">{comments.length ? comments.map((comment) => <CommentCard key={comment._id} comment={comment} onLike={() => {}} />) : <p className="text-sm text-muted">Be the first to comment.</p>}</div>}</section>
}
