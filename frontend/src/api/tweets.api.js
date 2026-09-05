import http, { unwrap } from "./http"
export const tweetsApi = { create: async (payload) => unwrap(await http.post("/tweets/", payload)), byUser: async (userId) => unwrap(await http.get(`/tweets/user/${userId}`)), update: async (tweetId, payload) => unwrap(await http.patch(`/tweets/${tweetId}`, payload)), remove: async (tweetId) => unwrap(await http.delete(`/tweets/${tweetId}`)) }
