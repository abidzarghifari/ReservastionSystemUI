import { DataTable } from "./data-table"
import api from "@/lib/api";
import { cookies } from 'next/headers';
import { columns, Reservations } from "./columns";

async function getData(): Promise<Reservations[]> {
  const cookieStore = cookies();
  const headers = {
    Cookie: (await cookieStore).toString()
  };
  
  try {
  const response = await api.get('web/getallreservations',{
    headers: headers,
  });
  return response.data.data || response.data;
  } catch (error) {
  console.error('Failed to fetch data:', error);
  return [];
  }
}

export default async function ReservationsTable() {
  const data = await getData() 

  return (<DataTable columns={columns} data={data} />)
}
