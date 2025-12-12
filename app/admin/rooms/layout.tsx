import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
	<>
    <div className="container mx-auto py-5">
      <ToggleGroup type="multiple" variant="outline">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Link href="/admin/rooms/rooms">Rooms</Link>
        </ToggleGroupItem>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Link href="/admin/rooms/room-types">Room-Types</Link>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
		{children}
	</>
  );
}
