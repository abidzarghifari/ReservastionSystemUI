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

export default function LocCard({ className, backgroundImage, title, description, footer }){ //saya ingin menambahkan props agar dapat menerima className, background image, title, deskripsi, dan footer
	// Opsi: Berikan nilai default jika props tidak dikirim
  const bgImage = backgroundImage || "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070";
  // Varian untuk animasi masuk dari konten utama
  const clsName = className || "flex-grow flex-1 hover:flex-grow-[5] transition-all duration-500 relative rounded-sm bg-border p-4 h-full bg-bottom bg-cover group";

  const titlecontents = title || "title";
  const descriptioncontents = description || "description";
  const footercontents = footer || "footer";

  const mainContentVariants = {
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

  return (
		<>
      <motion.div className={`${clsName}`}
            style={{ backgroundImage: `url('${bgImage}')` }}
            variants={mainContentVariants}
            initial="initial"
            animate="animate"
          >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md"></div>
                <div className="hidden group-hover:flex h-full items-baseline-last">
                    <div>
                      <p className="text-s">{titlecontents}</p>
                      <p className="text-xs">{descriptioncontents}</p>
                      <p className="text-xs">{footercontents}</p>
                    </div>
                </div>
      </motion.div>
    </>
	);
}