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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
/**
 * $table->id();
            $table->string('name'); // Nama kamar (misal: "Kamar Deluxe")
            $table->foreignId('type_id')->constrained('room_types')->onDelete('cascade');
            $table->integer('number');
            $table->timestamps();
 */
export type Rooms = {
  id: string
  type_id: string
  name: string 
  number: number
}

export const columns: ColumnDef<Rooms>[] = [
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
	accessorKey: "type_id",
	header: "Type",
  },
  {
	accessorKey: "number",
	header: ({ column }) => {
	  return (
		<Button
		  variant="ghost"
		  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
		  Number
		  <ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	  )
	},
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