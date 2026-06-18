"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Users, CalendarCheck, ScanLine, Settings, Wallet, FolderOpen, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Materi", icon: BookOpen, path: "/materi" }, // MENU BARU
  { name: "Keuangan", icon: Wallet, path: "/keuangan" },
  { name: "Arsip", icon: FolderOpen, path: "/arsip" },
  { name: "Anggota", icon: Users, path: "/anggota" },
  { name: "Scan", icon: ScanLine, path: "/scan" },
  { name: "Agenda", icon: CalendarCheck, path: "/absensi" },
  { name: "Akun", icon: Settings, path: "/pengaturan" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState("anggota");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserRole(localStorage.getItem("userRole") || "anggota");
  }, []);

  const filteredNav = navItems.filter((item) => {
    if (!mounted && (item.name === "Keuangan" || item.name === "Arsip")) return false;
    if (mounted && userRole !== "admin" && (item.name === "Keuangan" || item.name === "Arsip")) return false;
    return true;
  });

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass z-50 border-t border-border pb-safe">
      <div className="flex items-center overflow-x-auto no-scrollbar px-2 py-3 gap-1">
        {filteredNav.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path} className="relative flex flex-col items-center justify-center min-w-[4.5rem] gap-1 shrink-0">
              {isActive && <span className="absolute -top-3 w-8 h-1 bg-primary rounded-b-full shadow-[0_0_8px_rgba(217,119,6,0.8)]" />}
              <Icon className={cn("w-6 h-6 transition-all duration-300", isActive ? "text-primary scale-110" : "text-slate-500 dark:text-slate-400")} />
              <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-primary" : "text-slate-500 dark:text-slate-400")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}