import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { useAuth } from "../providers/AuthProvider"

export function ProtectedRoute() {
  const location = useLocation()
  const { status } = useAuth()
  if (status === "bootstrapping" || status === "idle") return <div className="grid min-h-screen place-items-center text-muted">Loading StreamCore...</div>
  return status === "authenticated" ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
