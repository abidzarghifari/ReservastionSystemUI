import { columns, Rooms } from "./columns"
import { DataTable } from "./data-table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BsPlusCircleDotted } from "react-icons/bs";
import api from "@/lib/api";
import { cookies } from 'next/headers';
import AttentionComponent from "@/app/components/attentioncomponent";
import AddRoomCard from "../components/addRoom";

async function getData(): Promise<Rooms[]> {
  const cookieStore = cookies();
  const headers = {
	Cookie: (await cookieStore).toString()
  };
  
  try {
    const response = await api.get('web/getallrooms',{
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
	  <h1 className="py-5 text-2xl">Rooms</h1>
	  <DataTable columns={columns} data={data} />
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