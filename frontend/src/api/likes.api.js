import http, { unwrap } from "./http"
export const likesApi = { videos: async () => unwrap(await http.get("/likes/videos")), toggleVideo: async (videoId) => unwrap(await http.post(`/likes/video/${videoId}`)), toggleComment: async (commentId) => unwrap(await http.post(`/likes/comment/${commentId}`)), toggleTweet: async (tweetId) => unwrap(await http.post(`/likes/tweet/${tweetId}`)) }
