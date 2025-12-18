import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl shadow-md overflow-hidden">

      <div className="relative">
        <Skeleton className="h-44 w-full rounded-none" />
        <Skeleton className="absolute top-4 right-4 h-6 w-20 rounded-full" />
      </div>

      <div className="p-6 space-y-2">
        <Skeleton className="h-7 w-1/2 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-5">

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
        
        {/** 
        <div className="mt-6">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>*/}

      </div>
    </div>
  )
}
