'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';


// Varian untuk animasi masuk dari konten utama
export const mainContentVariants = {
  initial: {
	opacity: 0,
  },
  animate: {
	opacity: 1,
	transition: {
	  duration: 0.8,
	  delay: 0.5, // Muncul setelah halaman pembuka mulai hilang
	},
  },
};

export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	<>
		<motion.div
			className='grid grid-cols-1 gap-10'
			variants={mainContentVariants}
			initial="initial"
			animate="animate"
		>
			<div>
				{children}
			</div>
		</motion.div>
	</>
  );
}

