import { useIsFetching, useIsMutating } from "@tanstack/react-query"

export function GlobalLoader() {
  const fetching = useIsFetching()
  const mutating = useIsMutating()
  const active = fetching + mutating > 0
  return <div aria-hidden="true" className={`fixed inset-x-0 top-0 z-[100] h-0.5 bg-accent transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}><span className={`block h-full bg-white transition-transform duration-700 ${active ? "translate-x-0" : "-translate-x-full"}`} /></div>
}
