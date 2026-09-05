import http, { unwrap } from "./http"
export const dashboardApi = { stats: async () => unwrap(await http.get("/dashboard/stats")), videos: async () => unwrap(await http.get("/dashboard/videos")) }
