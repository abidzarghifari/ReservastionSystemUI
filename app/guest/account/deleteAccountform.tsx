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

export default function DeleteAccountForm() {

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const [open, setOpen] = useState(false) 
	  
	const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				password: "",
				password_confirmation: "",
				device_name: getDeviceDescription(),
			},
	})
	
	async function onSubmit(values: z.infer<typeof formSchema>) {  
	setIsSubmitting(true);
		const {...dataToSend } = values;
		try {
		  const response = await api.post('web/profiledelete', dataToSend);		  
		  setOpen(false); 
		  const toastData = {
				title: "account berhasil dihapus",
				description: `account berhasil dihapus`
		  };

		  try {
				localStorage.setItem('toastOnLoad', JSON.stringify(toastData));
		  } catch (e) {
				console.warn("Gagal menyimpan toast ke localStorage:", e);
		  }  
			
		  form.reset();
			
		  router.push('/');
		} catch (error) {
		  setOpen(false);
		  toast.error("Gagal menghapus akun", {
			description: (error as Error).message || 'Gagal terhubung ke server.',
		  });
		} finally {
		  setIsSubmitting(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild onClick={(event) => event.stopPropagation()}>
				<button className="rounded-md bg-red-700 hover:bg-red-800 px-4 py-2 text-white">Delete</button>
			</DialogTrigger>
			
			<DialogContent 
					className="w-screen h-screen rounded-none top-0 left-0 translate-x-0 translate-y-0
					md:max-w-md md:h-auto md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
					"
					onClick={(event) => event.stopPropagation()}
				>
					<DialogHeader>
						<DialogTitle className='text-gray-200'>Are you Sure to delete your Account?</DialogTitle>
					</DialogHeader>
					<motion.div
					  className="p-4"
					  variants={mainContentVariants}
					  initial="initial"
					  animate="animate"
					>	
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
									
								<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Minimal 8 karakter"
											{...field}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword((prev) => !prev)}
											aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
										>
											{showPassword ? (
											<EyeOff className="h-4 w-4" />
											) : (
											<Eye className="h-4 w-4" />
											)}
										</Button>
										</div>
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
								/>


								<FormField
								control={form.control}
								name="password_confirmation"
								render={({ field }) => (
									<FormItem>
									<FormLabel>Konfirmasi Password</FormLabel>
									<FormControl>
										<div className="relative">
										<Input
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Ulangi password Anda"
											{...field}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowConfirmPassword((prev) => !prev)}
											aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
										>
											{showConfirmPassword ? (
											<EyeOff className="h-4 w-4" />
											) : (
											<Eye className="h-4 w-4" />
											)}
										</Button>
										</div>
									</FormControl>
									{/* Pesan Peringatan "Konfirmasi password tidak cocok!"
										akan otomatis muncul di sini berkat 'path: ["confirmPassword"]'
										yang kita atur di Zod .refine()
									*/}
									<FormMessage />
									</FormItem>
								)}
								/>
								<Button type="submit" className="w-full bg-red-700 hover:bg-red-800 text-white" disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSubmitting ? "Deleting..." : "Delete"}
								</Button>
							</form>
						</Form>
					</motion.div>
			</DialogContent>			
		</Dialog>
		
	);
}