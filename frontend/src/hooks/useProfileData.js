import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { likesApi } from "../api/likes.api"
import { subscriptionsApi } from "../api/subscriptions.api"
import { usersApi } from "../api/users.api"
import { videoApi } from "../api/video.api"

export const useChannel = (username) => useQuery({ queryKey: ["channel", username], queryFn: () => usersApi.channel(username), enabled: Boolean(username) })
export const useChannelVideos = (userId) => useQuery({ queryKey: ["channel-videos", userId], queryFn: () => videoApi.list({ userId, page: 1, limit: 24, sortBy: "createdAt", sortType: "desc" }), enabled: Boolean(userId) })
export const useWatchHistory = () => useQuery({ queryKey: ["watch-history"], queryFn: usersApi.history })
export const useLikedVideos = () => useQuery({ queryKey: ["liked-videos"], queryFn: likesApi.videos })

export function useChannelSubscription(username, channelId) {
  const queryClient = useQueryClient()
  const mutation = useMutation({ mutationFn: () => subscriptionsApi.toggle(channelId), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["channel", username] }); queryClient.invalidateQueries({ queryKey: ["subscriptions"] }) } })
  return mutation
}
