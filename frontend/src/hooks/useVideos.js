import { useQuery } from "@tanstack/react-query"
import { videoApi } from "../api/video.api"

export const useVideos = (params) => useQuery({
  queryKey: ["videos", params],
  queryFn: () => videoApi.list(params),
})

export const useVideo = (videoId) => useQuery({
  queryKey: ["videos", videoId],
  queryFn: () => videoApi.getById(videoId),
  enabled: Boolean(videoId),
})
