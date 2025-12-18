'use client'

import { motion } from 'framer-motion';
import { mainContentVariants } from '../components/ContentVariant';
import { openUpVariants } from '../components/ContentVariant';
import { IoArrowBackOutline } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
	<>
		<motion.div
		className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
		variants={mainContentVariants} 
		initial="initial"        
		animate="animate"        
		exit="exit"        
		style={{ backgroundImage: "url('/bgcabin4.webp')" }}
		>

	       {/**/}

			<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0"></div>
			<div className='z-10 w-full'>
				<div className="h-screen w-full p-3 flex md:flex-row items-center gap-5">
							<div className="hidden md:hidden lg:flex flex-col w-full h-full rounded-xl  justify-center p-2 pb-10 px-3">
								<div className='flex items-center justify-between backdrop-blur-xl  backdrop-grayscale-sm bg-white/10 p-2 px-4 rounded-full '>
									<h1 className='text-lg p-1'>Azzahra Cabin House</h1>
									<div className='flex flex-row gap-1 items-center p-1 px-3 hover:bg-white/10 rounded-full'>
										<IoArrowBackOutline /> back
									</div>
								</div>
								<div className='mt-auto'>
									<h1 className="text-5xl text-semibold leading-[1.1]">Relax With Us</h1>
									<h1 className="text-5xl text-semibold text-gray-400 leading-[1.1]">In Modern Serenity </h1>
									<h2 className="text-xl text-gray-200">serving with heart</h2>
								</div>
							</div>
							<motion.div className="w-full lg:w-4/5 h-full bg-card rounded-xl p-10 px-10 md:px-20 lg:px-10 flex flex-col justify-center"
									variants={openUpVariants} 
									initial="initial"        
									animate="animate"        
									exit="exit"
								>
									{children}
							</motion.div>
				</div>
			</div>
		</motion.div>		
	</>
  )
}
