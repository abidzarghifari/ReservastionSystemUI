"use client"

import { BadgeCheckIcon, CheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Import type ini untuk TypeScript
} from "@/components/ui/carousel"
import Image from "next/image"
import { RoomTypes } from "@/app/admin/rooms/room-types/columns" // Pastikan import type benar
import BookingCard from "./bookingCard"

interface VillaCarouselProps {
  data: RoomTypes[]
}

export default function VillaCarousel({ data }: VillaCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    // Set state awal
    setCurrent(api.selectedScrollSnap())

    // Event listener saat slide berubah
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  if (!data || data.length === 0) return null

  // Helper untuk menangani nama properti (sesuaikan dengan response API Anda sebenarnya)
  // Misalnya API mengembalikan 'name' bukan 'title', sesuaikan disini
  const activeItem = data[current]
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const facilitiesConfig = [
    { key: 'ac', label: 'AC' },
    { key: 'tv', label: 'TV' },
    { key: 'wifi', label: 'WiFi' },
    { key: 'heater', label: 'Heater' },
    { key: 'free_breakfast', label: 'Breakfast' },
    { key: 'free_laundry', label: 'Laundry' },
  ];

  return (
    <div className="bg-rose-200 border border-rose-300 shadow-2xl mt-20 flex flex-col md:flex-row rounded-[2.5rem] lg:mx-5 overflow-hidden">
      
      {/* BAGIAN KIRI: CAROUSEL GAMBAR */}
      <div className="w-full md:w-1/2 lg:w-5/12 relative bg-gray-100">
        <Carousel setApi={setApi} className="w-full h-full">
          <CarouselContent className="h-[400px] md:h-[550px] ml-0"> 
            {/* Height diset fix agar layout stabil */}
            {data.map((item, index) => (
              <CarouselItem key={index} className="pl-0 w-full h-full">
                <div className="relative w-full h-full group">
                  <Image
                    src={item.media_path ? `${baseUrl}/storage/${item.media_path}` : "/placeholder.jpg"}
                    alt={item.name || "Room Image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay Gradient Halus */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Tombol Navigasi Custom */}
          <div className="absolute bottom-6 right-6 flex gap-2 z-20">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-none bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all" />
            <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-none bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all" />
          </div>
        </Carousel>
      </div>

      {/* BAGIAN KANAN: DESKRIPSI DINAMIS */}
      <div className="flex flex-col w-full md:w-1/2 lg:w-7/12 p-8 md:p-12 lg:p-16 justify-center">
        
        {/* Header Statis */}
        <div className="mb-6">
          <span className="inline-block py-1 px-3 rounded-full bg-rose-50 text-rose-600 text-xs font-bold tracking-widest uppercase mb-3">
              Unforgettable Stays
          </span>
          <h2 className="text-gray-700 font-medium text-lg lg:text-xl">
              Elegance in Every Room
          </h2>
        </div>

        {/* Konten Dinamis dengan Animasi Fade-In */}
        {/* Key ditambahkan di sini agar React me-render ulang animasi saat item berubah */}
        <div key={activeItem?.id || "default"} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
            
            {/* Nama Ruangan */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {activeItem?.name || "Room Name"}
            </h1>

            {/* Fasilitas (Badges) */}
            <div className="flex flex-wrap gap-3 mb-8">
              {facilitiesConfig.map((item) => {
                if (activeItem?.[item.key]) {
                    return (
                        <Badge
                          key={item.key}
                          variant="outline"
                          className="py-1.5 px-3 border-gray-200 text-gray-600 font-normal bg-gray-50/50 flex items-center gap-2 rounded-lg"
                        >
                          <BadgeCheckIcon className="w-4 h-4 text-rose-500"/>
                          {item.label}
                        </Badge>
                    );
                }
                return null;
              })}
            </div>

            {/* Deskripsi */}
            <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-10 border-l-4 border-rose-200">
              {activeItem?.deskription || "Experience the ultimate comfort in our carefully designed rooms, featuring modern amenities and breathtaking views."}
            </p>

            {/* Footer / CTA */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="flex-1">
                  <p className="text-sm text-gray-400">Harga mulai dari</p>
                  <p className="text-xl font-bold text-gray-600">IDR 500k<span className="text-sm font-normal text-gray-400">/malam</span></p>
              </div>
              <div className="flex-none">
                  <BookingCard content={"Book Now"} className="bg-gray-900 text-rose-600 px-8 py-6 rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-gray-200"> 
                  </BookingCard>
              </div>
            </div>

        </div>
      </div>
    </div>  

    
  )
}
