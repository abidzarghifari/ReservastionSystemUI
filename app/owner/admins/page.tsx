import { columns, Admins } from "./columns"
import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';
import AddAdminCard from "../components/addAdmin";
import AttentionComponent from "@/app/components/attentioncomponent";

async function getData(): Promise<Admins[]> {
  const cookieStore = cookies();
  const headers = {
      Cookie: cookieStore.toString()
  };
  
  try {
    const response = await api.get('web/getalladmins',{
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
	  <h1 className="py-5 text-2xl">Admins</h1>
	  <DataTable columns={columns} data={data} />
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