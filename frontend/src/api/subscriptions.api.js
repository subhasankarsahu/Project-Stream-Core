import http, { unwrap } from "./http"
export const subscriptionsApi = { channelSubscribers: async (channelId) => unwrap(await http.get(`/subscriptions/c/${channelId}`)), toggle: async (channelId) => unwrap(await http.post(`/subscriptions/c/${channelId}`)), userSubscriptions: async (subscriberId) => unwrap(await http.get(`/subscriptions/u/${subscriberId}`)) }
