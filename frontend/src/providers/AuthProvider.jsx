import { createContext, useContext, useEffect } from "react"
import { useAuthStore } from "../stores/authStore"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const bootstrap = useAuthStore((state) => state.bootstrap)
  const status = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const error = useAuthStore((state) => state.error)
  const login = useAuthStore((state) => state.login)
  const register = useAuthStore((state) => state.register)
  const logout = useAuthStore((state) => state.logout)
  const refresh = useAuthStore((state) => state.refresh)

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  return <AuthContext.Provider value={{ user, status, error, login, register, logout, refresh }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}
