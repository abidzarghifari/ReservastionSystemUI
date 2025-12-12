'use client';

import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import BookingCard from './components/bookingCard';
import AttentionComponent from '../components/attentioncomponent';
import { mainContentVariants } from '../components/ContentVariant';
import { secondOpenUpVariants } from '../components/ContentVariant';
import { ToastHandler } from '../components/toastHandler';
import AuthStateProvider from '../components/AuthContex';
import { useEffect } from 'react';


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
		  		<ToastHandler />
				<div className='relative'>
				
				  <div className=" p-4 fixed w-full z-50">
					<Navbar/>              
				  </div>
				  <div className="fixed bottom-5 right-5 z-50">
					<AttentionComponent>
						<div className='bg-card rounded-full hover:bg-rose-300/30 p-4'>
							<BookingCard></BookingCard>
						</div>
					</AttentionComponent>
				  </div>

				  <motion.div
						className="relative w-full h-screen bg-fixed bg-top bg-cover pt-17 md:pt-30 lg:pt-25 items-bottom"
						variants={mainContentVariants}
						initial="initial"
						animate="animate"
						style={{ backgroundImage: "url('/room2. Jawa Tengah')" }}
					  >
						<div className="absolute inset-x-0 top-0 h-90 bg-black/50  z-0"></div>
				  
						<motion.div className='fixed inset-t-15 z-10 p-5 px-10'
							variants={mainContentVariants}
							initial="initial"
							animate="animate"
							>
							<h1 className="text-3xl md:text-5xl ">
								<strong>
									Hai disana!<span className="inline-block origin-bottom-right hover:rotate-12 transition-transform duration-300">👋</span>
								</strong>
							</h1>
							<p className="text-xs md:text-lg mt-1">
							  Selamat Datang dan anggap seperti rumah sendiri.
							</p>
						</motion.div>

						<motion.div className='min-h-screen relative z-10 p-6 py-8  md:pb-10 bg-black rounded-t-4xl mt-25 md:mt-35 lg:mt-30'
							variants={secondOpenUpVariants}
							initial="initial"
							animate="animate"
							>
							<hr className="mx-auto max-w-15 mb-5 md:mb-10 border-rose-500 border-1 rounded-full"/>
							<div>
								{children}
							</div>
						</motion.div>
						{/* Letakkan sisa konten website Anda di sini */}
				  </motion.div>
				</div>
		</AuthStateProvider>				
	</>
  );
}
