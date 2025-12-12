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
 

export type Guests = {
  id: string
  name: string
  email: string
}
 
export const columns: ColumnDef<Guests>[] = [
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
]