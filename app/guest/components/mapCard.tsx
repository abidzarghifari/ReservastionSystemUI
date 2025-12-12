'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export default function MapCard(){
	return (
		<>
	  <motion.div
			variants={mainContentVariants}
			initial="initial"
			animate="animate"
		  >
			<Card className="p-3 rounded-4xl">
			  <CardDescription className="pt-2 ps-3">Get our map here!</CardDescription>
			  <CardContent className="p-0">
					<iframe 
					className="w-full rounded-3xl" 
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0249432786163!2d109.91856427393044!3d-7.237993971086088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e700d004877f2b1%3A0x10894bfdeca93bce!2sAzzahra%20cabin%20house!5e0!3m2!1sid!2sid!4v1752133311037!5m2!1sid!2sid" 
					width="600" 
					height="450" 
					style={{ border: 0 }} // Perbaikan: Menggunakan objek JavaScript
					allowFullScreen // Perbaikan: Atribut boolean cukup ditulis namanya saja
					loading="lazy" 
					referrerPolicy="no-referrer-when-downgrade"
					>
					</iframe>
			  </CardContent>
			</Card>
	  </motion.div>
	</>
	);
}