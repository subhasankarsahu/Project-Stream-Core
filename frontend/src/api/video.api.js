import http, { unwrap } from "./http"

export const videoApi = {
  list: async (params = {}) => unwrap(await http.get("/videos/", { params })),
  getById: async (videoId) => unwrap(await http.get(`/videos/${videoId}`)),
  create: async (formData) => unwrap(await http.post("/videos/", formData, { headers: { "Content-Type": "multipart/form-data" } })),
  update: async (videoId, formData) => unwrap(await http.patch(`/videos/${videoId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })),
  remove: async (videoId) => unwrap(await http.delete(`/videos/${videoId}`)),
  togglePublish: async (videoId) => unwrap(await http.patch(`/videos/toggle/publish/${videoId}`)),
}
