import { Link, Outlet } from "react-router-dom"

export function AuthLayout() {
  return <main className="min-h-screen bg-ink px-5 py-8 text-white"><div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center"><Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded bg-accent text-sm">S</span>StreamCore</Link><Outlet /></div></main>
}
