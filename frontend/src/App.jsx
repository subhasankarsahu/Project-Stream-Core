import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { AuthLayout, DashboardLayout, MainLayout } from "./components/layout"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { WatchPage } from "./pages/WatchPage"
import { StudioPage } from "./pages/StudioPage"

export function App() {
  return <Routes>
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:videoId" element={<WatchPage />} />
        <Route path="/studio" element={<DashboardLayout />}>
          <Route index element={<StudioPage />} />
        </Route>
      </Route>
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
