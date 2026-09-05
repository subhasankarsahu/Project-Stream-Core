import { create } from "zustand"
import { authApi } from "../api/auth.api"
import { getAuthErrorMessage } from "../utils/authError"

export const useAuthStore = create((set) => ({
  user: null,
  status: "idle",
  error: null,
  bootstrap: async () => {
    set({ status: "bootstrapping", error: null })
    try {
      const user = await authApi.currentUser()
      set({ user, status: "authenticated" })
    } catch {
      set({ user: null, status: "anonymous" })
    }
  },
  login: async (credentials) => {
    set({ status: "authenticating", error: null })
    try {
      const user = await authApi.login(credentials)
      set({ user, status: "authenticated" })
      return user
    } catch (error) {
        const message = getAuthErrorMessage(error, "Unable to sign in.")
      set({ status: "anonymous", error: message })
      throw error
    }
  },
  register: async (formData) => {
    set({ status: "authenticating", error: null })
    try {
      const user = await authApi.register(formData)
      set({ user, status: "authenticated" })
      return user
    } catch (error) {
        set({ status: "anonymous", error: getAuthErrorMessage(error, "Unable to create account.") })
      throw error
    }
  },
  refresh: async () => {
    await authApi.refreshToken()
    const user = await authApi.currentUser()
    set({ user, status: "authenticated", error: null })
    return user
  },
  logout: async () => {
    try { await authApi.logout() } finally { set({ user: null, status: "anonymous", error: null }) }
  },
}))
