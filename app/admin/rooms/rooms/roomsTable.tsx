import { columns, Rooms } from "./columns"
import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';

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

export default async function RoomsTable() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
