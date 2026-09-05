import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { likesApi } from "../api/likes.api"
import { playlistsApi } from "../api/playlists.api"
import { tweetsApi } from "../api/tweets.api"

export const useUserPlaylists = (userId) => useQuery({ queryKey: ["playlists", userId], queryFn: () => playlistsApi.byUser(userId), enabled: Boolean(userId) })
export const usePlaylist = (playlistId) => useQuery({ queryKey: ["playlist", playlistId], queryFn: () => playlistsApi.get(playlistId), enabled: Boolean(playlistId) })
export const useUserTweets = (userId) => useQuery({ queryKey: ["tweets", userId], queryFn: () => tweetsApi.byUser(userId), enabled: Boolean(userId) })

export function useSocialMutation(key) {
  const queryClient = useQueryClient()
  return { queryClient, invalidate: () => { queryClient.invalidateQueries({ queryKey: [key] }); queryClient.invalidateQueries({ queryKey: ["playlists"] }); queryClient.invalidateQueries({ queryKey: ["playlist"] }); queryClient.invalidateQueries({ queryKey: ["tweets"] }); queryClient.invalidateQueries({ queryKey: ["liked-videos"] }) } }
}

export function useTweetLike() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (tweetId) => likesApi.toggleTweet(tweetId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["liked-tweets"] }) })
}

export function useCommentLike() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (commentId) => likesApi.toggleComment(commentId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }) })
}
