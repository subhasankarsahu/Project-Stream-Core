import http, { unwrap } from "./http"

export const authApi = {
  login: async (payload) => unwrap(await http.post("/users/login", payload)),
  register: async (payload) => unwrap(await http.post("/users/register", payload)),
  logout: async () => unwrap(await http.post("/users/logout")),
  currentUser: async () => unwrap(await http.get("/users/current-user")),
  updateAccount: async (payload) => unwrap(await http.patch("/users/update-account", payload)),
}
