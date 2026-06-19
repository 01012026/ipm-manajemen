"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { Users, CalendarCheck, ScanLine, Settings, FilePlus, Megaphone, PlusCircle, BookOpen } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        setUserRole(profile?.role || 'anggota');
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F4F0] text-[#2C3E50]">
        <p className="animate-pulse text-lg font-medium tracking-wide">Memuat sistem...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#2C3E50] pb-10 font-sans">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header Banner - Navy & Gold Classic */}
        <div className="bg-[#1E293B] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-[#334155]">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-[#94A3B8] mb-1 text-sm md:text-base font-medium tracking-wide">Assalamu'alaikum,</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-5 tracking-tight">
              Sistem Informasi Manajemen
            </h1>
            
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 text-sm">
              <span className="text-slate-300">Hak Akses: <strong className="uppercase text-[#D4AF37] tracking-wider ml-1">{userRole}</strong></span>
            </div>
          </div>
        </div>

        {/* Menu Umum */}
        <div>
          <h2 className="text-xl font-bold mb-5 text-[#334155] border-b border-[#E2E8F0] pb-2">Menu Navigasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Anggota", icon: Users, color: "text-[#2563EB] bg-[#EFF6FF]", path: "/anggota" },
              { name: "Materi", icon: BookOpen, color: "text-[#D97706] bg-[#FEF3C7]", path: "/materi" },
              { name: "Absensi", icon: CalendarCheck, color: "text-[#059669] bg-[#D1FAE5]", path: "/absensi" },
              { name: "Pengumuman", icon: Megaphone, color: "text-[#7C3AED] bg-[#EDE9FE]", path: "/pengumuman" },
            ].map((menu, i) => (
              <Link key={i} href={menu.path}>
                <div className="p-6 rounded-2xl bg-[#FCFCFA] flex flex-col items-center justify-center shadow-sm border border-[#E2E8F0] hover:shadow-md hover:-translate-y-1 transition-all duration-300 gap-3">
                  <div className={`p-3 rounded-xl ${menu.color}`}>
                    <menu.icon className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-[#475569] text-sm tracking-wide">{menu.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MENU KHUSUS ADMIN */}
        {userRole === 'admin' && (
          <div className="pt-4">
            <h2 className="text-xl font-bold mb-5 text-[#9F1239] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <Settings className="w-5 h-5" /> Panel Administrasi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Link href="/scan">
                <div className="p-6 rounded-2xl bg-[#FCFCFA] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#FFE4E6] text-[#E11D48]">
                    <ScanLine className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-[#475569] text-sm">Scan Kehadiran</span>
                </div>
              </Link>
              <Link href="/tambah-anggota">
                <div className="p-6 rounded-2xl bg-[#FCFCFA] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#DBEAFE] text-[#2563EB]">
                    <FilePlus className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-[#475569] text-sm text-center">Buat Akun & QR</span>
                </div>
              </Link>
              <Link href="/tambah-agenda">
                <div className="p-6 rounded-2xl bg-[#FCFCFA] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#CCFBF1] text-[#0D9488]">
                    <PlusCircle className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-[#475569] text-sm">Tambah Agenda</span>
                </div>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}