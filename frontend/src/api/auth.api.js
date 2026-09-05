import http, { unwrap } from "./http"

export const authApi = {
  login: async (payload) => {
    const data = unwrap(await http.post("/users/login", payload))
    return data.user ?? data
  },
  register: async (payload) => unwrap(await http.post("/users/register", payload)),
  logout: async () => unwrap(await http.post("/users/logout")),
  refreshToken: async () => unwrap(await http.post("/users/refresh-token")),
  currentUser: async () => unwrap(await http.get("/users/current-user")),
  updateAccount: async (payload) => unwrap(await http.patch("/users/update-account", payload)),
}
