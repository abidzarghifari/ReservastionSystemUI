'use client';

import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import api from "@/lib/api";
import { RiLogoutCircleFill } from "react-icons/ri";
import { SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
	try {
	  const response = await api.post('web/logoutadmin');

		const toastData = {
		title: "Logout Berhasil!",
	  };

	  try {
		localStorage.setItem('toastOnLoad', JSON.stringify(toastData));
	  } catch (e) {
		console.warn("Gagal menyimpan toast ke localStorage:", e);
	  }      
	  
	  router.push('/');

	  router.refresh(); 

	} catch (error) {
	  console.error("Error logging out:", error);

	  toast.error("Logout Gagal", {
			  description: (error as Error).message || 'Gagal terhubung ke server.',
	  });
	}
  };

  
  return (

        <SidebarMenuButton onClick={handleLogout} asChild>
            <Link href="">
                <RiLogoutCircleFill/>
                <span>Logout</span>
        	</Link>
        </SidebarMenuButton>

  );
}