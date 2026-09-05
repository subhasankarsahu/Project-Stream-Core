import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentsApi } from "../api/comments.api"
import { likesApi } from "../api/likes.api"
import { subscriptionsApi } from "../api/subscriptions.api"
import { useVideos } from "./useVideos"

export function useVideoComments(videoId) {
  return useQuery({ queryKey: ["comments", videoId], queryFn: () => commentsApi.list(videoId, { page: 1, limit: 50 }), enabled: Boolean(videoId) })
}

export function useCreateComment(videoId) {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (payload) => commentsApi.create(videoId, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments", videoId] }) })
}

export function useCommentLike() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (commentId) => likesApi.toggleComment(commentId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }) })
}

export function useVideoInteraction(video, userId) {
  const queryClient = useQueryClient()
  const likedQuery = useQuery({ queryKey: ["liked-videos"], queryFn: likesApi.videos })
  const subscriptionsQuery = useQuery({ queryKey: ["subscriptions", userId], queryFn: () => subscriptionsApi.userSubscriptions(userId), enabled: Boolean(userId && video?.owner?._id) })
  const likeMutation = useMutation({ mutationFn: () => likesApi.toggleVideo(video._id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["liked-videos"] }) })
  const subscribeMutation = useMutation({ mutationFn: () => subscriptionsApi.toggle(video.owner._id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptions", userId] }) })
  const likedVideos = likedQuery.data || []
  const subscribedChannels = subscriptionsQuery.data || []
  const isLiked = likedVideos.some((item) => String(item.video?._id || item.video) === String(video?._id))
  const isSubscribed = subscribedChannels.some((item) => String(item.channel?._id || item.channel) === String(video?.owner?._id))
  return { isLiked, isSubscribed, likeMutation, subscribeMutation }
}

export function useRelatedVideos(videoId) {
  return useVideos({ page: 1, limit: 8, sortBy: "views", sortType: "desc" })
}
