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
            
                {/* BAGIAN ATAS: STATS & TEXT */}
                <div className='max-w-7xl mx-auto md:px-6 py-10 md:py-10 lg:py-10 pb-0 md:pb-0 lg:pb-6'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        {/* Kiri: Teks & Penjelasan (Urutan ditukar di Desktop agar flow baca lebih enak: Kiri Teks -> Kanan Bukti/Stats) */}
                        <div className="flex flex-col gap-6 order-1">
                            <div className="flex items-center gap-3 text-rose-400">
                                <span className="h-[1px] w-10 bg-rose-400"></span>
                                <span className="text-sm font-medium tracking-widest uppercase">Tentang Kami</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-5xl lg:text-5xl font-medium leading-tight text-balance">
                                Kenyamanan Anda Adalah <span className="text-rose-400">Prioritas</span> Utama.
                            </h2>
                            
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-5/6">
                                Nikmati pengalaman menginap berkelas dengan harga yang tetap affordable. Kami memadukan keindahan alam Sikunir dengan fasilitas modern.
                            </p>

                            {/* List point kecil (Opsional) */}
                            <ul className="flex gap-6 mt-2 text-sm text-zinc-300 font-medium">
                                <li className="flex items-center gap-2">✓ Wi-Fi Kencang</li>
                                <li className="flex items-center gap-2">✓ Air Hangat</li>
                            </ul>
                        </div>

                        {/* Kanan: Grid Statistik */}
                        <div className="order-2">
                            <div className='grid grid-cols-2 gap-4'>
                                {[
                                    { num: "2.5k+", label: "Tamu Bahagia" },
                                    { num: "4.9", label: "Rating Google" },
                                    { num: "150+", label: "Review Asli" },
                                    { num: "24/7", label: "Layanan" }
                                ].map((stat, i) => (
                                    <div key={i} className={`
                                        flex flex-col justify-center items-center p-6 
                                        backdrop-blur-md bg-white/5 
                                        rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10
                                        ${i === 1 || i === 3 ? 'mt-8' : 'mb-8'} 
                                    `}> 
                                    {/* Logic margin diatas membuat efek 'staggered' / naik turun yang artistik */}
                                        <h1 className="font-medium text-3xl md:text-4xl text-rose-400 mb-1">{stat.num}</h1>
                                        <p className="text-xs text-zinc-400 uppercase tracking-wide">{stat.label}</p>
                                    </div>
                                ))}           
                            </div>
                        </div>
                    </div>
                </div>
		
		<div className="lg:max-w-6xl mx-auto lg:px-5 pb-20">
			<VillaCarousel data={data} />
		</div>	
		
		<div className="max-w-md mx-auto pb-20">
			<p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                Nikmati pengalaman menginap berkelas dengan harga yang tetap affordable. Kami memadukan keindahan alam Sikunir dengan fasilitas modern.
                        </p>
			<p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                Nikmati pengalaman menginap berkelas dengan harga yang tetap affordable. Kami memadukan keindahan alam Sikunir dengan fasilitas modern.
                        </p>


		</div>
                {/* BAGIAN BAWAH: CTA IMAGE */}
                <div className="relative w-full h-[500px] group overflow-hidden rounded-t-3xl">
                    <Image 
                        src="/bgcabin3.webp"
                        alt="Suasana Villa Malam Hari"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* Konten CTA */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                        <div className="max-w-2xl space-y-2">
                            <h3 className="text-2xl md:text-4xl font-medium text-white leading-tight">
                                Berikan hadiah liburan terbaik <br/>untuk keluarga Anda.
                            </h3>
                            <p className="text-zinc-300 text-xs md:text-sm max-w-lg mx-auto">
                                Akses mudah ke segala tempat wisata dengan suasana istirahat yang menenangkan. Jangan sampai kehabisan slot.
                            </p>
                            <Button className="rounded-full px-8 py-6 text-base font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30 transition-all mt-4">
                                Hubungi Kami
                            </Button>
                        </div>
                    </div>
                </div>
            
            
        </>
    );
}
