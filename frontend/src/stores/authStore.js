import { create } from "zustand"
import { authApi } from "../api/auth.api"

export const useAuthStore = create((set) => ({
  user: null,
  status: "idle",
  error: null,
  bootstrap: async () => {
    set({ status: "loading", error: null })
    try {
      const user = await authApi.currentUser()
      set({ user, status: "authenticated" })
    } catch {
      set({ user: null, status: "anonymous" })
    }
  },
  login: async (credentials) => {
    set({ status: "loading", error: null })
    try {
      const user = await authApi.login(credentials)
      set({ user, status: "authenticated" })
      return user
    } catch (error) {
      const message = error.response?.data?.message || "Unable to sign in."
      set({ status: "anonymous", error: message })
      throw error
    }
  },
  register: async (formData) => {
    set({ status: "loading", error: null })
    try {
      const user = await authApi.register(formData)
      set({ user, status: "authenticated" })
      return user
    } catch (error) {
      set({ status: "anonymous", error: error.response?.data?.message || "Unable to create account." })
      throw error
    }
  },
  logout: async () => {
    try { await authApi.logout() } finally { set({ user: null, status: "anonymous", error: null }) }
  },
}))
