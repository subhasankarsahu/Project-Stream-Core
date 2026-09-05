import { Component } from "react"

export class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) { console.error("StreamCore application error", error, info) }
  render() {
    if (!this.state.hasError) return this.props.children
    return <main className="grid min-h-screen place-items-center bg-ink px-5 text-center text-white"><div className="max-w-md"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Something went wrong</p><h1 className="mt-3 text-3xl font-bold">StreamCore needs a refresh</h1><p className="mt-3 text-muted">The page hit an unexpected error. Your account and uploads are safe.</p><button onClick={() => window.location.reload()} className="mt-6 rounded-lg bg-accent px-5 py-3 font-bold hover:bg-accent-hover">Reload application</button></div></main>
  }
}
