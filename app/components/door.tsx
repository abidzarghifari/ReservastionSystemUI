'use client';

import { Button } from "@/components/ui/button"
import { TfiThemifyLogo } from "react-icons/tfi";
import { TfiAngleDoubleUp } from "react-icons/tfi";
import AttentionComponent from "./attentioncomponent";
import { motion } from 'framer-motion';
import { mainContentVariants } from "./ContentVariant";

// Varian untuk animasi keluar dari halaman pembuka
export const openerVariants = {
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Door({ onOpen }) {
    return (
          <motion.div
               className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
               variants={openerVariants}
               exit="exit" // Tentukan animasi 'exit'
               
               // Logika untuk Pemicu Geser/Drag ke Atas
               drag="y"
               dragConstraints={{ top: 0, bottom: 0 }} // Hanya bisa digeser di sumbu y
               onDragEnd={(event, info) => {
                    // Jika pengguna menggeser ke atas sejauh 100px atau lebih
                    if (info.offset.y < -100) {
                         onOpen();
                    }
               }}
               style={{ backgroundImage: "url('/bgcabin4.webp')" }}
          >
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
 
             <motion.div className="absolute top-7 left-7 md:left-15 text-5xl lg:text-7xl text-white"
                variants={mainContentVariants}
                initial="initial"
                animate="animate">
               <TfiThemifyLogo/>
             </motion.div>

             <div className="absolute bottom-1/4 md:bottom-1/3 z-20 text-white p-5 text-left md:text-center">
                <motion.h1 className="text-4xl md:text-4xl lg:text-5xl font-bold"
                variants={mainContentVariants}
                initial="initial"
                animate="animate">Temukan Kehangatan di Azzahra Cabin House</motion.h1>
                <motion.p
                variants={mainContentVariants}
                          initial="initial"
                          animate="animate">find thewarmest in azzahra cabin house</motion.p>
             </div>
               
             <motion.div className="absolute bottom-1/18 md:bottom-1/10" variants={mainContentVariants} initial="initial" animate="animate">
               <AttentionComponent>
                    <Button
                         onClick={onOpen} 
                         variant="ghost"
                         size = "icon-lg"
                         className="
                                   styles.floating
                                   animate-float
                                   hover:bg-rose-400
                                   text-white
                                   rounded-full
                                   text-5xl lg:text-7xl 
                                   "
                         >
                              <TfiAngleDoubleUp/>
                    </Button>
               </AttentionComponent>
             </motion.div>
          </motion.div>
     );
}
