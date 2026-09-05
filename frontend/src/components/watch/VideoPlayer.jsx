import { Maximize, Play } from "lucide-react"
import { useRef, useState } from "react"

export function VideoPlayer({ video }) {
  const playerRef = useRef(null)
  const [paused, setPaused] = useState(true)
  const togglePlay = () => { if (!playerRef.current) return; if (playerRef.current.paused) playerRef.current.play(); else playerRef.current.pause() }
  const fullscreen = () => playerRef.current?.requestFullscreen?.()
  return <div className="group relative aspect-video overflow-hidden rounded-xl bg-black shadow-xl"><video ref={playerRef} className="h-full w-full" controls poster={video.thumbnail} preload="metadata" src={video.videoFile} onPlay={() => setPaused(false)} onPause={() => setPaused(true)}><track kind="captions" /></video>{paused && <button onClick={togglePlay} className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent-hover" aria-label="Play video"><Play size={25} fill="currentColor" /></button>}<div className="absolute bottom-3 right-3 opacity-0 transition group-hover:opacity-100"><button onClick={fullscreen} className="rounded-md bg-black/70 p-2 text-white hover:bg-black" aria-label="Enter fullscreen"><Maximize size={18} /></button></div></div>
}
