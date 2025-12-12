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
    <div className="bg-card mt-20 flex flex-col md:flex-row rounded-4xl lg:mx-5">
      {/* BAGIAN CAROUSEL */}
      <div className="w-full h-full md:w-2/5 p-5">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index} className="w-full h-full">
                  <Card className="overflow-hidden p-0 rounded-2xl w-full h-full">
                    <CardContent className="aspect-square p-0 relative w-full h-full overflow-hidden rounded-2xl border-0">
                      <Image
                        src={item.media_path ? `${baseUrl}/storage/${item.media_path}` : "/placeholder.jpg"}
                        alt={item.name || "Room Image"}
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                      {/**sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"*/}
                    </CardContent>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* BAGIAN DESKRIPSI DINAMIS */}
      <div className="flex flex-col w-full md:w-1/2 p-5 md:p-10 transition-all duration-500 ease-in-out">
        <div>
            <h2 className="text-base font-semibold text-rose-700">Unforgettable Stays</h2>

            <p className="mt-2 font-bold lg:text-3xl" id="carousel-title">
              Elegance in Every Room
            </p>

            <p className="mt-4 font-bold lg:text-xl transition-opacity text-gray-600 duration-300">
              {activeItem?.name || "Room Name"}
            </p>

            <p className="w-full text-sm lg:text-lg mt-2">
              {activeItem?.deskription || "No description available."}
            </p>
            
            <div className="max-w-1/2 flex flex-wrap gap-2 mt-4">
          
              {facilitiesConfig.map((item) => {
                if (activeItem?.[item.key]) {
                    return (
                        <Badge
                          key={item.key} // Wajib ada unique key saat mapping
                          variant="secondary"
                          className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600 flex items-center gap-1"
                        >
                          <BadgeCheckIcon/>
                          {item.label}
                        </Badge>
                    );
                }
                return null; // Jika false, jangan render apa-apa
              })}

            </div>
        </div>
        
        <div className="flex justify-end mt-auto">
          <BookingCard content={"Booking Now"}> </BookingCard>
        </div>
      </div>
    </div>
  )
}