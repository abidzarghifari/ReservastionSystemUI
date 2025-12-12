
import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';
import { columns, Guests } from "./columns";

async function getData(): Promise<Guests[]> {
  const cookieStore = cookies();
  const headers = {
	  Cookie: (await cookieStore).toString()
  };
  
  try {
	const response = await api.get('web/getallguests',{
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
	  <h1 className="py-5 text-2xl">Guests</h1>
	  <DataTable columns={columns} data={data} />
	</div>
  )
}