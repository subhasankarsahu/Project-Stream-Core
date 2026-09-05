import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export function SearchBar() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get("query") || "")
  const submit = (event) => {
    event.preventDefault()
    const nextQuery = query.trim()
    navigate(nextQuery ? `/search?query=${encodeURIComponent(nextQuery)}` : "/")
  }
  return <form onSubmit={submit} role="search" className="flex h-10 w-full max-w-xl items-center overflow-hidden rounded-full border border-line bg-surface focus-within:border-muted">
    <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-5 text-sm text-white outline-none placeholder:text-muted" placeholder="Search videos" aria-label="Search videos" />
    <button type="submit" className="grid h-full w-14 shrink-0 place-items-center border-l border-line text-muted hover:bg-line hover:text-white" aria-label="Submit search"><Search size={19} /></button>
  </form>
}
