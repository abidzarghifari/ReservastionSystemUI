"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

/*
*This type is used to define the shape of our data.
*You can use a Zod schema here if you want.
* === column schemaaa ===
*/
export type Admins = {
  id: string
  name: string
  email: string
}


/**
* konstanta columns adalah sebuah array konfigurasi Array ini akan digunakan oleh Tanstack Table untuk merender data bertipe Admins 
*/
export const columns: ColumnDef<Admins>[] = [
  {
	id: "select",
	header: ({ table }) => (
	  <Checkbox
		checked={
		  table.getIsAllPageRowsSelected() ||
		  (table.getIsSomePageRowsSelected() && "indeterminate")
		}
		onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
		aria-label="Select all"
	  />
	),
	cell: ({ row }) => (
	  <Checkbox
		checked={row.getIsSelected()}
		onCheckedChange={(value) => row.toggleSelected(!!value)}
		aria-label="Select row"
	  />
	),
	enableSorting: false,
	enableHiding: false,
  },

  {
	accessorKey: "name",
	header: "Name",
  },

  {
	accessorKey: "email",
	header: ({ column }) => {
	  return (
		<Button
		  variant="ghost"
		  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
		  Email
		  <ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	  )
	},
  },
  {
	id: "actions",
	cell: ({ row }) => {
      const data = row.original
      const router = useRouter()

      // Fungsi yang menangani proses delete
      const handleDelete = async () => {
        // Tampilkan konfirmasi (praktik terbaik)
        if (!confirm(`Apakah Anda yakin ingin menghapus item ${data.id}?`)) {
          return
        }

        try {
		  const response = api.delete(`web/deleteadmin/${data.id}`);
          toast.success("Data berhasil dihapus.");

          //    Ini akan memicu Next.js untuk mengambil ulang data 
          //    (menjalankan ulang fungsi 'getData()' di server)
          router.refresh();
        } catch (error) {
          // 4. Tampilkan notifikasi jika gagal
          toast.error("Gagal menghapus data.", {
            description: (error as Error).message || "Terjadi kesalahan.",
          });
        }
      }

      // Render dropdown menu
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-500 cursor-pointer" // Diberi warna merah
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]