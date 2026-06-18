"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Moon, Sun, Bell, Lock, Info, LogOut, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

// Definisi Tipe Data agar TypeScript tidak error
interface SettingItem {
  icon: any;
  label: string;
  color: string;
  bg: string;
  action?: () => void;
  value?: string;
}

export default function PengaturanPage() {
  const [userName, setUserName] = useState("Loading...");
  const [userRole, setUserRole] = useState("Loading...");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setUserName(localStorage.getItem("userName") || "Nama Tidak Diketahui");
    setUserRole(localStorage.getItem("userRole") === "admin" ? "Admin Sistem" : "Anggota Biasa");
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("userRole"); 
    localStorage.removeItem("userName"); 
    router.push("/login");
  };

  // Explicit typing untuk menuGroups agar aman
  const menuGroups: { title: string; items: SettingItem[] }[] = [
    {
      title: "Akun Saya",
      items: [
        { icon: User, label: "Edit Profil", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
        { icon: Lock, label: "Ubah Password", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
      ]
    },
    {
      title: "Preferensi Aplikasi",
      items: [
        { icon: Bell, label: "Notifikasi", color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30" },
        { 
          icon: theme === "dark" ? Moon : Sun, 
          label: "Mode Gelap", 
          color: "text-amber-500", 
          bg: "bg-amber-100 dark:bg-amber-900/30",
          action: () => setTheme(theme === "dark" ? "light" : "dark"),
          value: theme === "dark" ? "Aktif" : "Mati"
        },
      ]
    },
    {
      title: "Lainnya",
      items: [
        { icon: Shield, label: "Kebijakan Privasi", color: "text-slate-500", bg: "bg-slate-200 dark:bg-slate-800" },
        { icon: Info, label: "Tentang Aplikasi", color: "text-slate-500", bg: "bg-slate-200 dark:bg-slate-800", value: "v1.0.0" },
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-10">
      <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>

      {/* Profil Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-[2rem] flex items-center gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-surface z-10">
          {userName.charAt(0)}
        </div>
        <div className="z-10">
          <h2 className="text-xl font-bold text-foreground">{userName}</h2>
          <div className="inline-flex items-center gap-1.5 mt-1 bg-surface-hover px-2.5 py-1 rounded-lg border border-border text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Shield className="w-3 h-3 text-primary" /> {userRole}
          </div>
        </div>
      </motion.div>

      {/* List Menu */}
      <div className="space-y-6">
        {menuGroups.map((group, idx) => (
          <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (idx + 1) }}>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 ml-2 uppercase tracking-wider">{group.title}</h3>
            <div className="glass rounded-2xl overflow-hidden">
              {group.items.map((item) => (
                <div 
                  key={item.label}
                  // Perbaikan: Gunakan opsional chaining ?. agar aman jika action tidak ada
                  onClick={() => item.action?.()}
                  className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}>
                      {mounted && <item.icon className={`w-5 h-5 ${item.color}`} />}
                    </div>
                    <span className="font-semibold text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {mounted && item.value && <span className="text-xs font-bold text-slate-400">{item.value}</span>}
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tombol Logout Raksasa */}
      <motion.button 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        onClick={handleLogout}
        className="w-full glass border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
      >
        <LogOut className="w-5 h-5" /> Keluar dari Akun
      </motion.button>
    </div>
  );
}