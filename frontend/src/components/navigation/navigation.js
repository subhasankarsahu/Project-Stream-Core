import { Clapperboard, Compass, Home, Library, ListVideo, MessageSquare } from "lucide-react"

export const primaryNavigation = [
  { label: "Home", to: "/", icon: Home, end: true },
  { label: "Explore", to: "/?sortBy=createdAt", icon: Compass },
  { label: "Library", to: "/?view=library", icon: Library },
  { label: "Studio", to: "/studio", icon: Clapperboard },
  { label: "Playlists", to: "/playlists", icon: ListVideo },
  { label: "Tweets", to: "/tweets", icon: MessageSquare },
]
