import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { queryClient } from "./app/queryClient"
import { App } from "./App"
import { AuthProvider } from "./providers/AuthProvider"
import { ErrorBoundary } from "./components/app/ErrorBoundary"
import { GlobalLoader } from "./components/app/GlobalLoader"
import { ToastProvider } from "./components/app/ToastProvider"
import "./styles/index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode><ErrorBoundary><QueryClientProvider client={queryClient}><ToastProvider><BrowserRouter><AuthProvider><GlobalLoader /><App /></AuthProvider></BrowserRouter></ToastProvider></QueryClientProvider></ErrorBoundary></StrictMode>,
)
