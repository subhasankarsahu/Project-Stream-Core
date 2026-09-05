import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"

export function GuestRoute() {
  const location = useLocation()
  const { status } = useAuth()
  if (status === "idle" || status === "bootstrapping") return <div className="grid min-h-screen place-items-center bg-ink text-muted">Checking your session...</div>
  return status === "authenticated" ? <Navigate to={location.state?.from?.pathname || "/"} replace /> : <Outlet />
}
