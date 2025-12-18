import { columns, Admins } from "./columns"
import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';

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

export default async function AdminsTable() {
  const data = await getData() 

  return (<DataTable columns={columns} data={data} />)
}