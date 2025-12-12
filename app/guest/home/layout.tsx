'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mainContentVariants } from '@/app/components/ContentVariant';

export default function HomeLayout({
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
