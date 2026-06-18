"use client";

import { Users, CalendarCheck, TrendingUp, ChevronRight, ScanLine, FileText, Megaphone, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name.split(" ")[0]); // Ambil nama panggilan depannya saja
  }, []);

  // Animasi berantai untuk list
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6 pb-6 max-w-5xl mx-auto">
      
      {/* 1. Header Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-navy rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary/40 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-slate-300 mb-1 text-sm md:text-base">Assalamu'alaikum,</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Ipmawan {userName}! 👋</h1>
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Sistem berjalan normal hari ini</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Menu Cepat (Quick Actions ala App) */}
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {[
          { name: "Scan QR", icon: ScanLine, color: "bg-blue-500", path: "/scan" },
          { name: "Anggota", icon: Users, color: "bg-primary", path: "/anggota" },
          { name: "Agenda", icon: CalendarCheck, color: "bg-emerald-500", path: "/absensi" },
          { name: "Info", icon: Megaphone, color: "bg-rose-500", path: "/absensi" },
        ].map((menu, i) => (
          <Link key={i} href={menu.path}>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${menu.color} flex items-center justify-center text-white shadow-lg shadow-slate-200 dark:shadow-none`}>
                <menu.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-foreground text-center">{menu.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* 3. Statistik (Cards) */}
      <h2 className="text-lg font-bold text-foreground mt-8 mb-4">Statistik Organisasi</h2>
      <motion.div 
        variants={containerVariants} initial="hidden" animate="show"
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        <motion.div variants={itemVariants} className="glass p-5 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-foreground">128</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Total Anggota Aktif</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass p-5 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
            <CalendarCheck className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold text-foreground">4</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Agenda Bulan Ini</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass p-5 rounded-2xl col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-bold text-foreground">85%</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Tingkat Kehadiran</p>
        </motion.div>
      </motion.div>

      {/* 4. Aktivitas Terakhir */}
      <h2 className="text-lg font-bold text-foreground mt-8 mb-4">Aktivitas Terakhir</h2>
      <div className="glass rounded-2xl overflow-hidden">
        {[
          { title: "Rapat Pleno Diadakan", time: "2 jam yang lalu", icon: FileText, color: "text-blue-500" },
          { title: "Anggota Baru Mendaftar", time: "Kemarin", icon: Users, color: "text-primary" },
          { title: "Pengumuman Diterbitkan", time: "3 hari yang lalu", icon: Megaphone, color: "text-rose-500" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-surface-hover transition-colors cursor-pointer">
            <div className={`p-2 bg-surface rounded-lg border border-border shadow-sm ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>

    </div>
  );
}