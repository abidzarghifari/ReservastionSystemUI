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
					<div className="pb-5 w-full max-w-lg flex flex-col self-center">
						<h1 className="text-3xl font-semibold">Hi Admin, Welcome Back!</h1>
						<p className="text-white/50 text-xs">Log In untuk mulai mengelola villa</p>
					</div>
					<div className='w-full flex justify-center'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-lg">
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

								<Button type="submit" className="w-full rounded-full hover:bg-white/80" disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSubmitting ? "Log In..." : "Masuk"}
								</Button>
								<div className="w-full mx-auto">

									{/* 1. Bagian Divider "Or continue with" */}
									<div className="relative flex items-center w-full mb-6">
										<div className="flex-grow border-t border-white/30"></div>
										<span className="flex-shrink-0 mx-4 text-white/40 text-sm font-light">
										Or continue with:
										</span>
										<div className="flex-grow border-t border-white/30"></div>
									</div>

									{/* 2. Tombol Google (Pill Shape) */}
									<button
										className="flex items-center justify-center w-full px-6 py-3 mb-6 text-sm font-medium text-white/40 hover:text-black transition-colors duration-200 bg-transparent border border-white/30 rounded-full hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200"
									>
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
										<path
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											fill="#4285F4"
										/>
										<path
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											fill="#34A853"
										/>
										<path
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											fill="#FBBC05"
										/>
										<path
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											fill="#EA4335"
										/>
										</svg>
										<span>Continue with Google</span>
									</button>

									{/* 3. Footer "Sign up here" */}
									<div className="text-center text-sm text-white/40">
										Don't have an account?{' '}
										<a href="#" className="font-semibold text-white/70 hover:underline">
										Sign up here
										</a>
									</div>

								</div>
							</form>
						</Form>
					</div>					
	</>
  )
}