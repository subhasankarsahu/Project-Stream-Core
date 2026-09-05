import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { GuestRoute } from "./routes/GuestRoute"
import { AuthLayout, DashboardLayout, MainLayout } from "./components/layout"
import { HomePage } from "./pages/HomePage"
import { SearchResultsPage } from "./pages/SearchResultsPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { WatchPage } from "./pages/WatchPage"
import { StudioPage } from "./pages/StudioPage"
import { ChannelPage } from "./pages/ChannelPage"
import { ProfilePage } from "./pages/ProfilePage"
import { HistoryPage } from "./pages/HistoryPage"
import { LikedVideosPage } from "./pages/LikedVideosPage"
import { EditVideoPage } from "./pages/EditVideoPage"

export function App() {
  return <Routes>
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/watch/:videoId" element={<WatchPage />} />
        <Route path="/channel/:username" element={<ChannelPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/liked" element={<LikedVideosPage />} />
        <Route path="/studio" element={<DashboardLayout />}>
          <Route index element={<StudioPage />} />
          <Route path="videos/:videoId/edit" element={<EditVideoPage />} />
        </Route>
      </Route>
    </Route>
    <Route element={<GuestRoute />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
