import { columns, RoomTypes } from "./columns"
import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';
import AttentionComponent from "@/app/components/attentioncomponent";
import AddRoomTypeCard from "../components/addRoomType";

async function getData(): Promise<RoomTypes[]> {
  const cookieStore = cookies();
  const headers = {
	Cookie: (await cookieStore).toString()
  };
  
  try {
	const response = await api.get('web/getallroomtypes',{
	  headers: headers,
	});
	return response.data.data || response.data;
  } catch (error) {
	console.error('Failed to fetch data:', error);
	return [];
  }
}

export default async function Page() {
  const data = await getData() 

  return (
	<div className="container mx-auto pb-20">
	  <h1 className="py-5 text-2xl">Room Type</h1>
	  <DataTable columns={columns} data={data} />
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