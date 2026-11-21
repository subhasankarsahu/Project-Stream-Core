import { useSearchParams } from "react-router-dom"
import { useVideos } from "../hooks/useVideos"
import { BrowseToolbar } from "../components/ui/BrowseToolbar"
import { Pagination } from "../components/ui/Pagination"
import { VideoGrid } from "../components/ui/VideoGrid"

const chips = ["All", "Music", "Gaming", "News", "Entertainment", "Education", "Tech"]

export function HomePage() {
  const [params, setParams] = useSearchParams()
  const page = Number(params.get("page") || 1)
  const sortValue = params.get("sort") || "createdAt:desc"
  const currentCategory = params.get("category") || "All"
  const [sortBy, sortType] = sortValue.split(":")

  const { data, isLoading, isFetching, isError } = useVideos({
    page,
    limit: 20,
    sortBy,
    sortType,
    category: currentCategory !== "All" ? currentCategory : undefined,
  })

  const videos = data?.docs || []

  const updateParams = (next) => {
    const newParams = {
      page: String(next.page ?? 1),
      sort: next.sort ?? sortValue,
    }
    const cat = next.category !== undefined ? next.category : currentCategory
    if (cat && cat !== "All") {
      newParams.category = cat
    }
    setParams(newParams)
  }

  return (
    <section className="p-5 md:p-8">
      <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
        {chips.map((chip) => {
          const isActive = currentCategory === chip || (!params.get("category") && chip === "All")
          return (
            <button
              key={chip}
              onClick={() => updateParams({ category: chip, page: 1 })}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive ? "bg-white text-ink" : "bg-surface text-white hover:bg-line"
              }`}
            >
              {chip}
            </button>
          )
        })}
      </div>
      <BrowseToolbar
        sortBy={sortBy}
        sortType={sortType}
        resultCount={data?.totalDocs}
        onSortChange={(sort) => updateParams({ sort })}
      />
      <VideoGrid videos={videos} isLoading={isLoading} isError={isError} />
      <Pagination
        page={data?.page || page}
        totalPages={data?.totalPages}
        isFetching={isFetching}
        onChange={(nextPage) => updateParams({ page: nextPage })}
      />
    </section>
  )
}
