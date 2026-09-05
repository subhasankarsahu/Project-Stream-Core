import { Link, Outlet } from "react-router-dom"
import { BrandMark } from "../ui/BrandMark"

export function AuthLayout() {
  return <main className="min-h-screen bg-ink px-5 py-8 text-white"><div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center"><Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-black"><BrandMark className="h-10 w-10" />StreamCore</Link><Outlet /></div></main>
}
