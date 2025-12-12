'use client'

import { motion } from 'framer-motion';
import { mainContentVariants } from '../components/ContentVariant';
import { openUpVariants } from '../components/ContentVariant';

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
			<div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent z-0"></div>
			<div className='z-10 w-full'>
				<div className="h-screen w-full p-10 flex md:flex-row items-center">
							<div className="hidden md:flex flex-col w-full justify-center p-10">
								<h1 className="text-5xl"><strong>Azzahra <br /> Cabin House</strong></h1>
								<h2 className="text-2xl">serving with heart</h2>
							</div>
							<motion.div className="w-full bg-card rounded-2xl p-10 flex flex-col items-center"
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