'use client'

import { motion } from 'framer-motion';
import { openUpVariants } from '@/app/components/ContentVariant';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';

export default function Page(){

    const [isLoadingReservation,setLoadingReservation] =  useState(true);
    const [reservations, setReservations] = useState([]);
    const [openPay, setOpenPay] = useState(false);
    const [snapToken, setSnapToken] = useState('');

    useEffect(() => {
            const fetchReservation = async () => {
                try {

                    const response = await api.get(`/web/getreservationsbyguest`); 
                    setReservations(response.data.data || response.data);
                
                } catch (error) {
          
                    console.error("Gagal memuat Reservations", error);
                    toast.error("Gagal memuat Reservations");
          
                } finally {
          
                    setLoadingReservation(false);
          
                }
            };    
            fetchReservation();

    }, []);

    useEffect(() => {
            
            if (!openPay || !snapToken) {
                    setOpenPay(false);
                    setSnapToken('');
                    return;
            }

            const Pay = async () => {
                try {

                    if (window.snap) {
                        window.snap.pay(snapToken, {
                            onSuccess: () => {
                                toast.success('Payment Success!');
                            },
                            onPending: () => {
                                toast.info('Payment Pending!');
                            },
                            onError: () => {
                                toast.error('Payment Error!');
                            },
                            onClose: () => {
                                toast.warning('Customer closed the popup without finishing the payment!');
                            },
                        });
                    }
                
                } catch (error) {
                    toast.error("Payment Failed");
                } finally {

                    setOpenPay(false);
                    setSnapToken('');
                }
            };

            Pay();    

    }, [openPay,snapToken]);

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
		<>
{reservations.map((reservation) => (
    <motion.div
        key={reservation.id}
        variants={openUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mb-3 w-full px-1"
    >
        {/* CONTAINER UTAMA: TIKET FISIK */}
        {/* h-auto di mobile, h-20(144px) Fixed di desktop agar proporsional seperti tiket asli */}
        <div className="group flex flex-col sm:flex-row md:h-50 w-full bg-rose-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative">
            
            {/* 1. GAMBAR (Sisi Kiri - Clean) */}
            {/* Width 48 (192px), Height Full mengikuti container */}
            <div className="relative w-full sm:w-48 h-40 sm:h-full flex-shrink-0 bg-stone-100">
                <img 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    src={`${baseUrl}/storage/${reservation.room?.roomtype?.media_path}`} 
                    alt={reservation.room?.roomtype?.name} 
                />
                
                {/* ICON PERINGATAN (Overlay Pojok Kanan Bawah Gambar) */}
                {/* Hanya ikon saja, tanpa teks, agar gambar tidak tertutup tulisan */}
                <div className="absolute bottom-2 right-2 z-20">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border shadow-sm
                        ${reservation.status === 'PAID' ? 'bg-blue-500 text-white' : 'bg-rose-500 text-white'}`}>
                        
                        {reservation.status === 'PAID' ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <span className="text-sm font-black">!</span> // Tanda Seru Tebal
                        )}
                    </div>
                </div>
            </div>

            {/* 2. KONTEN TENGAH (Info & Status Teks) */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                
                {/* Header: Nama Ruangan & Invoice */}
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                            #{reservation.invoice_code}
                        </p>
                    </div>
                    <h2 className="text-xl font-bold text-stone-800 font-serif leading-tight line-clamp-2">
                        {reservation.room?.roomtype?.name}
                    </h2>
                </div>

                {/* Status Teks (DI SINI, BUKAN DI GAMBAR) */}
                <div className="mt-2">
                     <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border
                        ${reservation.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          reservation.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                          'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        Status: {reservation.status}
                    </span>
                </div>
            </div>

            {/* 3. PEMISAH TIKET (PERFORATED LINE) */}
            {/* Ini membuat efek sobekan tiket nyata */}
            <div className="relative hidden sm:flex flex-col items-center">
                <div className="absolute -top-3 w-5 h-5 rounded-full bg-black border-b border-stone-200 z-10"></div> {/* "Lubang" Atas (Pastikan warna bg sama dengan background halamannya, misal gray-50) */}
                <div className="h-full border-l-2 border-dashed border-gray-500"></div> {/* Garis Putus2 */}
                <div className="absolute -bottom-3 w-5 h-5 rounded-full bg-black border-t border-stone-200 z-10"></div> {/* "Lubang" Bawah */}
            </div>

            {/* 4. STUB KANAN (Tanggal & Tombol) */}
            {/* Background sedikit berbeda (stone-50) untuk membedakan potongan tiket */}
            <div className="sm:w-56 bg-stone-50 p-4 sm:p-5 flex flex-col justify-between border-t sm:border-t-0 border-dashed border-stone-200">
                
                {/* Info Tanggal */}
                <div className="flex flex-col gap-1 text-xs text-stone-600">
                    <div className="flex justify-between">
                        <span className="text-stone-400 font-medium">Check-in</span>
                        <span className="font-bold font-mono">{reservation.checkin_date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-stone-400 font-medium">Check-out</span>
                        <span className="font-bold font-mono">{reservation.checkout_date}</span>
                    </div>
                </div>

                {/* Tombol */}
                <div className="flex items-center justify-end gap-2 mt-3 sm:mt-0">
                     <a href="#" className="text-[10px] font-bold text-stone-400 hover:text-stone-600 uppercase tracking-wide">
                        Detail
                    </a>
                    <button 
                        onClick={() => {
                            setOpenPay(true); 
                            setSnapToken(reservation.snap_token);
                        }} 
                        className="px-5 py-2 bg-rose-700 text-white text-xs font-bold uppercase tracking-wide rounded shadow-sm hover:bg-rose-800 hover:shadow-md transition-all active:scale-95"
                    >
                        Pay Now
                    </button>
                </div>
            </div>

        </div>    
    </motion.div>
))}        
		</>
	);
}

