import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { AppShell } from "./components/layout/AppShell"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { WatchPage } from "./pages/WatchPage"
import { StudioPage } from "./pages/StudioPage"

export function App() {
  return <Routes>
    <Route element={<ProtectedRoute />}>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:videoId" element={<WatchPage />} />
        <Route path="/studio" element={<StudioPage />} />
      </Route>
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
