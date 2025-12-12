'use client'

import { motion } from 'framer-motion';
import { mainContentVariants } from '@/app/components/ContentVariant';
import Link from 'next/link';

export default function Layout({
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
                        <div className="md:px-10">
                            <header className="hidden md:inline-block mb-8">
                                <h1 className="text-xl md:text-3xl">Your <strong>Reservation History</strong></h1>
                                <p className="mt-2">Lihat detail pemesanan Anda yang akan datang dan yang telah selesai.</p>
                            </header>
                            <header className="md:hidden mb-2">
                                <h1 className="text-xl md:text-3xl">Your<br /><strong>Reservation History</strong></h1>
                            </header>
            
                            <div className="border-b border-rose-950 mb-8">
                                <nav className="flex space-x-6">
                                    <Link href="/guest/reservations/willCome" className="tab-button py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors duration-300 active:text-white active:border-white"> Akan Datang </Link>
                                    <Link href="/guest/reservations/Past" className="tab-button py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors duration-300 active:text-white active:border-white"> Riwayat </Link>
                                </nav>
                            </div>
                            <main>
                              {children}        
                              <div className="flex justify-center mt-15">
                                    <span className="text-sm sm:text-center dark:text-rose-400">© 2025 <a href="https://flowbite.com/" className="hover:underline">Dikayoda</a>. All Rights Reserved.
                                    </span>
                              </div>
                            </main>
                        </div>
      </motion.div>
	</>
  );
}
