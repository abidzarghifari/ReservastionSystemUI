"use client"

import { useState } from "react"
import { Info, X } from "lucide-react" // Ikon pengganti SVG
import { Button } from "@/components/ui/button" // Komponen Button Shadcn

export function AlertWithActions() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div 
      role="alert" 
      className="p-4 mb-4 text-sm text-blue-200 rounded-lg bg-secondary border"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <h3 className="font-medium">Beta version</h3>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-800 hover:bg-blue-100 hover:text-blue-900"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="mt-2 mb-4">
        Cek ombak dulu 🌊,aplikasi ini masih  versi Beta buatan saya. 
        Ada kritik, saran, <em>issue</em> atau mau <em>collab</em>? Gas langsung ke <strong className="font-bold">dikayoda450@gmail.com</strong> atau klik <a href="mailto:dikayoda450@gmail.com" className="underline">di sini</a>. <em>Enjoy!</em>
      </div>

      {/** 
      <div className="flex">
        <Button 
            size="sm" 
            className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          Turn off now
        </Button>
        
      </div>*/}

    </div>
  )
}
