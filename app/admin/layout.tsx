import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/app/admin/components/adminsidebar"
import { ToastHandler } from '../components/toastHandler';
import AuthStateProvider from "../components/AuthContex";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthStateProvider>
      <ToastHandler/>
      <SidebarProvider>
        <AdminSidebar/>
        <main className="w-full px-10 py-5">
          <SidebarTrigger></SidebarTrigger>
          {children}
        </main>
      </SidebarProvider>
      </AuthStateProvider>
    </>
  )
}