'use client';

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import api from "@/lib/api";

export function LogoutButton() {
  const router = useRouter();

  // 1. Buat fungsi handler untuk logout
  const handleLogout = async () => {
    try {
      const response = await api.post('web/logout');

	    const toastData = {
        title: "Logout Berhasil!",
      };

      //Simpan di localStorage
      try {
        localStorage.setItem('toastOnLoad', JSON.stringify(toastData));
      } catch (e) {
        console.warn("Gagal menyimpan toast ke localStorage:", e);
      }      
      
      router.push('/');

      // 4. (Opsional tapi direkomendasikan) 
      //    Refresh halaman untuk membersihkan cache sisi client
      router.refresh(); 

    } catch (error) {
      console.error("Error logging out:", error);
      // Anda bisa menampilkan notifikasi error di sini
      toast.error("Logout Gagal", {
              description: (error as Error).message || 'Gagal terhubung ke server.',
      });
    }
  };

  
  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
      Logout
    </DropdownMenuItem>
  );
}