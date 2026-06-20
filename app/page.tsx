"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { Users, BookOpen, CalendarCheck, LogOut, LayoutDashboard, User, Menu, X, QrCode, ScanLine, Wallet, Archive } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("anggota");
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setEmail(session.user.email || "");
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        if (profile) setRole(profile.role.toLowerCase());
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
      
      {/* OVERLAY MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* SIDEBAR NAVIGASI */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-[#1E293B] text-white flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <BookOpen className="w-8 h-8" />
            <h1 className="font-bold text-xl tracking-wider">IPM APP</h1>
          </div>
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/" className="flex items-center gap-3 bg-[#D4AF37] text-[#1E293B] px-4 py-3.5 rounded-xl font-bold transition-all shadow-md">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          
          {role === "admin" && (
            <Link href="/anggota" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
              <Users className="w-5 h-5" /> Anggota
            </Link>
          )}

          <Link href="/materi" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <BookOpen className="w-5 h-5" /> Materi
          </Link>

          <Link href="/arsip" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <Archive className="w-5 h-5" /> Arsip
          </Link>
          
          <Link href="/keuangan" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <Wallet className="w-5 h-5" /> Keuangan
          </Link>

          <Link href="/absensi" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <CalendarCheck className="w-5 h-5" /> Absensi
          </Link>
          
          <Link href="/scan" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
            <ScanLine className="w-5 h-5" /> Scan QR
          </Link>
          
          {role === "admin" && (
            <Link href="/generate" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3.5 rounded-xl font-medium transition-all">
              <QrCode className="w-5 h-5" /> Bikin QR
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button onClick={handleLogout} className="flex items-center justify-center gap-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-3.5 rounded-xl font-bold transition-all w-full">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        <header className="bg-white shadow-sm border-b border-[#E2E8F0] p-4 flex justify-between items-center relative z-10 sticky top-0">
          <button className="md:hidden text-[#1E293B] p-2 bg-slate-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 bg-[#F8FAFC] py-2 px-4 rounded-full border border-[#CBD5E1] shadow-sm ml-auto">
            <User className="w-5 h-5 text-[#94A3B8]" />
            <span className="text-sm font-bold text-[#334155]">{email}</span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ml-1 uppercase ${role === 'admin' ? 'bg-[#D4AF37] text-[#1E293B]' : 'bg-slate-200 text-slate-600'}`}>{role}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="bg-[#1E293B] rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
            <h3 className="text-3xl font-bold mb-2">Assalamu'alaikum!</h3>
            <p className="text-[#94A3B8]">Selamat datang di Sistem Informasi Manajemen IPM SMK MBP.</p>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#1E293B] mb-4">Menu Navigasi</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              
              {role === "admin" && (
                <Link href="/anggota" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                  <Users className="w-8 h-8 text-blue-600" />
                  <p className="font-bold text-sm text-slate-600">Anggota</p>
                </Link>
              )}

              <Link href="/materi" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                <BookOpen className="w-8 h-8 text-amber-600" />
                <p className="font-bold text-sm text-slate-600">Materi</p>
              </Link>
              
              <Link href="/arsip" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                <Archive className="w-8 h-8 text-orange-600" />
                <p className="font-bold text-sm text-slate-600">Arsip</p>
              </Link>
              
              <Link href="/keuangan" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                <Wallet className="w-8 h-8 text-green-600" />
                <p className="font-bold text-sm text-slate-600">Keuangan</p>
              </Link>

              <Link href="/absensi" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                <CalendarCheck className="w-8 h-8 text-emerald-600" />
                <p className="font-bold text-sm text-slate-600">Absensi</p>
              </Link>

              <Link href="/scan" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                <ScanLine className="w-8 h-8 text-purple-600" />
                <p className="font-bold text-sm text-slate-600">Scan QR</p>
              </Link>

              {role === "admin" && (
                <Link href="/generate" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center gap-2 hover:border-[#D4AF37] transition-all">
                  <QrCode className="w-8 h-8 text-indigo-600" />
                  <p className="font-bold text-sm text-slate-600">Bikin QR</p>
                </Link>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}