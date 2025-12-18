import { Suspense } from "react"
import ReservationsTable from "./reservationsTable"
import TableSkeleton from "../../components/tableSkeleton"

export default async function Page() {

  return (
  <div className="container max-w-6xl mx-auto pb-20">
    <h1 className="py-5 text-2xl">Reservations</h1>
    <Suspense fallback={<TableSkeleton />}>
            <ReservationsTable/>
    </Suspense>

  </div>
  )
}