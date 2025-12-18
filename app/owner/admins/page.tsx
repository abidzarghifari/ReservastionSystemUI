import AddAdminCard from "../components/addAdmin";
import AttentionComponent from "@/app/components/attentioncomponent";
import { Suspense } from "react";
import AdminsTable from "./adminsTable";
import TableSkeleton from "@/app/components/tableSkeleton";

export default async function Page() {
  return (
	<div className="container max-w-6xl mx-auto pb-20">
	  <h1 className="py-5 text-2xl">Admins</h1>
	  
            <Suspense fallback={<TableSkeleton />}>
                 <AdminsTable/>
            </Suspense>
	  <div className="fixed bottom-5 right-5 z-50">
					<AttentionComponent>
						<div className='bg-card rounded-full'>
							<AddAdminCard></AddAdminCard>
						</div>
					</AttentionComponent>
		</div>
	</div>
  )
}