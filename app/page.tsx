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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <p className="animate-pulse text-lg font-medium">Memuat sistem...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-10">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Header Banner - Elegan & Profesional */}
        <div className="bg-[#0F172A] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-slate-400 mb-1 text-sm md:text-base">Assalamu'alaikum,</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Selamat Datang di Dashboard 👋</h1>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-sm">
              <span className="text-slate-200">Akses sebagai: <strong className="uppercase text-amber-400 tracking-wider ml-1">{userRole}</strong></span>
            </div>
          </div>
        </div>

        {/* Menu Umum (Bisa diakses Semua) */}
        <h2 className="text-lg font-bold mt-8 mb-4 text-slate-700">Menu Utama</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Anggota", icon: Users, color: "text-blue-600 bg-blue-100", path: "/anggota" },
            { name: "Materi", icon: BookOpen, color: "text-amber-600 bg-amber-100", path: "/materi" },
            { name: "Absensi", icon: CalendarCheck, color: "text-emerald-600 bg-emerald-100", path: "/absensi" },
            { name: "Pengumuman", icon: Megaphone, color: "text-purple-600 bg-purple-100", path: "/pengumuman" },
          ].map((menu, i) => (
            <Link key={i} href={menu.path}>
              <div className="p-5 rounded-2xl bg-white flex flex-col items-center justify-center shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all gap-3 cursor-pointer">
                <div className={`p-3 rounded-xl ${menu.color}`}>
                  <menu.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-slate-700 text-sm text-center">{menu.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* MENU KHUSUS ADMIN */}
        {userRole === 'admin' && (
          <>
            <div className="mt-10 mb-4 border-t border-slate-200 pt-6">
              <h2 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                <Settings className="w-5 h-5" /> Kelola Sistem (Admin)
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/scan">
                <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
                    <ScanLine className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">Scan QR</span>
                </div>
              </Link>
              <Link href="/tambah-anggota">
                <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <FilePlus className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm text-center">Tambah Anggota & QR</span>
                </div>
              </Link>
              <Link href="/tambah-agenda">
                <div className="p-5 rounded-2xl bg-white border border-teal-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-teal-100 text-teal-600">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">Buat Agenda</span>
                </div>
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}