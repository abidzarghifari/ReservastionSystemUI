import LocCard from "./locCard";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { cookies } from 'next/headers';
import { RoomTypes } from "@/app/admin/rooms/room-types/columns";
import VillaCarousel from "../components/villaCarousel";
import Image from "next/image";

// Function ini berjalan di SERVER
async function getData(): Promise<RoomTypes[]> {
  const cookieStore = await cookies(); // await cookies() diperlukan di Next.js terbaru
  const headers = {
    Cookie: cookieStore.toString()
  };
  
  try {
    const response = await api.get('web/getallroomtypes',{
      headers: headers,
    });
    // Pastikan struktur response benar
    return response.data.data || response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

// Page Component berjalan di SERVER (async)
export default async function Page(){
    const data = await getData()

    return (
        <>
            {/* SECTION 1: HERO / INTRO */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                <div className='hidden md:block p-5 text-gray-200'>
                    <h1 className="md:text-l lg:text-xl">(01)</h1>
                    <h1 className="md:text-l lg:text-xl">About Us</h1>
                    {/* Saya perbaiki sedikit grammar bahasa Inggrisnya */}
                    <h1 className="md:text-xl lg:text-4xl">
                        <strong>We</strong> treat you to an <strong>unforgettable</strong> stay. 
                        We blend central <strong>convenience</strong> with <strong>peaceful</strong> tranquility.
                    </h1>
                    <div className='mt-15 justify-self-end'>
                        <Button className="rounded-full bg-transparent border-gray-300 border-1 text-gray-200 hover:bg-rose-400 hover:border-transparent hover:text-black">
                            Explore
                        </Button> 
                    </div>
                </div>
                <div className='md:hidden p-1'>
                    <h2 className='text-3xl'>About <strong>Us</strong></h2>
                </div>
                <div className="hidden md:flex md:p-5 items-center gap-1">
                    <LocCard backgroundImage={"/room2. Jawa Tengah"} title={"warm room"} description={"most pampering service for you"} footer={" "} className="flex-1 flex-grow-[5] hover:flex-grow-[6] transition-all duration-500 relative rounded-xl bg-border p-4 h-full bg-bottom bg-cover group" title="Dieng" description="Best view point"/>
                    <LocCard backgroundImage={"/telaga.jpeg"} title={"Cebong Lake"} description={"morning that starts with a warm cup of coffee, on the edge of a lake"} footer={"1 minute walk"} className="flex-1 hover:flex-grow-[5] transition-all duration-500 relative rounded-xl bg-border p-4 h-full bg-bottom bg-cover group"/>
                    <LocCard backgroundImage={"/sikunir.jpeg"} title={"Sikunir Hill"} description={"the best sunrises in Southeast Asia."} footer={"8 minute walk"} className="flex-1 hover:flex-grow-[5] transition-all duration-500 relative rounded-xl bg-border p-4 h-full bg-bottom bg-cover group"/>
                    <LocCard backgroundImage={"/desadieng.jpeg"} title={"Dieng village in the morning"} description={"Morning begins with a painting of mist, and a shy, warming sun."} footer={"just take a walk"} className="flex-1 hover:flex-grow-[5] transition-all duration-500 relative rounded-xl bg-border p-4 h-full bg-bottom bg-cover group"/>
                </div>
            </div>

            {/* SECTION 2: CAROUSEL (Client Component disisipkan disini) 
            <div className="bg-card mt-20 flex flex-col md:flex-row rounded-4xl lg:mx-5">
                
            </div>*/}
            <VillaCarousel data={data} />

            {/* SECTION 3: STATS & FOOTER */}
            <div className="bg-card rounded-4xl mt-10 p-5 lg:mx-5">
                <div className='grid grid-cols-2 max-w-6xl mx-auto py-8 md:py-10 lg:py-20 text-white'>
                        <div className="flex items-center justify-end">
                            <div className='grid grid-cols-2 gap-2 rounded-3xl p-5 w-full md:w-1/2'>
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="justify-items-center p-3 backdrop-blur-2xl backdrop-grayscale bg-rose-50/15 rounded-2xl">
                                        <h1 className="font-bold text-xl">150+</h1>
                                        <p className="text-sm">Reviews</p>
                                    </div>
                                ))}           
                            </div>
                        </div>
                        <div className="grid items-center p-5 md:w-1/2">
                            <h1 className="text-sm md:text-sm lg:text-lg">#about us</h1>
                            <h1 className="text-sm md:text-lg lg:text-xl"><strong>We prioritize your comfort above all else.</strong></h1>
                            <span className="text-xs md:text-sm text-gray-400">Experience luxury living with affordable pricing.</span>
                        </div>
                        
                </div>
                <div className="relative rounded-4xl bg-bottom p-10 pt-50 lg:pt-70 overflow-hidden">
                    <Image 
                        src="/bgcabin3.webp"
                        alt="Background"
                        fill
                        className="object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    <div className="relative z-20 backdrop-blur-3xl backdrop-grayscale bg-black/20 w-full md:w-1/2 mx-auto p-8 rounded-3xl text-center">
                        <p className="text-white text-sm md:text-base">Treat your family to an unforgettable stay. Located centrally yet peacefully.</p>
                        <Button className="rounded-full mt-5 text-white bg-rose-400 hover:bg-rose-500 hover:text-white">Contact Us</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-15">
					<span className="text-sm sm:text-center dark:text-rose-400">© 2025 <a href="https://flowbite.com/" className="hover:underline">Dikayoda</a>. All Rights Reserved.
					</span>
			</div>
        </>
    );
}