'use client';

import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { LuNotebookPen } from "react-icons/lu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { AuthStateContext } from '@/app/components/AuthContex';
import { useContext } from 'react';
import { mainContentVariants } from '@/app/components/ContentVariant';
import Link from 'next/link';
import {Loader2} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import getDeviceDescription from '@/app/components/getDeviceDescription';
import api from "@/lib/api";
import { DateRangePicker } from './dateRangePicker';
import { differenceInCalendarDays, format } from "date-fns";
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BiSolidBookAdd } from "react-icons/bi";

/**
=========== Form Schema ================================
*'room_id'
*'checkin_date'
*'checkout_date'
*'special_request'
*'total_payment'
*/

const formSchema = z.object({
    
  type_id: z.coerce.number({ invalid_type_error: "Tipe kamar wajib dipilih." })
	.int()
	.positive({ message: "Silakan pilih tipe kamar." }),

  
  room_id: z.coerce.number({ invalid_type_error: "Kamar wajib dipilih." })
    .int()
    .positive({ message: "Silakan pilih kamar yang valid." }),


  checkin_date: z.date({
    required_error: "Tanggal check-in wajib dipilih.",
    invalid_type_error: "Format tanggal tidak valid.",
  }),

  checkout_date: z.date({
    required_error: "Tanggal check-out wajib dipilih.",
    invalid_type_error: "Format tanggal tidak valid.",
  }),
  
  special_request: z.string()
    .max(500, { message: "Permintaan khusus maksimal 500 karakter." })
    .optional(),

  total_payment: z.coerce
    .number({
      required_error: "Total pembayaran harus diisi",
      invalid_type_error: "Total pembayaran harus berupa angka",
    })
    .min(1, "Total pembayaran minimal 1 rupiah") 
    .int("Total pembayaran tidak boleh desimal"),

	device_name: z.string().optional(),
})

.refine((data) => {
  if (!data.checkin_date || !data.checkout_date) return true;
  return data.checkout_date > data.checkin_date;
}, {
  message: "Tanggal check-out harus setelah tanggal check-in.",
  path: ["checkout_date"],
});

interface RoomTypeOption {
    id: number;
    name: string;
}

interface RoomOption {
    id: number;
    name: string;
}






// ================== main component =============================================

export default function BookingCard({
  content,
  ...props
}) {

	// state for authStateContext, isSubmitting, modal OpenState and Form Default value
	const {authState} = useContext(AuthStateContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type_id: undefined,
			room_id: undefined, 
			checkin_date: undefined, 
			checkout_date: undefined,
			special_request: "",
			total_payment : undefined,
			device_name: "Unknown Device",
		},
	});

	useEffect(() => {
			const device = getDeviceDescription();
			if (device) {
				form.setValue('device_name', device);
			}
	}, [form]);




	// 1. FETCH DATA TIPE KAMAR ===================

	const [roomTypes, setRoomTypes] = useState<RoomTypeOption[]>([]);
	const [isLoadingTypes, setIsLoadingTypes] = useState(true);
	const [selectRoomTypes, setSelectRoomTypes] = useState('');

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await api.get('/web/getallroomtypes'); 
                setRoomTypes(response.data.data || response.data);
            } catch (error) {
                console.error("Gagal memuat tipe kamar", error);
                toast.error("Gagal memuat opsi tipe kamar");
            } finally {
                setIsLoadingTypes(false);
            }
        };

        if (open) {
            fetchRoomTypes();
        }
    }, [open]);




	// 1. FETCH DATA KAMAR =================================
	
	const [rooms, setRooms] = useState<RoomOption[]>([]);
	const [isLoadingRoom, setIsLoadingRoom] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState('');

	useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get(`/web/getrooms/${selectRoomTypes}`); 
                setRooms(response.data.data || response.data);
            } catch (error) {
                console.error("Gagal memuat kamar", error);
                toast.error("Gagal memuat opsi kamar");
            } finally {
                setIsLoadingRoom(false);
            }
        };

        if (selectRoomTypes) {
            fetchRooms();
        }

    }, [selectRoomTypes]);


	//FETCH Booked Dates =====================================
	
	//Definisi State untuk menyimpan hasil inputan
	const [dateRange, setDateRange] = useState({
		from: undefined,
		to: undefined,
	});
	const [isLoadingBookedDates, setIsLoadingBookedDates] = useState(false);
	const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const fetchBookedDates = async () => {

			if ( !selectedRoom || !selectRoomTypes) {
				setDateRange({
					from: undefined,
					to: undefined,
				});
				return;
			}

            setIsLoadingBookedDates(true);
            try {
                const response = await api.get(`/web/getreservationsbyroom/${selectedRoom}`); 
                
                const formattedDates = response.data.data.map((item) => ({
                    from: new Date(item.checkin_date), 
                    to: new Date(item.checkout_date)
                }));
                
                setBookedDates(formattedDates);
                
            } catch (error) {
                console.error("Gagal memuat booked dates", error);
                toast.error("Gagal memuat booked dates");
                setBookedDates([]);
            } finally {
                setIsLoadingBookedDates(false); 
            }
        };

        fetchBookedDates();
    }, [selectRoomTypes,selectedRoom]);


	//effect untuk mengisi nilai formSchema setelah terisi	
	useEffect(() => {
		// A. Update Check-in Date
		// Kita cek apakah 'from' ada, jika tidak kirim undefined agar validasi 'required' bekerja
		form.setValue("checkin_date", dateRange?.from, { 
			shouldValidate: true, // Agar error merah langsung hilang/muncul
			shouldDirty: true 
		});

		// B. Update Check-out Date
		form.setValue("checkout_date", dateRange?.to, { 
			shouldValidate: true, 
			shouldDirty: true 
		});

		// Debugging (Opsional)
		// console.log("Form Synced:", dateRange);

	}, [dateRange, form]);



	//Total Payment State ============================================
	
	const [Price, setPrice] = useState(0);
	const [totalDays, setTotalDays] = useState(0);
	const [totalPayment, setTotalPayment] = useState(0);

	useEffect(() => {
		
		if (!dateRange?.from || !dateRange?.to || !selectRoomTypes) {
			setTotalPayment(0);
			return;
		}

		const countTotalPayment = async () => {
			try {
				const response = await api.get(`/web/getroomtype/${selectRoomTypes}`); 
				
				const pricePerNight = response.data.data[0].price; 
				setPrice(pricePerNight);

				let duration = differenceInCalendarDays(dateRange.to, dateRange.from);

				if (duration === 0) duration = 1; 

				setTotalDays(duration);

				const total = duration * pricePerNight;

				console.log(`Harga: ${pricePerNight}, Durasi: ${duration} hari, Total: ${total}`);
				
				setTotalPayment(total);
			} catch (error) {
				console.error("Gagal memuat Harga", error);
				toast.error("Gagal memuat Harga");
				setTotalPayment(0);
			} 
		};
		countTotalPayment();
	}, [dateRange, selectRoomTypes]);

	useEffect(() => {
		
		// Setiap kali totalPayment berubah, update nilai di dalam Form
		form.setValue("total_payment", totalPayment, { 
			shouldValidate: true, // Opsional: Agar validasi min(1) langsung dicek
			shouldDirty: true,
			shouldTouch: true
		});
		
		console.log("Form total_payment updated to:", totalPayment);
	}, [totalPayment, form]);



	// on Submit ==========================================================================================

	async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

		const payload = {
			room_id: values.room_id,
			checkin_date: format(values.checkin_date, "yyyy-MM-dd"),
			checkout_date: format(values.checkout_date, "yyyy-MM-dd"),
			special_request: values.special_request,
			total_payment: values.total_payment,
			device_name: values.device_name
		};

        try {

			const response = await api.post('web/createreservation', payload);
			
			//resetting form and state
			form.reset();
			setSelectRoomTypes('');
			setSelectedRoom('');
			setDateRange({
				from: undefined,
				to: undefined,
			});
			setPrice(0);
			setTotalDays(0);
			setTotalPayment(0); 
			setOpen(false);

			toast.success("Booking Berhasil Dicatat, menunggu pembayaran");

			//show snap payment

			const snapToken = response.data.snapToken; 

			if (window.snap) {
				window.snap.pay(snapToken, {
					onSuccess: () => {
						toast.success('Payment Success:');
					},
					onPending: () => {
						toast.info('Payment Pending:');
					},
					onError: () => {
						toast.error('Payment Error');
					},
					onClose: () => {
						toast.warning('Customer closed the popup without finishing the payment:');
					},
				});
			}
			
        } catch (error: any) {

			const msg = error?.response?.data?.message || "Gagal terhubung ke server.";
			const validationErrors = error?.response?.data?.errors;
			
			let errorDescription = msg;
			
			if (validationErrors) {
				errorDescription = Object.values(validationErrors).flat().join(', ');
			}

			toast.error("Booking Failed", {
				description: errorDescription,
			});

        } finally {

         	setIsSubmitting(false);
			
        }
    }

	

	return (
		<Dialog open={open} onOpenChange={setOpen}>

				{/** ====================== dialog trigger ============================== */}
				{	
						authState.loading ? (
							<Loader2 className="m-2 h-4 w-4 animate-spin" />
						) : authState.authStatus === 'user' ? (
							content ? (
								<DialogTrigger asChild onClick={(event) => event.stopPropagation()}>
									<button className="rounded-full p-3 px-4 bg-rose-400 text-white hover:bg-rose-500 hover:border-transparent hover:text-white transition-colors">{content}</button>
								</DialogTrigger>
							) : (
								<DialogTrigger className='p-0' asChild onClick={(event) => event.stopPropagation()}>
									<button className='p-0'><BiSolidBookAdd size={30}/></button>
								</DialogTrigger>
							)

						) : (
							content ? (
								<Link 
								href="/auth/guest/login" 
								className="rounded-full p-3 px-4 bg-rose-400 text-white hover:bg-rose-500 hover:border-transparent hover:text-white transition-colors"
								onClick={(event) => event.stopPropagation()} 
								>
									{content}
								</Link>
							) : (
								<div>
									<Link href="/auth/guest/login"><BiSolidBookAdd size={30}/></Link>
								</div>
							)
							
						)					
				}
			

				{/** ====================== dialog content ============================== */}
				<DialogContent 
					className="w-screen h-screen rounded-none top-0 left-0 translate-x-0 translate-y-0
					md:max-w-md md:h-auto md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
					"
					onClick={(event) => event.stopPropagation()}
				>

					<DialogHeader>
						<DialogTitle className='text-gray-200'>Booking Sheet</DialogTitle>
					</DialogHeader>

					<motion.div
					  variants={mainContentVariants}
					  initial="initial"
					  animate="animate"
					>	

						<Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
								<div className="grid grid-cols-2 md:grid-cols-2 gap-3">
									
									{/* Field Tipe Kamar*/}
									<FormField
										control={form.control}
										name="type_id"
										render={({ field }) => (
										<FormItem>
												<Select 
													disabled={isLoadingTypes} 
													onValueChange={(val) => {
														field.onChange(Number(val));
														setSelectRoomTypes(val); 
													}}
													value={field.value ? String(field.value) : undefined}
													>
													<FormControl>
														<SelectTrigger className="w-full lg:w-[180px] flex justify-self-center">
															<SelectValue placeholder={isLoadingTypes ? "Memuat..." : "Tipe Kamar"} />
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

									{/* Field Kamar*/}
									<FormField
										control={form.control}
										name="room_id"
										render={({ field }) => (
										<FormItem>
												<Select 
													disabled={isLoadingRoom} 
													onValueChange={(val) => {
														field.onChange(Number(val));
														setSelectedRoom(val); 
													}}
													value={field.value ? String(field.value) : undefined}
													>
													<FormControl>
														<SelectTrigger className="w-full lg:w-[180px] flex justify-self-center">
															<SelectValue placeholder={isLoadingRoom ? "pilih kamar dahulu" : "Kamar"} />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{rooms.map((type) => (
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
								</div>

								{/* Field Checkin-Checkout */} 
								<div className="mt-6">                    
									<DateRangePicker 
										className="w-full"
										value={dateRange}             // Binding value (State)
										onChange={setDateRange}       // Binding event (Setter)
										bookedDates={bookedDates} // Data blocking
									/>
									
        							{isLoadingBookedDates && <p className="text-xs text-muted-foreground mt-1">Memuat ketersediaan...</p>}
								</div>

								<div className="mt-6 backdrop-blur-2xl backdrop-grayscale bg-rose-50/5 p-4 rounded-md">
												<h3 className="text-lg font-semibold text-gray-200 mb-2">Rincian Harga</h3>
												<div className="flex justify-between items-center text-gray-300">
													<p>Harga per malam:</p>
													<p id="price-per-night">Rp {Price}</p>
												</div>
												<div className="flex justify-between items-center text-gray-300 mt-1">
													<p>Jumlah malam:</p>
													<p id="number-of-nights">{totalDays} malam</p>
												</div>
												<hr className="my-2"/>
												<div className="flex justify-between items-center text-gray-300 font-bold text-xl">
													<p>Total Harga:</p>
													<p id="total-price">Rp {totalPayment}</p>
												</div>
								</div>

								{/* Field Special request */}
								<FormField
									control={form.control}
									name="special_request"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea 
													placeholder="Permintaan Khusus (Opsional)..." 
													className="resize-none" 
														{...field} 
													/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

 								<Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
									{isSubmitting && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isSubmitting ? "Booking..." : "Book now"}
                                </Button>
							</form>
                        </Form>
					</motion.div>

				</DialogContent>
			
		</Dialog>
        
    );
}
