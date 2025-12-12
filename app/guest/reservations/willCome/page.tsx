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
                 
                    className="mb-3 rounded-3xl bg-cover bg-center overflow-hidden relative" 
                    
                    variants={openUpVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                 
                    style={{ 
                        backgroundImage: `url('${baseUrl}/storage/${reservation.room?.roomtype?.media_path}')` 
                    }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-5 p-2 rounded-3xl shadow-md w-full backdrop-blur-3xl backdrop-grayscale bg-black/40">
                        
                        <img 
                            className="sm:col-span-2 rounded-2xl h-48 w-full object-cover object-center" 
                            src={`${baseUrl}/storage/${reservation.room?.roomtype?.media_path}`} 
                            alt={reservation.room?.roomtype?.name || "Foto Ruangan"} 
                        />
                        
                        <div className="sm:col-span-3 p-4 h-full flex flex-col justify-between text-white">
                            <div className="flex justify-end">
                                <p className="px-5 py-2 bg-rose-700 text-white text-sm font-semibold rounded-lg hover:bg-rose-600 transition-colors shadow-lg">
                                    {reservation.status}
                                </p>
                            </div>
                            
                            <div>
                                <h2 className="text-lg md:text-xl font-bold">
                                    {reservation.room?.roomtype?.name}
                                </h2>
                                <p className="mt-1 text-base md:text-lg font-medium opacity-90">
                                    {reservation.checkin_date} - {reservation.checkout_date}
                                </p>
                                <p className="mt-1 text-xs opacity-75 font-mono">
                                    {reservation.invoice_code}
                                </p>
                            </div>

                            <div className="mt-4 sm:mt-0 flex justify-end gap-2">
                                <button onClick={() => {
                                            setOpenPay(true); 
                                            setSnapToken(reservation.snap_token);
                                        }} 
                                        className="px-5 py-2 bg-rose-700 text-white text-sm font-semibold rounded-lg hover:bg-rose-600 transition-colors shadow-lg">
                                    Pay
                                </button>
                                <a 
                                    href="#" 
                                    className="px-5 py-2 bg-rose-700 text-white text-sm font-semibold rounded-lg hover:bg-rose-600 transition-colors shadow-lg"
                                >
                                    Lihat Detail
                                </a>
                            </div>
                        </div>
                    </div>    
                </motion.div>
            ))}
            
		</>
	);
}

