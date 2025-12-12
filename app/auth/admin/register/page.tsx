"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { openUpVariants } from "@/app/components/ContentVariant";
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


export default function Page() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); 
  
  const form = useForm<z.infer<typeof formSchema>>({
	resolver: zodResolver(formSchema),
	defaultValues: {
	  name: "",
	  email: "",
	  password: "",
	  password_confirmation: "",
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

	  try {
		localStorage.setItem('toastOnLoad', JSON.stringify(toastData));
	  } catch (e) {
		console.warn("Gagal menyimpan toast ke localStorage:", e);
	  }
	  
	  
	  form.reset();
	  
	  router.push('/admin/report');

	} catch (error) {
	  console.error("Error pendaftaran:", error);
	  toast.error("Pendaftaran Gagal", {
		description: (error as Error).message || 'Gagal terhubung ke server.',
	  });
	} finally {
	  setIsSubmitting(false);
	}
  }

  return (
	<>
					<div className="pb-5">
						<h1 className="text-3xl"><strong>Sign Up</strong></h1>
					</div>
					<div className='w-full flex justify-center'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
								
								{/* Field Nama */}
								<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
								/>

								{/* Field Email */}
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

								{/* Field Password */}
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

								{/* Field Konfirmasi Password */}
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

								<Button type="submit" className="w-full" disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSubmitting ? "Mendaftar..." : "Daftar"}
								</Button>
							</form>
						</Form>
					</div>					
	</>
  )
}