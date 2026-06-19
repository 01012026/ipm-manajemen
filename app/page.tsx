"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { Users, BookOpen, CalendarCheck, Megaphone, LogOut, LayoutDashboard, Settings, User, Menu, X, QrCode } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setEmail(session.user.email || "");
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

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
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      
      {/* OVERLAY GELAP UNTUK HP KETIKA MENU DIBUKA */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 1. SIDEBAR KIRI (RESPONSIVE) */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-[#1E293B] text-white flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <BookOpen className="w-8 h-8" />
            <h1 className="font-bold text-xl tracking-wider">IPM APP</h1>
          </div>
          {/* Tombol Silang khusus di HP */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/" className="flex items-center gap-3 bg-[#D4AF37] text-[#1E293B] px-4 py-3.5 rounded-xl font-bold transition-all shadow-md">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <BookOpen className="w-5 h-5" /> Materi
          </Link>
          <Link href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <Users className="w-5 h-5" /> Anggota
          </Link>
          <Link href="/absensi" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <CalendarCheck className="w-5 h-5" /> Absensi
          </Link>
          {/* Fitur Scan QR Dikembalikan */}
          <Link href="/absensi" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <QrCode className="w-5 h-5" /> Scan QR
          </Link>
          <Link href="#" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <Settings className="w-5 h-5" /> Pengaturan
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-3.5 rounded-xl font-bold transition-all w-full"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* 2. KONTEN UTAMA KANAN */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        
        {/* Topbar / Header Atas yang Lega di HP */}
        <header className="bg-white shadow-sm border-b border-[#E2E8F0] p-4 flex justify-between items-center relative z-10 sticky top-0">
          <div className="flex items-center gap-3">
            {/* Tombol Garis Tiga (Hamburger) untuk buka menu di HP */}
            <button 
              className="md:hidden text-[#1E293B] p-2 bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-[#1E293B] hidden sm:block">Sistem Informasi Manajemen</h2>
          </div>
          
          <div className="flex items-center gap-2 bg-[#F8FAFC] py-2 px-3 md:px-4 rounded-full border border-[#CBD5E1] shadow-sm max-w-[200px] md:max-w-none">
            <User className="w-4 h-4 md:w-5 md:h-5 text-[#94A3B8] shrink-0" />
            <span className="text-xs md:text-sm font-bold text-[#334155] truncate">{email}</span>
            <span className="bg-[#1E293B] text-[#D4AF37] text-[10px] md:text-xs font-bold px-2 py-1 rounded-md ml-1 shrink-0">ADMIN</span>
          </div>
        </header>

        {/* Isi Dashboard (Bisa di-scroll) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* Banner Ucapan Selamat Datang */}
          <div className="bg-[#1E293B] rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-5%] w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-5%] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            <h3 className="text-2xl md:text-3xl font-bold mb-2 relative z-10 tracking-tight">Assalamu'alaikum, Admin!</h3>
            <p className="text-[#94A3B8] relative z-10 text-sm md:text-base">
              Selamat datang di pusat kendali Sistem Informasi Manajemen IPM.
            </p>
            <div className="mt-4 inline-block bg-[#1E293B] border border-[#D4AF37]/30 px-4 py-1.5 rounded-lg relative z-10">
              <span className="text-xs text-slate-400">Hak Akses: </span>
              <span className="text-xs font-bold text-[#D4AF37]">ADMINISTRATOR</span>
            </div>
          </div>

          {/* MENU NAVIGASI (Kotak-kotak dikembalikan persis gambar lu) */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#1E293B] mb-4">Menu Navigasi</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <Link href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all group">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8" />
                </div>
                <p className="text-[#64748B] font-bold text-sm md:text-base">Anggota</p>
              </Link>

              <Link href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all group">
                <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8" />
                </div>
                <p className="text-[#64748B] font-bold text-sm md:text-base">Materi</p>
              </Link>

              <Link href="/absensi" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all group">
                <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-8 h-8" />
                </div>
                <p className="text-[#64748B] font-bold text-sm md:text-base">Absensi</p>
              </Link>

              <Link href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all group">
                <div className="bg-purple-50 p-4 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
                  <Megaphone className="w-8 h-8" />
                </div>
                <p className="text-[#64748B] font-bold text-sm md:text-base">Pengumuman</p>
              </Link>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}