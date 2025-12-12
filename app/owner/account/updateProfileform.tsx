"use client"

import {Loader2} from "lucide-react";
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
import { AuthStateContext } from "@/app/components/AuthContex";
import { useContext } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus memiliki minimal 2 karakter.",
  }),
  email: z.email({
    message: "Format email tidak valid.",
    }),
  device_name: z.string()
      .nonempty("Device name is required.")
      .min(2, "Device name must be at least 2 characters."),
})

export default function UpdateProfileForm(){  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {authState} = useContext(AuthStateContext);
  
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  name: "",
      email: "",
      device_name: getDeviceDescription(),
		},
	})
	
	async function onSubmit(values: z.infer<typeof formSchema>) {  
    setIsSubmitting(true);
		const {...dataToSend } = values;
		try {
		  const response = await api.patch('web/ownerprofileupdate', dataToSend);		  
		  router.refresh();
		  toast.success("Update profile berhasil!");
		} catch (error) {
		  toast.error("Update profile Gagal", {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={
                        authState.loading ? (
                            "Memeriksa sesi..."
                        ): authState.authStatus === 'owner' ? (
                            authState.data.data.name
                        ) : (
                            "failed to load name"
                        )
                      }
                 {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                  <Input placeholder={
                        authState.loading ? (
                            "Memeriksa sesi..."
                        ): authState.authStatus === 'owner' ? (
                            authState.data.data.email
                        ) : (
                            "failed to load name"
                        )

                      }
                 {...field} />
                </FormControl>
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