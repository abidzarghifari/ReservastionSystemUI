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


export default async function GuestsTable() {
  const data = await getData()
  return (<DataTable columns={columns} data={data} />)
}
