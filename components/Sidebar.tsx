"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Home, Users, CalendarCheck, Settings, ScanLine, Wallet, FolderOpen, BookOpen } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Materi", icon: BookOpen, path: "/materi" }, // MENU BARU DI SINI
  { name: "Anggota", icon: Users, path: "/anggota" },
  { name: "Keuangan", icon: Wallet, path: "/keuangan" },
  { name: "E-Arsip", icon: FolderOpen, path: "/arsip" },
  { name: "Absensi", icon: CalendarCheck, path: "/absensi" },
  { name: "Scan QR", icon: ScanLine, path: "/scan" },
  { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState("anggota");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserRole(localStorage.getItem("userRole") || "anggota");
  }, []);

  const filteredMenu = menuItems.filter((item) => {
    if (!mounted && (item.name === "Keuangan" || item.name === "E-Arsip")) return false;
    if (mounted && userRole !== "admin" && (item.name === "Keuangan" || item.name === "E-Arsip")) return false;
    return true;
  });

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-border bg-white dark:bg-[#0f172a] shrink-0">
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <img src="/logo-ipm.png" alt="Logo IPM" className="w-10 h-10 object-contain" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">IPM</h2>
          <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Manajemen</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium", isActive ? "bg-primary/10 text-primary dark:bg-primary/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white")}>
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}