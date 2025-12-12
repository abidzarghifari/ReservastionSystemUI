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
import { motion } from 'framer-motion';
import { TiUserAddOutline } from "react-icons/ti";
import { mainContentVariants } from '@/app/components/ContentVariant';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import getDeviceDescription from '@/app/components/getDeviceDescription';
import api from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, {
	message: "Nama harus memiliki minimal 2 karakter.",
  }),
  email: z.email({
	message: "Format email tidak valid.",
  }),
  password: z.string().min(8, {
	message: "Password harus memiliki minimal 8 karakter.",
  }),
  password_confirmation: z.string(),
  device_name: z.string()
	.nonempty("Device name is required.")
	.min(2, "Device name must be at least 2 characters."),
})

.refine((data) => data.password === data.password_confirmation, {
  message: "Konfirmasi password tidak cocok!",
  path: ["password_confirmation"],
});

export default function AddAdminCard() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [open, setOpen] = useState(false)
	const router = useRouter(); 
	  
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  name: "",
		  email: "",
		  password: "password123",
		  password_confirmation: "password123",
		  device_name: getDeviceDescription(),
		},
	});
	
	  async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);
		const {...dataToSend } = values;
		try {
		  const response = await api.post('web/registeradmin', dataToSend);
	
		  const toastData = {
			title: "Pendaftaran Berhasil!",
			description: `Selamat datang, ${dataToSend.name}. Akun Anda telah dibuat.`
		  };
		  
		  setOpen(false);
		  router.refresh();
		  toast.success("Admin berhasil ditambahkan");
		} catch (error) {
		  
		  setOpen(false);
		  toast.error("Pendaftaran Gagal", {
			description: (error as Error).message || 'Gagal terhubung ke server.',
		  });
		} finally {
		  setIsSubmitting(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild onClick={(event) => event.stopPropagation()}>
				<button className="rounded-full hover:bg-rose-300/30 p-4"><TiUserAddOutline size={30}/></button>
			</DialogTrigger>
			
			<DialogContent 
					className="w-screen h-screen rounded-none top-0 left-0 translate-x-0 translate-y-0
					md:max-w-md md:h-auto md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
					"
					onClick={(event) => event.stopPropagation()}
				>
					<DialogHeader>
						<DialogTitle className='text-gray-200'>Add New Admin</DialogTitle>
					</DialogHeader>
					<motion.div
					  className="p-4"
					  variants={mainContentVariants}
					  initial="initial"
					  animate="animate"
					>	
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
									
									{/* Field Nama */}
									<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
										</FormItem>
									)}
									/>

									<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="email@contoh.com" {...field} />
										</FormControl>
										<FormMessage />
										</FormItem>
									)}
									/>

									<p>the default password is <span className='text-rose-400'>password123</span></p>

									<Button type="submit" className="w-full" disabled={isSubmitting}>
										{isSubmitting && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										{isSubmitting ? "Adding..." : "Add"}
									</Button>
							</form>
						</Form>
					</motion.div>
			</DialogContent>			
		</Dialog>
        
    );
}