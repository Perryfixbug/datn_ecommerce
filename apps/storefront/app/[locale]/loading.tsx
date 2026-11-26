import { Skeleton } from "@shared/ui/components/skeleton"

/** Giao diện chờ khi một segment đang tải. */
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 md:px-8 xl:px-24">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[294/446] rounded-lg" />
        ))}
      </div>
    </div>
  )
}
