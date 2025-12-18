import { columns, RoomTypes } from "./columns"
import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';

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

export default async function RoomTypesTable() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
