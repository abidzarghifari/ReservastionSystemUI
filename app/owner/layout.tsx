import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { OwnerSidebar} from "./components/ownersidebar"
import { ToastHandler } from '../components/toastHandler';
import AuthStateProvider from "../components/AuthContex";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <AuthStateProvider>
      <ToastHandler/>
      <SidebarProvider>
        <OwnerSidebar/>
        <main className="w-full px-10 py-5">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </AuthStateProvider>
    </>
  )
}