import { LogoutButton } from "./logoutButton";
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
import { MdAssessment } from 'react-icons/md';
import { IoPeople } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const items = [
  {
	  title: "Report",
	  url: "/owner/report",
	  icon: <MdAssessment />,
  },
  {
	  title: "Admins",
	  url: "/owner/admins",
	  icon: <IoPeople />,
  },
  {
	  title: "Account",
	  url: "/owner/account",
	  icon: <MdAccountCircle />,
  },
]

export function OwnerSidebar() {
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
	  </SidebarContent>
	</Sidebar>
  )
}