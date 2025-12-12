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
  FormDescription
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea"; 
import { Checkbox } from "@/components/ui/checkbox";

// --- SCHEMA DIPERBAIKI ---
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Nama kamar minimal 2 karakter." })
    .max(255, { message: "Nama kamar maksimal 255 karakter." }),
  
  // Tambahkan .int() karena backend minta 'integer' (bukan float)
  price: z.coerce.number()
    .min(0, { message: "Harga tidak boleh negatif." }) // Backend min:0
    .int({ message: "Harga harus berupa angka bulat." }), 
    
  // Sesuai request typo backend 'deskription'
  deskription: z.string()
    .min(10, { message: "Deskripsi minimal 10 karakter." }),
  
  ac: z.boolean().default(false),
  tv: z.boolean().default(false),
  wifi: z.boolean().default(false),
  heater: z.boolean().default(false),
  free_breakfast: z.boolean().default(false),
  free_laundry: z.boolean().default(false),

  // Perbaikan Validasi Media
  // Backend bilang 'nullable', tapi di sini kita buat optional() agar zod tidak error jika kosong.
  // Namun jika ada file, kita cek ukuran dan tipe.
  media: z
    .instanceof(File, { message: "Foto wajib diupload (format file)." })
    // Jika backend 'nullable' tapi Anda ingin WAJIB upload saat create, biarkan code ini.
    // Jika boleh kosong saat create, ganti .instanceof(...) dengan .any().optional()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 2MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Format file harus .jpg, .jpeg, .png, atau .webp.")
    .optional() // Opsional di Zod agar tidak error saat inisialisasi undefined, tapi nanti bisa divalidasi manual atau dihapus jika wajib.
    .or(z.literal(undefined)), // Handle undefined case

  device_name: z.string().optional(),
});

export default function AddRoomTypeCard() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter(); 
      
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,              
            deskription: "",
            ac: false,             
            tv: false,             
            wifi: false,           
            heater: false,         
            free_breakfast: false, 
            free_laundry: false,   
            media: undefined, 
            device_name: "Unknown Device", 
        },
    }); 

    useEffect(() => {
        const device = getDeviceDescription();
        if (device) {
            form.setValue('device_name', device);
        }
    }, [form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', String(values.price)); 
        formData.append('deskription', values.deskription);
        
        // Mengirim 1 atau 0 string aman untuk Laravel Boolean validation
        formData.append('ac', values.ac ? '1' : '0');
        formData.append('tv', values.tv ? '1' : '0');
        formData.append('wifi', values.wifi ? '1' : '0');
        formData.append('heater', values.heater ? '1' : '0');
        formData.append('free_breakfast', values.free_breakfast ? '1' : '0');
        formData.append('free_laundry', values.free_laundry ? '1' : '0');
        
        if (values.device_name) {
            formData.append('device_name', values.device_name);
        }

        // --- PERBAIKAN UTAMA ---
        // Key harus 'media' sesuai validasi backend, BUKAN 'media_path'
        if (values.media) {
            formData.append('media', values.media);
        }

        try {
          const response = await api.post('web/createroomtype', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          });
    
          setOpen(false);
          form.reset(); 
          router.refresh();
          toast.success("Data Kamar Berhasil Disimpan");
        } catch (error: any) {
          const msg = error?.response?.data?.message || error.message || "Gagal terhubung ke server.";
          // Menampilkan error validasi spesifik dari Laravel jika ada
          const validationErrors = error?.response?.data?.errors;
          const errorDescription = validationErrors 
            ? Object.values(validationErrors).flat().join(', ')
            : msg;

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
                    className="w-screen h-screen rounded-none top-0 left-0 translate-x-0 translate-y-0
                    md:max-w-md md:h-auto md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 overflow-y-auto max-h-screen"
                    onClick={(event) => event.stopPropagation()}
                >
                    <DialogHeader>
                        <DialogTitle className='text-gray-800 dark:text-gray-200'>
                            Tambah Tipe Kamar
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
        
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Nama Kamar / Tipe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Deluxe Ocean View" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Harga Sewa (per malam)</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="number" 
                                        placeholder="0" 
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                {/* Typo 'deskription' dipertahankan sesuai request */}
                                <FormField
                                control={form.control}
                                name="deskription"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                        placeholder="Jelaskan detail kamar..." 
                                        className="resize-none" 
                                        {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <div className="space-y-3">
                                <FormLabel>Fasilitas Tersedia</FormLabel>
                                <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
                                    {[
                                        { name: "ac", label: "AC" },
                                        { name: "tv", label: "TV" },
                                        { name: "wifi", label: "WiFi" },
                                        { name: "heater", label: "Heater" },
                                        { name: "free_breakfast", label: "Sarapan Gratis" },
                                        { name: "free_laundry", label: "Laundry Gratis" },
                                    ].map((item) => (
                                        <FormField
                                            key={item.name}
                                            control={form.control}
                                            name={item.name as any}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox 
                                                    checked={field.value} 
                                                    onCheckedChange={field.onChange} 
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                </div>

                                <FormField
                                control={form.control}
                                name="media"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                    <FormLabel>Foto Kamar</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...fieldProps}
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files && event.target.files[0];
                                            onChange(file); 
                                        }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Format JPG/PNG. Maks 2MB. (Opsional)
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isSubmitting ? "Menyimpan..." : "Simpan Data Kamar"}
                                </Button>
                            </form>
                        </Form>
                    </motion.div>
            </DialogContent>            
        </Dialog>
    );
}