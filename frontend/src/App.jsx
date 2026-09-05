import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { GuestRoute } from "./routes/GuestRoute"
import { AuthLayout, DashboardLayout, MainLayout } from "./components/layout"
import { RouteFallback } from "./components/app/RouteFallback"

const page = (loader, name) => lazy(() => loader().then((module) => ({ default: module[name] })))
const HomePage = page(() => import("./pages/HomePage"), "HomePage")
const SearchResultsPage = page(() => import("./pages/SearchResultsPage"), "SearchResultsPage")
const LoginPage = page(() => import("./pages/LoginPage"), "LoginPage")
const RegisterPage = page(() => import("./pages/RegisterPage"), "RegisterPage")
const WatchPage = page(() => import("./pages/WatchPage"), "WatchPage")
const DashboardOverview = page(() => import("./pages/DashboardOverview"), "DashboardOverview")
const UploadVideoPage = page(() => import("./pages/UploadVideoPage"), "UploadVideoPage")
const ChannelPage = page(() => import("./pages/ChannelPage"), "ChannelPage")
const ProfilePage = page(() => import("./pages/ProfilePage"), "ProfilePage")
const HistoryPage = page(() => import("./pages/HistoryPage"), "HistoryPage")
const LikedVideosPage = page(() => import("./pages/LikedVideosPage"), "LikedVideosPage")
const EditVideoPage = page(() => import("./pages/EditVideoPage"), "EditVideoPage")
const PlaylistsPage = page(() => import("./pages/PlaylistsPage"), "PlaylistsPage")
const PlaylistDetailPage = page(() => import("./pages/PlaylistDetailPage"), "PlaylistDetailPage")
const TweetFeedPage = page(() => import("./pages/TweetFeedPage"), "TweetFeedPage")

export function App() {
  return <Suspense fallback={<RouteFallback />}><Routes>
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/watch/:videoId" element={<WatchPage />} />
        <Route path="/channel/:username" element={<ChannelPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/liked" element={<LikedVideosPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
        <Route path="/tweets" element={<TweetFeedPage />} />
        <Route path="/studio" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="upload" element={<UploadVideoPage />} />
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
  </Routes></Suspense>
}
