"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ToastHandler() {
  
  useEffect(() => {
    // Ambil data toast dari localStorage
    const toastDataString = localStorage.getItem('toastOnLoad');
    
    if (toastDataString) {
      try {
        // Parse data
        const toastData = JSON.parse(toastDataString);
        
        // Tampilkan toast
        toast.success(toastData.title, {
          description: toastData.description,
        });

      } catch (e) {
        console.error("Gagal menampilkan toast dari localStorage:", e);
      } finally {
        // PENTING: Hapus item agar tidak muncul lagi saat di-refresh
        localStorage.removeItem('toastOnLoad');
      }
    }
  }, []); // [] = Jalankan hanya sekali saat komponen dimuat

  return null;//tidak merender apapun
}