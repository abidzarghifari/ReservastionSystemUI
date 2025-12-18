import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { MdBedroomChild } from "react-icons/md";
import { MdAssessment } from 'react-icons/md';
import { IoPeople } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutCircleFill } from "react-icons/ri";
import { LogoutButton } from "./logoutButton";
import { AlertWithActions } from "../../components/alertWithActions";
// Menu items.
const items = [
  {
    title: "Report",
    url: "/admin/report",
    icon: <MdAssessment />,
  },
  {
    title: "Rooms",
    url: "/admin/rooms/rooms",
    icon: <MdBedroomChild />,
  },
  {
    title: "Guests",
    url: "/admin/guests",
    icon: <IoPeople />,
  },
  {
    title: "Reservations",
    url: "/admin/reservations",
    icon: <FaAddressBook />,
  },
  {
    title: "Account",
    url: "/admin/account",
    icon: <MdAccountCircle />,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Azzahra Cabin House</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key="logout">
                  <LogoutButton/>                 
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
              <AlertWithActions/>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}