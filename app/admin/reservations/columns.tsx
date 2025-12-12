"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowUp,ArrowDown,ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExpandableText } from "@/app/components/expandableText"

/**
  'guest_id' - 
  'room_id' -
  'checkin_date' -
  'checkout_date' -
  'special_request' - 
  'total_payment' -
  'invoice_code' -
  'status', ['PENDING', 'PAID', 'EXPIRED', 'CANCELED'])->default('PENDING')- 
  'payment_channel' -

  'expired_at'
 */

export type Reservations = {
  id: number 
  guest_id: number 
  room_id: number

  status: string 
  total_payment: number 
  payment_channel: string
  invoice_code: string

  checkin_date: string 
  checkout_date: string
  special_request : string
  
  expired_at: string
}

const PaymentMethods = {
  1: "Cash",
  2: "BRI",
  3: "BCA",
  4: "Mandiri",
};

export const columns: ColumnDef<Reservations>[] = [
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
    accessorKey: "guest_id",
    header: "Guest",
  },

  {
    accessorKey: "room_id",
    header: "Room",
  },

  {
    accessorKey: "status",
    header: "Status Pembayaran",
  },

  {
    accessorKey: "total_payment",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_payment"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0 ////menghilangkan desimal
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  {
    accessorKey: "payment_channel",
    header: "Channel Pembayaran",
  },

  {
    accessorKey: "invoice_code",
    header: "Invoice Code",
  },

  {
    accessorKey: "checkin_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check-In
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
    
    cell: ({ row }) => {
      const dateString = row.getValue("checkin_date");
      
      if (dateString) {
        const date = new Date(dateString);
        const formatted = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date);

        return <div className="font-medium">{formatted}</div>;
      }
      return <div>-</div>;
    },
  },

  {
    accessorKey: "checkout_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check-Out
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
    
    cell: ({ row }) => {
      const dateString = row.getValue("checkout_date");
      
      if (dateString) {
        const date = new Date(dateString);
        const formatted = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date);

        return <div className="font-medium">{formatted}</div>;
      }
      return <div>-</div>;
    },
  },

  {
      accessorKey: "special_request",
      header: "Permintaan Khusus",
      cell: ({ row }) => {
          const value = row.getValue("special_request") as string;
          
          // Gunakan komponen terpisah, atur limit karakter sesuai kebutuhan (misal 40)
          return (
              <div className="max-w-80">
                <ExpandableText text={value} limit={40} />
              </div>
          );
      },
  },

  {
    accessorKey: "expired_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Exp-date
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
    
    cell: ({ row }) => {
      const dateString = row.getValue("expired_at");
      
      if (dateString) {
        const date = new Date(dateString);
        const formatted = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date);

        return <div className="font-medium">{formatted}</div>;
      }
      return <div>-</div>;
    },
  },

/*
  {
    accessorKey: "payment_methode",
    header: "Methode",
    cell: ({ row }) => {
      const code = row.getValue("payment_methode");
      // Mencari deskripsi metode berdasarkan kode
      const description = PaymentMethods[code] || "Tidak Diketahui"; 
      return (
        <div className="font-medium">
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const status = row.getValue("payment_status");
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
    accessorKey: "reservation_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Res-Date
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
    
    cell: ({ row }) => {
      const dateString = row.getValue("reservation_date");
      
      if (dateString) {
        const date = new Date(dateString);
        const formatted = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date);

        return <div className="font-medium">{formatted}</div>;
      }
      return <div>-</div>;
    },
  },
*/

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