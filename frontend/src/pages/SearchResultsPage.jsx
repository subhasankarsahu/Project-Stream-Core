import { useSearchParams } from "react-router-dom"
import { useVideos } from "../hooks/useVideos"
import { BrowseToolbar } from "../components/ui/BrowseToolbar"
import { Pagination } from "../components/ui/Pagination"
import { VideoGrid } from "../components/ui/VideoGrid"

export function SearchResultsPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get("query")?.trim() || ""
  const page = Number(params.get("page") || 1)
  const sortValue = params.get("sort") || "createdAt:desc"
  const [sortBy, sortType] = sortValue.split(":")
  const { data, isLoading, isFetching, isError } = useVideos({ page, limit: 20, query, sortBy, sortType })
  const videos = data?.docs || []
  const updateParams = (next) => setParams({ query, page: String(next.page ?? 1), sort: next.sort ?? sortValue })
  return <section className="p-5 md:p-8"><div className="mb-7"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Search</p><h1 className="mt-2 text-2xl font-bold md:text-3xl">{query ? `Results for “${query}”` : "Search videos"}</h1></div><BrowseToolbar sortBy={sortBy} sortType={sortType} resultCount={data?.totalDocs} onSortChange={(sort) => updateParams({ sort })} /><VideoGrid videos={videos} isLoading={isLoading} isError={isError} query={query} /><Pagination page={data?.page || page} totalPages={data?.totalPages} isFetching={isFetching} onChange={(nextPage) => updateParams({ page: nextPage })} /></section>
}
