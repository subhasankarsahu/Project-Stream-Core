function SkeletonCard() {
  return <div className="animate-pulse"><div className="aspect-video rounded-lg bg-surface" /><div className="mt-3 flex gap-3"><div className="h-9 w-9 shrink-0 rounded-full bg-surface" /><div className="flex-1 space-y-2"><div className="h-4 w-11/12 rounded bg-surface" /><div className="h-3 w-2/5 rounded bg-surface" /><div className="h-3 w-3/5 rounded bg-surface" /></div></div></div>
}
export function VideoGridSkeleton({ count = 12 }) { return <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{Array.from({ length: count }, (_, index) => <SkeletonCard key={index} />)}</div> }
