"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { Users, BookOpen, CalendarCheck, Megaphone, LogOut, LayoutDashboard, Settings, User } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Ngecek apakah user beneran udah login
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login"); // Kalau belum login, tendang ke luar
      } else {
        setEmail(session.user.email || "");
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  // Fungsi Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* 1. SIDEBAR KIRI (NAVIGASI UTAMA) */}
      <aside className="w-64 bg-[#1E293B] text-white hidden md:flex flex-col shadow-2xl relative z-20">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <BookOpen className="w-8 h-8" />
            <h1 className="font-bold text-2xl tracking-wider">IPM APP</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 bg-[#D4AF37] text-[#1E293B] px-4 py-3.5 rounded-xl font-bold transition-all shadow-md">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <Users className="w-5 h-5" /> Data Anggota
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <BookOpen className="w-5 h-5" /> Materi & Jurnal
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <CalendarCheck className="w-5 h-5" /> Absensi
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <Settings className="w-5 h-5" /> Pengaturan Sistem
          </a>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-3.5 rounded-xl font-bold transition-all w-full"
          >
            <LogOut className="w-5 h-5" /> Keluar Akun
          </button>
        </div>
      </aside>

      {/* 2. KONTEN UTAMA KANAN */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Topbar / Header Atas */}
        <header className="bg-white shadow-sm border-b border-[#E2E8F0] p-4 md:px-8 flex justify-between items-center relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B]">Dashboard Manajemen</h2>
          <div className="flex items-center gap-3 bg-[#F8FAFC] py-2 px-4 rounded-full border border-[#CBD5E1] shadow-sm">
            <User className="w-5 h-5 text-[#94A3B8]" />
            <span className="text-sm font-bold text-[#334155]">{email}</span>
            <span className="bg-[#D4AF37] text-[#1E293B] text-xs font-bold px-2 py-1 rounded-md ml-2">ADMIN</span>
          </div>
        </header>

        {/* Isi Dashboard (Bisa di-scroll) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* Banner Ucapan Selamat Datang */}
          <div className="bg-[#1E293B] rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-5%] w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-5%] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            <h3 className="text-3xl font-bold mb-3 relative z-10 tracking-tight">Assalamu'alaikum, Admin!</h3>
            <p className="text-[#94A3B8] relative z-10 text-lg">
              Selamat datang di pusat kendali Sistem Informasi Manajemen IPM. 
            </p>
          </div>

          {/* Kartu Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex items-center gap-5 hover:shadow-md transition-shadow hover:border-[#D4AF37]/50">
              <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-bold">Total Anggota</p>
                <p className="text-3xl font-black text-[#1E293B]">124</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex items-center gap-5 hover:shadow-md transition-shadow hover:border-[#D4AF37]/50">
              <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-bold">Total Materi</p>
                <p className="text-3xl font-black text-[#1E293B]">38</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex items-center gap-5 hover:shadow-md transition-shadow hover:border-[#D4AF37]/50">
              <div className="bg-purple-50 p-4 rounded-xl text-purple-600">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-bold">Tingkat Absensi</p>
                <p className="text-3xl font-black text-[#1E293B]">92%</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex items-center gap-5 hover:shadow-md transition-shadow hover:border-[#D4AF37]/50">
              <div className="bg-amber-50 p-4 rounded-xl text-amber-600">
                <Megaphone className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-bold">Pengumuman</p>
                <p className="text-3xl font-black text-[#1E293B]">5</p>
              </div>
            </div>
          </div>

          {/* Tabel / Aktivitas Terbaru */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h4 className="text-lg font-bold text-[#1E293B]">Aktivitas Sistem Terbaru</h4>
            </div>
            <div className="p-12 flex flex-col items-center justify-center text-[#94A3B8]">
              <LayoutDashboard className="w-16 h-16 mb-4 opacity-30 text-[#D4AF37]" />
              <p className="font-medium">Belum ada data aktivitas. Sistem siap digunakan.</p>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}