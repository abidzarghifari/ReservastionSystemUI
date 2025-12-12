"use client"

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdPeople } from "react-icons/md";
import { SlGraph } from "react-icons/sl";

export default function Page(){
	const [report, setReport] = useState({});
	const [isLoadingReport,setLoadingReport] =  useState(true);

	useEffect(() => {

            const fetchReport = async () => {
                try {
                    const response = await api.get(`/web/report`); 
                    setReport(response.data.data || response.data);
                
                } catch (error) {
                    console.error("Gagal memuat Report", error);
                    toast.error("Gagal memuat Report");
                } finally {
                    setLoadingReport(false);
                }
            };    

            fetchReport();

    }, []);

	return (
		<>
			<div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-6 py-5">
				
					<div className="group relative flex-[2] transition-all duration-500 ease-in-out hover:flex-[3] h-[450px] rounded-3xl overflow-hidden">
						<img src="https://picsum.photos/id/1040/800/600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Villa Background"/>
						
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>

						<div className="relative flex flex-col justify-end h-full p-8 text-white">
							<div className="p-6 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/20">
								<h2 className="text-3xl font-bold">Selamat Datang, Admin!</h2>
								<p className="mt-2 text-white/80">Berikut adalah performa villa Anda bulan ini.</p>
								
								<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<GiTakeMyMoney />
										</div>
										<div>
											<p className="text-sm text-white/80">Income</p>
											<p className="text-lg font-semibold">Rp monthly_income</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<SlGraph />
										</div>
										<div>
											<p className="text-sm text-white/80">Occupancy</p>
											<p className="text-lg font-semibold">monthly_occupancy %</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="bg-white/20 p-2 rounded-lg">
											<MdPeople />
										</div>
										<div>
											<p className="text-sm text-white/80">New Guest</p>
											<p className="text-lg font-semibold">upcoming_guests</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="group flex-1 transition-all duration-500 ease-in-out hover:flex-[1.5] h-[450px] bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
						<div className="flex flex-col h-full">
							<h3 className="text-2xl font-bold text-slate-800">Aktivitas Terbaru</h3>
							<p className="text-slate-500 mt-1">Hal-hal yang memerlukan perhatian Anda.</p>
							
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

			<div className="w-full max-w-6xl mx-auto py-8">
				 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

					<div className="group bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-2">
						<div className="relative">
							<img src="https://picsum.photos/id/1018/400/250" className="rounded-t-2xl h-44 w-full object-cover" alt="Villa Melati"/>
							<span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">Tersedia</span>
						</div>
						
						<div className="p-6">
							<h3 className="text-xl font-bold text-slate-900">Villa Melati</h3>
							<p className="text-sm text-slate-500">Kapasitas 4 Tamu, 2 Kamar Tidur</p>
							
							<div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-5 text-sm">
								<div>
									<p className="text-slate-500">Pendapatan (Bln Ini)</p>
									<p className="font-semibold text-slate-800 text-base">Rp 45.2 Jt</p>
								</div>
								<div>
									<p className="text-slate-500">Tingkat Hunian</p>
									<p className="font-semibold text-slate-800 text-base">92%</p>
								</div>
								<div>
									<p className="text-slate-500">Jumlah Booking</p>
									<p className="font-semibold text-slate-800 text-base">8</p>
								</div>
								<div>
									<p className="text-slate-500">Check-in Berikutnya</p>
									<p className="font-semibold text-slate-800 text-base">20 Jul 2025</p>
								</div>
							</div>

							<div className="mt-6">
								<a href="#" className="w-full text-center block bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors hover:bg-slate-900">
									Kelola Villa
								</a>
							</div>
						</div>
					</div>

					<div className="group bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-2">
						<div className="relative">
							<img src="https://picsum.photos/id/106/400/250" className="rounded-t-2xl h-44 w-full object-cover" alt="Villa Anggrek"/>
							<span className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">Ditempati</span>
						</div>
						
						<div className="p-6">
							<h3 className="text-xl font-bold text-slate-900">Villa Anggrek</h3>
							<p className="text-sm text-slate-500">Kapasitas 6 Tamu, 3 Kamar Tidur</p>
							
							<div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-5 text-sm">
								<div>
									<p className="text-slate-500">Pendapatan (Bln Ini)</p>
									<p className="font-semibold text-slate-800 text-base">Rp 68.5 Jt</p>
								</div>
								<div>
									<p className="text-slate-500">Tingkat Hunian</p>
									<p className="font-semibold text-slate-800 text-base">98%</p>
								</div>
								<div>
									<p className="text-slate-500">Jumlah Booking</p>
									<p className="font-semibold text-slate-800 text-base">11</p>
								</div>
								<div>
									<p className="text-slate-500">Check-out Berikutnya</p>
									<p className="font-semibold text-slate-800 text-base">19 Jul 2025</p>
								</div>
							</div>
							
							<div className="mt-6">
								<a href="#" className="w-full text-center block bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors hover:bg-slate-900">
									Kelola Villa
								</a>
							</div>
						</div>
					</div>
					
					<div className="group bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-2">
						<div className="relative">
							<img src="https://picsum.photos/id/13/400/250" className="rounded-t-2xl h-44 w-full object-cover" alt="Villa Kenanga"/>
							<span className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-200">Perlu Dibersihkan</span>
						</div>
						
						<div className="p-6">
							<h3 className="text-xl font-bold text-slate-900">Villa Kenanga</h3>
							<p className="text-sm text-slate-500">Kapasitas 2 Tamu, 1 Kamar Tidur</p>
							
							<div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-5 text-sm">
								<div>
									<p className="text-slate-500">Pendapatan (Bln Ini)</p>
									<p className="font-semibold text-slate-800 text-base">Rp 25.0 Jt</p>
								</div>
								<div>
									<p className="text-slate-500">Tingkat Hunian</p>
									<p className="font-semibold text-slate-800 text-base">75%</p>
								</div>
								<div>
									<p className="text-slate-500">Jumlah Booking</p>
									<p className="font-semibold text-slate-800 text-base">6</p>
								</div>
								<div>
									<p className="text-slate-500">Terakhir Ditempati</p>
									<p className="font-semibold text-slate-800 text-base">16 Jul 2025</p>
								</div>
							</div>

							<div className="mt-6">
								<a href="#" className="w-full text-center block bg-yellow-400 text-yellow-900 font-semibold py-3 rounded-lg transition-colors hover:bg-yellow-500">
									Tandai Selesai
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	);
}