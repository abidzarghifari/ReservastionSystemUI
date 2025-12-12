import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  limit?: number; // Batas karakter sebelum dipotong
}

export const ExpandableText = ({ text, limit = 50 }: ExpandableTextProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Jika text null atau pendek, tampilkan langsung tanpa fitur collapse
  if (!text || text.length <= limit) {
    return <span>{text}</span>;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-1">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm whitespace-normal break-words">
          {/* Jika tertutup, tampilkan text yang dipotong. Jika terbuka, tampilkan text full */}
          {isOpen ? text : `${text.substring(0, limit)}...`}
        </span>
        
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* Opsi Tambahan: 
         Jika Anda ingin sisa teksnya muncul di bawah (bukan menggantikan teks di atas),
         Anda bisa memindahkan logika substring ke atas dan sisa teks ke sini.
         Tapi cara di atas (replace) biasanya lebih rapi untuk tabel.
      */}
    </Collapsible>
  );
};