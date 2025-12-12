"use client"

import { Eye, EyeOff, Loader2} from "lucide-react";
import api from "@/lib/api"
import { useState } from "react"
import { toast } from "sonner"
import getDeviceDescription from "@/app/components/getDeviceDescription" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  current_password: z.string().min(8, {
	message: "Password harus memiliki minimal 8 karakter.",
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

export default function UpdatePasswordForm(){  
	
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			current_password: "",
			password: "",
			password_confirmation: "",
			device_name: getDeviceDescription(),
		},
	})
	
	async function onSubmit(values: z.infer<typeof formSchema>) {  
	setIsSubmitting(true);
		const {...dataToSend } = values;
		try {
		  const response = await api.patch('web/passwordupdate', dataToSend);		  
		  router.refresh();
		  toast.success("Update password berhasil!");
		} catch (error) {
		  toast.error("Update password Gagal", {
			description: (error as Error).message || 'Gagal terhubung ke server.',
		  });
		} finally {
		  setIsSubmitting(false);
		}
	}
	
	return (
	<Form {...form}>
	  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
								control={form.control}
								name="current_password"
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
								<Button type="submit" className="w-full" disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSubmitting ? "Updating..." : "Update"}
								</Button>
	  </form>
	</Form>
  )
}