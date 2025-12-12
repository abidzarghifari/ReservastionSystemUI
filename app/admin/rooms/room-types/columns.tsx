"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
/**
 * $table->id();
            $table->string('name');
            $table->bigInteger('price'); // Harga sewa kamar
            // Fasilitas (ditambahkan)
            $table->boolean('ac')->default(false);
            $table->boolean('tv')->default(false);
            $table->boolean('wifi')->default(false);
            $table->boolean('heater')->default(false);
            $table->boolean('free_breakfast')->default(false); // Fasilitas baru
            $table->boolean('free_laundry')->default(false); // Fasilitas baru
            $table->string('deskription');
            $table->string('media_path')->nullable();
            $table->timestamps();
 */

export type RoomTypes = {
  id: string
  name: string 
  price: number
  ac: boolean
  tv: boolean
  wifi: boolean
  heater: boolean
  free_breakfast: boolean
  free_loundry: boolean
  deskription: string
  media_path: string
}

export const columns: ColumnDef<RoomTypes>[] = [
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
    accessorKey: "media_path",
    header: "Image",
    cell: ({ row }) => {
      const path = row.getValue("media_path") as string;
      
      // 1. Handle jika path kosong (null/undefined)
      if (!path) {
        return <div className="text-gray-400 text-xs italic">No Image</div>;
      }

      // 2. Susun URL lengkap
      // Pastikan backend URL tidak diakhiri slash, atau sesuaikan logikanya
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const fullUrl = `${baseUrl}/storage/${path}`;

      return (
        <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
            {/* OPSI A: Pakai <img> biasa (Lebih mudah, tidak butuh config domain) */}
            <img 
              src={fullUrl} 
              alt="Room Image" 
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* OPSI B: Pakai Next <Image> (Perlu config domain di next.config.js) 
            <Image 
              src={fullUrl}
              alt="Room Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            */}
        </div>
      );
    },
  },

  {
	accessorKey: "name",
	header: "Name",
  },

  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  {
    accessorKey: "ac",
    header: "AC",
    cell: ({ row }) => {
      const status = row.getValue("ac");
      return (
        <div className="text-center text-xl">
          {status ? (
            <span className="text-green-700">✔</span> 
          ) : (
            <span className="text-red-700">✘</span> 
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "tv",
    header: "TV",
    cell: ({ row }) => {
      const status = row.getValue("tv");
      return (
        <div className="text-center text-xl">
          {status ? (
            <span className="text-green-700">✔</span> 
          ) : (
            <span className="text-red-700">✘</span> 
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "heater",
    header: "Heater",
    cell: ({ row }) => {
      const status = row.getValue("heater");
      return (
        <div className="text-center text-xl">
          {status ? (
            <span className="text-green-700">✔</span> 
          ) : (
            <span className="text-red-700">✘</span> 
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "free_breakfast",
    header: "Breakfast",
    cell: ({ row }) => {
      const status = row.getValue("free_breakfast");
      return (
        <div className="text-center text-xl">
          {status ? (
            <span className="text-green-700">✔</span> 
          ) : (
            <span className="text-red-700">✘</span> 
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "free_loundry",
    header: "Loundry",
    cell: ({ row }) => {
      const status = row.getValue("free_loundry");
      return (
        <div className="text-center text-xl">
          {status ? (
            <span className="text-green-700">✔</span> 
          ) : (
            <span className="text-red-700">✘</span> 
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "wifi",
    header: "WIFI",
    cell: ({ row }) => {
      const status = row.getValue("wifi");
      return (
        <div className="text-center text-xl">
          {status ? (
            <span className="text-green-700">✔</span> 
          ) : (
            <span className="text-red-700">✘</span> 
          )}
        </div>
      );
    },
  },

  {
	accessorKey: "deskription",
	header: "Description",
  },

  {
	id: "actions",
	cell: ({ row }) => {
	  const payment = row.original
 
	  return (
		<DropdownMenu>
		  <DropdownMenuTrigger asChild>
			<Button variant="ghost" className="h-8 w-8 p-0">
			  <span className="sr-only">Open menu</span>
			  <MoreHorizontal className="h-4 w-4" />
			</Button>
		  </DropdownMenuTrigger>
		  <DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>
			<DropdownMenuItem
			  onClick={() => navigator.clipboard.writeText(payment.id)}
			>
			  Copy payment ID
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>View customer</DropdownMenuItem>
			<DropdownMenuItem>View payment details</DropdownMenuItem>
		  </DropdownMenuContent>
		</DropdownMenu>
	  )
	},
  },
]