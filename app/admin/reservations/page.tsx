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

export default async function Page() {
  const data = await getData() 

  return (
  <div className="container mx-auto pb-20">
    <h1 className="py-5 text-2xl">Reservations</h1>
    <DataTable columns={columns} data={data} />
  </div>
  )
}