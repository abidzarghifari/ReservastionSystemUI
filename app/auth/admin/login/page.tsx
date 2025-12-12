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
  email: z.email({
	message: "Format email tidak valid.",
  }),
  password: z.string().min(8, {
	message: "Password harus memiliki minimal 8 karakter.",
  }),
  device_name: z.string()
	.nonempty("Device name is required.")
	.min(2, "Device name must be at least 2 characters."),
})

export default function Page() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
	resolver: zodResolver(formSchema),
	defaultValues: {
	  email: "",
	  password: "",
	  device_name: getDeviceDescription(),
	},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

	setIsSubmitting(true);
	
	const {...dataToSend } = values;
	
	try {

	  const response = await api.post('/web/loginadmin', dataToSend);

	  const toastData = {
		title: "Login Berhasil!",
		description: `Hi Jumpa Kembali :)!`
	  };

	  try {
		localStorage.setItem('toastOnLoad', JSON.stringify(toastData));
	  } catch (e) {
		console.warn("Gagal menyimpan toast ke localStorage:", e);
	  }  
	  
	  form.reset();
	  
	  router.push('/admin/report');

	} catch (error) {
	  console.error("Error login:", error);
	  toast.error("Login Gagal", {
		description: (error as Error).message || 'Gagal terhubung ke server.',
	  });
	} finally {
	  setIsSubmitting(false);
	}
  }

  return (
	<>
					<div className="pb-5">
						<h1 className="text-3xl"><strong>Sign In</strong></h1>
					</div>
					<div className='w-full flex justify-center'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
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

								<Button type="submit" className="w-full" disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSubmitting ? "Log In..." : "Masuk"}
								</Button>
							</form>
						</Form>
					</div>					
	</>
  )
}