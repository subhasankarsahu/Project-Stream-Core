import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { queryClient } from "./app/queryClient"
import { useAuthStore } from "./stores/authStore"
import { App } from "./App"
import "./styles/index.css"

function Bootstrap() {
  const bootstrap = useAuthStore((state) => state.bootstrap)
  useEffect(() => { bootstrap() }, [bootstrap])
  return <App />
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter><Bootstrap /></BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
