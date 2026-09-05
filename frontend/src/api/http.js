import axios from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

let refreshing = false
let queuedRequests = []

const flushQueue = (error) => {
  queuedRequests.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()))
  queuedRequests = []
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status !== 401 || originalRequest?._retry || originalRequest?.url?.includes("refresh-token")) {
      return Promise.reject(error)
    }
    if (refreshing) {
      return new Promise((resolve, reject) => queuedRequests.push({ resolve, reject }))
        .then(() => http(originalRequest))
    }
    originalRequest._retry = true
    refreshing = true
    try {
      await http.post("/users/refresh-token")
      flushQueue()
      return http(originalRequest)
    } catch (refreshError) {
      flushQueue(refreshError)
      return Promise.reject(refreshError)
    } finally {
      refreshing = false
    }
  },
)

export const unwrap = (response) => response.data?.data ?? response.data
export default http
