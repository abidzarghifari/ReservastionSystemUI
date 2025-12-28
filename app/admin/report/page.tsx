"use client"

import Image from "next/image";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdPeople } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonCard } from '../../components/skeletonCard';
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { IoIosPrint } from "react-icons/io";
import PrintModule from "./report";

export default function Page(){
	const [report, setReport] = useState({});
	const [isLoadingReport,setLoadingReport] =  useState(true);
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	const [chartIncomeData,setChartIncomeData] = useState([]);
	const [chartReservationData,setChartReservationData] = useState([]);

	useEffect(() => {

            const fetchReport = async () => {
                try {
                    const response = await api.get(`/web/report`); 
                    setReport(response.data.data);
					setChartIncomeData(response.data.data.chart_income);
					setChartReservationData(response.data.data.chart_reservations);
					
                } catch (error) {
					setReport({});
                    console.error("Gagal memuat Report", error);
                    toast.error("Gagal memuat Report");
                } finally {
                    setLoadingReport(false);
                }
            };    

            fetchReport();

    }, []);

	const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

	const chartConfig = {
	income: {
		label: "Pendapatan",
		color: "#2563eb", // Biasanya biru/primary
	},
	reservations: {
		label: "Reservasi",
		color: "#60a5fa", // Biasanya hijau/secondary
	},
	} satisfies ChartConfig

	const chartData = useMemo(() => {
		if (chartIncomeData.length === 0 || chartReservationData.length === 0) {
		return [];
		}

		return MONTHS.map((month, index) => ({
			month: month,
			income: chartIncomeData[index],
			reservations: chartReservationData[index],
		}));

	}, [chartIncomeData, chartReservationData]);

	const formatRupiah = (value: number) => {
		return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
		}).format(value);
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-4 pt-10">
				
					<div className="group relative flex-[2] transition-all duration-500 ease-in-out hover:flex-[3] h-[450px] rounded-3xl overflow-hidden">
						<img src="https://picsum.photos/id/1040/800/600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Villa Background"/>
						
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>

						<div className="relative flex flex-col justify-end h-full p-6 text-white">
							<div className="p-6 rounded-2xl bg-black/30 backdrop-blur-lg border">
								<h2 className="text-3xl font-bold">Selamat Datang, Admin!</h2>
								<p className="mt-2 text-white/80">Berikut adalah performa villa Anda bulan ini.</p>
								
								<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<GiTakeMyMoney />
										</div>
										<div>
											<p className="text-sm text-white/80">Income</p>
											{
												isLoadingReport ? (
													<Skeleton className="h-4 w-[50px]" />
												):(
													<p className="text-lg font-semibold">Rp {report.monthly_income}</p>
												)
											}
											
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<SlGraph />
										</div>
										<div>
											<p className="text-sm text-white/80">Occupancy</p>
											{
												isLoadingReport ? (
													<Skeleton className="h-4 w-[50px]" />
												):(
													<p className="text-lg font-semibold">{report.monthly_occupancy} %</p>
												)
											}
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<MdPeople />
										</div>
										<div>
											<p className="text-sm text-white/80">New Guest</p>
											{
												isLoadingReport ? (
													<Skeleton className="h-4 w-[50px]" />
												):(
													<p className="text-lg font-semibold">{report.upcoming_guests}</p>
												)
											}
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<IoIosPrint />
										</div>
										<div>
																											 {
												isLoadingReport ? (
													<Skeleton className="h-4 w-[50px]" />
												):(
													<PrintModule data={report}></PrintModule>

												)
											}
											
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>

					<div className="group flex-1 transition-all duration-500 ease-in-out hover:flex-[1.5] h-[450px] bg-card rounded-3xl p-6 shadow-sm border">
						<div className="flex flex-col h-full">
							<h3 className="text-2xl font-bold text-slate-100">Aktivitas Terbaru</h3>
							<p className="text-slate-200 mt-1">Hal-hal yang memerlukan perhatian Anda.</p>
							
							<div className="mt-6 space-y-4 overflow-y-auto pr-2">
								<div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
									<div className="bg-blue-100 text-blue-600 p-2 rounded-full">
										<p>icon</p>
									</div>
									<div>
										<p className="font-semibold text-slate-800">Reservasi Baru</p>
										<p className="text-slate-600 text-sm">Budi Santoso telah memesan Villa Bougenville untuk 3 malam.</p>
										<a href="#" className="text-sm font-semibold text-blue-600 mt-1 inline-block">Lihat Detail &rarr;</a>
									</div>
								</div>
								
								<div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
									<div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
										<p>icon</p>
									</div>
									<div>
										<p className="font-semibold text-slate-800">Villa Perlu Dibersihkan</p>
										<p className="text-slate-600 text-sm">Tamu di Villa Melati telah check-out. Jadwalkan pembersihan.</p>
										<a href="#" className="text-sm font-semibold text-yellow-600 mt-1 inline-block">Tandai Selesai &rarr;</a>
									</div>
								</div>

								<div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-200">
									<div className="bg-green-100 text-green-600 p-2 rounded-full">
										<p>icon</p>
									</div>
									<div>
										<p className="font-semibold text-slate-800">Ulasan Baru Diterima</p>
										<p className="text-slate-600 text-sm">Anisa Putri memberikan rating 5 bintang untuk Villa Anggrek.</p>
										<a href="#" className="text-sm font-semibold text-green-600 mt-1 inline-block">Balas Ulasan &rarr;</a>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>

		{
			isLoadingReport ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto pt-8">
					<div className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-4">
						<Skeleton className="h-6 w-1/3 rounded" />
						<Skeleton className="h-[200px] w-full rounded" />
					</div>
					
					<div className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-4">
						<Skeleton className="h-6 w-1/3 rounded" />
						<Skeleton className="h-[200px] w-full rounded" />
					</div>
				</div>
			):(
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto pt-8">
      
				{/* --- GRAFIK 1: PENDAPATAN (BAR CHART) --- */}
				<Card>
					<CardHeader>
					<CardTitle>Total Pendapatan</CardTitle>
					<CardDescription>Januari - Desember</CardDescription>
					</CardHeader>
					<CardContent>
					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis 
							tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(1)}jt`} // Format sumbu Y agar ringkas
							axisLine={false}
							tickLine={false}
						/>
						<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatRupiah(Number(value))} />} />
						<Bar 
							dataKey="income" 
							fill="var(--color-income)" 
							radius={[4, 4, 0, 0]} 
							name="Pendapatan"
						/>
						</BarChart>
					</ChartContainer>
					</CardContent>
				</Card>

				{/* --- GRAFIK 2: JUMLAH RESERVASI (LINE CHART) --- */}
				<Card>
					<CardHeader>
					<CardTitle>Frekuensi Booking</CardTitle>
					<CardDescription>Jumlah tamu check-in per bulan</CardDescription>
					</CardHeader>
					<CardContent>
					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<LineChart
						accessibilityLayer
						data={chartData}
						margin={{ left: 12, right: 12 }}
						>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis 
							allowDecimals={false} // Agar tidak muncul 1.5 orang
							axisLine={false}
							tickLine={false}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey="reservations"
							type="monotone" // Membuat garis melengkung halus
							stroke="var(--color-reservations)"
							strokeWidth={2}
							dot={{ r: 4 }}
							activeDot={{ r: 6 }}
							name="Booking"
						/>
						</LineChart>
					</ChartContainer>
					</CardContent>
				</Card>

			</div>
			)
		}
			<div className="w-full max-w-6xl mx-auto py-8">
				 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

					{
						isLoadingReport ? (
							<>
								<SkeletonCard/>
								<SkeletonCard/>
								<SkeletonCard/>
							</>
						):(
							
							report.rooms.map((room) =>

								<div className="relative group rounded-2xl bg-bottom pt-30 lg:pt-40 overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-2">
									<Image 
										src={room.roomtype.media_path ? `${baseUrl}/storage/${room.roomtype.media_path}` : "/placeholder.jpg"}
										alt={room.roomtype.name}
										fill
										className="object-cover z-0"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

									{room.is_occupied ? ( 
											<span className="absolute top-4 z-20 right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">Ditempati</span>
										): (
											<span className="absolute top-4 z-20 right-4 bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">Kosong</span>
									)}

									<div className='relative z-20 p-2'>

										<div className="p-6 rounded-2xl bg-black/30 backdrop-blur-lg border">
											<div className="z-30">
												<h3 className="text-xl font-bold text-white">Villa {room.name}</h3>
											
												<div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-5 text-sm text-white">
													<div>
														<p className="text-white/80">Pendapatan (Bln Ini)</p>
														<p className="font-semibold text-base">Rp {room.current_month_income}</p>
													</div>
													<div>
														<p className="text-white/80">Jumlah Booking</p>
														<p className="font-semibold text-base">{room.current_month_bookings}</p>
													</div>
													<div>
														<p className="text-white/80">Check-in Berikutnya</p>
														<p className="font-semibold text-base">{room.next_checkin}</p>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>

							)
							
						)
					}

				</div>
			</div>
		</>
	);
}
