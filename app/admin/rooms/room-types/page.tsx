import AttentionComponent from "@/app/components/attentioncomponent";
import AddRoomTypeCard from "../components/addRoomType";
import { Suspense } from "react";
import TableSkeleton from "../../../components/tableSkeleton";
import RoomTypesTable from "./roomTypesTable";

export default async function Page() {
  
  return (
	<div className="container max-w-6xl mx-auto pb-20">
	  <h1 className="py-5 text-2xl">Room Type</h1>

	  <Suspense fallback={<TableSkeleton />}>
               <RoomTypesTable/>
      </Suspense>


	  <div className="fixed bottom-5 right-5 z-50">
					<AttentionComponent>
						<div className='bg-card rounded-full'>
							<AddRoomTypeCard></AddRoomTypeCard>
						</div>
					</AttentionComponent>
	  </div>
	</div>
  )
}