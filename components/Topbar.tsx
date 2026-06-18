"use client";

import { Bell, User, LogOut, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Topbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah error hydration Next.js pada system theme
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("userRole"); 
    localStorage.removeItem("userName"); 
    router.push("/login");
  };

  return (
    <header className="glass sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 border-b border-border">
      {/* Di HP Muncul Logo Singkat, Di PC Kosong (karena logo udah di sidebar) */}
      <div className="flex items-center md:hidden gap-2">
        <img src="/logo-ipm.png" alt="Logo" className="w-8 h-8 object-contain" />
        <h1 className="text-lg font-bold text-foreground">IPM System</h1>
      </div>

      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-foreground">Sistem Informasi Manajemen</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Ikatan Pelajar Muhammadiyah SMK Muhammadiyah Belik</p>
      </div>
      
      <div className="flex items-center gap-3 md:gap-4 ml-auto">
        {/* Tombol Ganti Tema (Dark/Light) */}
        {mounted && (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-surface-hover text-foreground hover:text-primary transition-colors"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}

        {/* Notifikasi */}
        <button className="p-2 rounded-full bg-surface-hover text-foreground relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface"></span>
        </button>

        {/* Tombol Logout */}
        <button 
          onClick={handleLogout}
          className="p-2 md:px-4 md:py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
        >
          <LogOut className="w-5 h-5 md:w-4 md:h-4" />
          <span className="hidden md:inline text-sm font-semibold">Keluar</span>
        </button>
      </div>
    </header>
  );
}