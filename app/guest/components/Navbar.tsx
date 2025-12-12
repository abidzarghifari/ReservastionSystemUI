'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext } from "react";
import { useState, useEffect } from "react";
import { TfiThemifyLogo } from "react-icons/tfi";
import { CiBoxList } from "react-icons/ci";
import Link from "next/link";
import {NavigationMenu,NavigationMenuList,} from "@/components/ui/navigation-menu"
import { LogoutButton } from "./logoutButton";
import { mainContentVariants } from "@/app/components/ContentVariant";
import { motion } from 'framer-motion';
import { AuthStateContext } from "@/app/components/AuthContex";


export default function Navbar(){

  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    
    const handleScroll = () => {
      
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };

  }, []);
  
  const {authState} = useContext(AuthStateContext);

	return (
		<>
      <motion.div
          variants={mainContentVariants}
          initial="initial"
          animate="animate"
        >
          <NavigationMenu 
            className={`rounded-full max-w-2xl md:max-w-4xl mx-auto py-0 px-4 md:py-1 md:px-6 transition-colors duration-300 ${isScrolled ? 'backdrop-blur-xl backdrop-grayscale bg-rose-400/60 shadow-lg' : 'bg-transparent'}`}
          >
                <TfiThemifyLogo size={50}/>
                <div className="hidden md:flex mx-auto">
                  <NavigationMenuList>
                    <Link className="rounded-full hover:bg-rose-300/30  p-2" href="/guest/home">Home</Link>
                    <Link className="rounded-full hover:bg-rose-300/30 p-2" href="/guest/reservations/willCome">Reservations</Link>
                    <Link className="rounded-full hover:bg-rose-300/30 p-2" href="/guest/findUs">Find Us</Link>
                  </NavigationMenuList>                  
                </div>
                <div className="hidden md:flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center rounded-full hover:bg-rose-300/30 p-1">
                      <CiBoxList size={30}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {
                        authState.loading ? (
                            <div>Memeriksa sesi...</div>
                        ): authState.authStatus === 'user' ? (
                          <>
                            <DropdownMenuItem>
                              <Link href="/guest/account">My Account</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <LogoutButton />
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem>
                              <Link href="/auth/guest/login">LogIn</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/auth/guest/register">SignUp</Link>
                            </DropdownMenuItem>
                          </>
                        )

                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="md:hidden ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center rounded-full hover:bg-rose-300 p-1"><CiBoxList size={20}/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem><Link href="/guest/home">Home</Link></DropdownMenuItem>
                      <DropdownMenuItem><Link href="/guest/reservations">Reservations</Link></DropdownMenuItem>  
                      <DropdownMenuItem><Link href="/guest/findUs">Find Us</Link></DropdownMenuItem>  
                      <DropdownMenuSeparator />
                      {
                        authState.loading ? (
                            <div>Memeriksa sesi...</div>
                        ): authState.authStatus === 'user' ? (
                          <>
                            <DropdownMenuItem>
                              <Link href="/guest/account">My Account</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <LogoutButton />
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem>
                              <Link href="/auth/guest/login">LogIn</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/auth/guest/register">SignUp</Link>
                            </DropdownMenuItem>
                          </>
                        )
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>                 
                </div>
                
          </NavigationMenu>
      </motion.div>
		</>
	);
}