'use client'

import { motion } from 'framer-motion';
import { mainContentVariants } from '@/app/components/ContentVariant';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
	<div className='relative'>
		<motion.div
			className=''
			variants={mainContentVariants}
			initial="initial"
			animate="animate"
		>
			{children}
		</motion.div>
	</div>
  )
}