"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Kalau halamannya login, jangan tampilkan Sidebar/Topbar, biarkan halamannya full screen.
  if (pathname === "/login") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-screen bg-background"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Tampilan "Dalam Aplikasi"
  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Kiri: Sidebar (Hanya muncul di Layar PC/Tablet) */}
      <Sidebar />
      
      {/* Kanan: Konten Utama */}
      <div className="flex-1 flex flex-col h-screen relative overflow-hidden">
        {/* Atas: Topbar */}
        <Topbar />
        
        {/* Tengah: Halaman yang sedang dibuka */}
        {/* pb-24 agar konten tidak tertutup BottomNav saat di-scroll di HP */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 md:p-8 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 20 }}   // Halaman masuk dari kanan
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}     // Halaman keluar ke kiri
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Bawah: Bottom Navigation (Hanya muncul di HP) */}
        <BottomNav />
      </div>
    </div>
  );
}