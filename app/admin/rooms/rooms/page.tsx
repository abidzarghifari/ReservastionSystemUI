import AttentionComponent from "@/app/components/attentioncomponent";
import AddRoomCard from "../components/addRoom";
import { Suspense } from 'react';
import RoomsTable from "./roomsTable";
import TableSkeleton from "../../../components/tableSkeleton";


export default function Page() {

  return (
	<div className="container max-w-6xl mx-auto pb-20">
	  <h1 className="py-5 text-2xl">Rooms</h1>

    	  <Suspense fallback={<TableSkeleton />}>
             <RoomsTable/>
    	  </Suspense>
	  <div className="fixed bottom-5 right-5 z-50">
					<AttentionComponent>
						<div className='bg-card rounded-full'>
							<AddRoomCard></AddRoomCard>
						</div>
					</AttentionComponent>
	  </div>
	</div>
  )
}
