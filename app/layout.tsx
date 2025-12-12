import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AppInitializer from "./components/appInitializer";

export const metadata: Metadata = {
  title: "Azzahra Cabin House",
  description: "Penginapan Dieng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const noFlashScript = `
    (function() {
      try {
        // Langsung menambahkan kelas 'dark' tanpa pengecekan
        document.documentElement.classList.add('dark');
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
          {children}
        <Toaster />
        <AppInitializer />
      </body>
    </html>
  );
}
