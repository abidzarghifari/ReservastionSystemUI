import { Skeleton } from "@/components/ui/skeleton"


export default function TableSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Header Tabel Palsu */}
      <div className="flex items-center justify-between py-4">
         <Skeleton className="h-10 w-[250px] rounded" />
         <Skeleton className="h-10 w-[100px] rounded" />
      </div>

      {/* Baris Tabel Palsu (Looping 5 baris) */}
      <div className="border rounded-md">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border-b last:border-0">
             <Skeleton className="h-4 w-[50px] rounded" />
             <Skeleton className="h-4 w-[200px] rounded" />
             <Skeleton className="h-4 w-[150px] rounded" />
             <Skeleton className="h-4 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
