'use client';

import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import BookingCard from './components/bookingCard';
import AttentionComponent from '../components/attentioncomponent';
import { mainContentVariants } from '../components/ContentVariant';
import { secondOpenUpVariants } from '../components/ContentVariant';
import { thirdOpenUpVariants } from '../components/ContentVariant';
import { openUpVariants } from '../components/ContentVariant';
import { ToastHandler } from '../components/toastHandler';
import AuthStateProvider from '../components/AuthContex';
import { useEffect } from 'react';
import { ArrowRight, Sparkles, Flower2 } from 'lucide-react';
import AppFooter from '../components/appfooter';
import Image from "next/image";

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	
	//Load Script Midtrans
	useEffect(() => {
		const scriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
		const clientKey = 'Mid-client-u264IJVhC-J87oYS';
		
		const script = document.createElement('script');
		script.src = scriptUrl;
		script.setAttribute('data-client-key', clientKey);
		script.async = true;
		
		document.body.appendChild(script);

		return () => {
		document.body.removeChild(script);
		}
	}, []);
	
  return (
	<>	
		<AuthStateProvider>
		  		
				{/**toast handler declaration */}
				<ToastHandler />

				<div className='relative'>
				
					<div className="p-6 fixed w-full z-50">
						<Navbar/>              
					</div>
					<div className="fixed bottom-10 right-7 z-50">
						<AttentionComponent>
							<div className='bg-rose-800 rounded-full hover:bg-rose-300/30 p-4'>
								<BookingCard></BookingCard>
							</div>
						</AttentionComponent>
					</div>


					<motion.div
							className="relative w-full h-full pt-20 md:pt-23 lg:pt-23 bg-fixed bg-top bg-cover"
							variants={mainContentVariants}
							initial="initial"
							animate="animate"
							style={{ backgroundImage: "url('/bgcabin3.webp')" }}
						>
							{/*<div className="absolute fixed inset-x-0 top-0 h-full backdrop-blur-2xl backdrop-grayscale bg-rose-500/50  z-0"></div>*/}
						<div className="absolute inset-0 bg-black/10"></div>		
     					    	<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

							<motion.div
								className='fixed w-full max-w-7xl mx-auto inset-x-0 top-[11%]  lg:top-[15%] z-10 px-6 md:px-12'
								variants={mainContentVariants}
								initial="initial"
								animate="animate"
							>
								<div className="flex flex-col items-start gap-2 lg:gap-6">
									
									{/* 1. Subtitle Kecil */}
									<span className="text-white text-xs md:text-sm lg:text-base font-medium tracking-wide">
										Azzahra Cabin House
									</span>

									{/* 2. Judul Utama (Heading) */}
									{/* Menggunakan leading-tight agar jarak antar baris rapat seperti di gambar */}
									<h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold text-white leading-[1.1]">
										Relax with Us <br />
										<span className="text-gray-200">in Modern Serenity</span>
									</h1>

									{/* 3. Tombol Custom (Pill Shape) */}
									<button className="hidden group mt-4 bg-white pl-8 pr-2 py-2 rounded-full lg:flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-lg">
									
									{/* Teks Tombol */}
									<span className="font-medium text-stone-900 text-lg">
										View Rooms
									</span>
									
									{/* Lingkaran Panah */}
									{/* Warna bg-[#3E3D29] disesuaikan dengan warna hijau/cokelat gelap di gambar */}
									<div className="w-12 h-12 bg-[#3E3D29] rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
										<svg 
										xmlns="http://www.w3.org/2000/svg" 
										fill="none" 
										viewBox="0 0 24 24" 
										strokeWidth={2} 
										stroke="currentColor" 
										className="w-5 h-5"
										>
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
										</svg>
									</div>

									</button>
								</div>
							</motion.div>					

							<motion.div
								variants={thirdOpenUpVariants}
								initial="initial"
								animate="animate"
							>
								<div className='h-[15vh] md:h-[20vh] lg:h-[70vh]'>

								</div>
								<div className='min-h-screen relative z-10 p-6 py-8  md:pb-10 bg-black  rounded-t-4xl lg:rounded-b-4xl lg:mx-15'>
									<hr className="mx-auto max-w-15 mb-5 md:mb-10 border-rose-500 border-1 rounded-full"/>
									<div>
										{children}
									</div>
									<div className='mb-3 mt-8 max-w-6xl mx-auto'>
										<AppFooter/>
									</div>
								</div>
							</motion.div>
							
							{/*<div className='absolute inset-x-0 top-[50%] h-screen z-0 backdrop-blur-xl backdrop-grayscale bg-white/10'></div> mt-25 md:mt-35 lg:mt-[70vh] 	
							<motion.div className='min-h-screen relative z-10 p-6 py-8  md:pb-10 bg-black  rounded-t-4xl lg:rounded-b-4xl lg:mx-15'
								variants={openUpVariants}
								initial="initial"
								animate="animate"
								>
								<hr className="mx-auto max-w-15 mb-5 md:mb-10 border-rose-500 border-1 rounded-full"/>
								<div>
									{children}
								</div>
								<div className='mb-3 mt-8 max-w-6xl mx-auto'>
									<AppFooter/>
								</div>
							</motion.div>*/}

							<div className='hidden lg:block p-5'>

							</div>
							
					</motion.div>
				</div>
		</AuthStateProvider>				
	</>
  );
}
