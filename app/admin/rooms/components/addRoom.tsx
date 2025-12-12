'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from 'framer-motion';
import { TiHomeOutline } from "react-icons/ti"; 
import { mainContentVariants } from '@/app/components/ContentVariant';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import getDeviceDescription from '@/app/components/getDeviceDescription';
import api from "@/lib/api";

// --- TIPE DATA ---
// Interface untuk data tipe kamar yang diambil dari API
interface RoomTypeOption {
    id: number;
    name: string;
}

// --- SCHEMA VALIDASI BARU ---
const formSchema = z.object({
  name: z.string()
    .min(1, { message: "Nama kamar wajib diisi." })
    .max(255, { message: "Maksimal 255 karakter." }),

  // Validasi type_id (Integer, required)
  type_id: z.coerce.number({ invalid_type_error: "Tipe kamar wajib dipilih." })
    .int()
    .positive({ message: "Silakan pilih tipe kamar." }),

  // Validasi number (Integer, min 0)
  number: z.coerce.number()
    .int()
    .min(0, { message: "Nomor kamar minimal 0." }),

  device_name: z.string().optional(),
});

export default function AddRoomCard() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingTypes, setIsLoadingTypes] = useState(true);
    const [roomTypes, setRoomTypes] = useState<RoomTypeOption[]>([]); // State untuk menyimpan list tipe
    const [open, setOpen] = useState(false);
    const router = useRouter(); 
      
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            number: 0,
            type_id: undefined, // Biarkan undefined agar placeholder select muncul
            device_name: "Unknown Device", 
        },
    }); 

    // 1. FETCH DATA TIPE KAMAR
    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                // Ganti endpoint sesuai API Anda, misal: '/web/room-types-list'
                // Respons yang diharapkan: [{ id: 1, name: "Deluxe" }, { id: 2, name: "Suite" }]
                const response = await api.get('/web/getallroomtypes'); 
                setRoomTypes(response.data.data || response.data); // Sesuaikan struktur response JSON Anda
            } catch (error) {
                console.error("Gagal memuat tipe kamar", error);
                toast.error("Gagal memuat opsi tipe kamar");
            } finally {
                setIsLoadingTypes(false);
            }
        };

        if (open) {
            fetchRoomTypes(); // Fetch hanya saat modal dibuka
        }
    }, [open]);

    useEffect(() => {
        const device = getDeviceDescription();
        if (device) {
            form.setValue('device_name', device);
        }
    }, [form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        // Karena tidak ada file upload, kita bisa pakai JSON object biasa
        // atau FormData jika backend mewajibkannya. Di sini saya pakai JSON object agar lebih clean,
        // tapi jika controller Laravel Anda strict FormData, silakan ganti.
        
        const payload = {
            name: values.name,
            type_id: values.type_id,
            number: values.number,
            device_name: values.device_name
        };

        try {
          // Sesuaikan endpoint untuk create Room (bukan Create Type)
          await api.post('web/createroom', payload);
    
          setOpen(false);
          form.reset(); 
          router.refresh();
          toast.success("Data Kamar Berhasil Disimpan");
        } catch (error: any) {
          const msg = error?.response?.data?.message || "Gagal terhubung ke server.";
          const validationErrors = error?.response?.data?.errors;
          
          let errorDescription = msg;
          
          if (validationErrors) {
             // Jika error unique name dll
             errorDescription = Object.values(validationErrors).flat().join(', ');
          }

          toast.error("Penyimpanan Gagal", {
            description: errorDescription,
          });
        } finally {
          setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(event) => event.stopPropagation()}>
                <button className="rounded-full hover:bg-rose-300/30 p-4 transition-colors">
                    <TiHomeOutline size={30}/> 
                </button>
            </DialogTrigger>
            
            <DialogContent 
                    className="w-full max-w-md overflow-y-auto max-h-screen"
                    onClick={(event) => event.stopPropagation()}
                >
                    <DialogHeader>
                        <DialogTitle className='text-gray-800 dark:text-gray-200'>
                            Tambah Unit Kamar
                        </DialogTitle>
                    </DialogHeader>
                    
                    <motion.div
                      className="p-1"
                      variants={mainContentVariants}
                      initial="initial"
                      animate="animate"
                    >   
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        
                                {/* Field Tipe Kamar (Dropdown) */}
                                <FormField
                                    control={form.control}
                                    name="type_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipe Kamar</FormLabel>
                                            <Select 
                                                disabled={isLoadingTypes} 
                                                onValueChange={(val) => field.onChange(Number(val))} // Convert string value to number
                                                value={field.value ? String(field.value) : undefined}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={isLoadingTypes ? "Memuat..." : "Pilih Tipe Kamar"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {roomTypes.map((type) => (
                                                        <SelectItem key={type.id} value={String(type.id)}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Field Nama Kamar */}
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Nama Unit Kamar</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Mawar 01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                {/* Field Nomor Kamar */}
                                <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Nomor Kamar</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="number" 
                                        placeholder="101" 
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isSubmitting ? "Menyimpan..." : "Simpan Unit"}
                                </Button>
                            </form>
                        </Form>
                    </motion.div>
            </DialogContent>            
        </Dialog>
    );
}