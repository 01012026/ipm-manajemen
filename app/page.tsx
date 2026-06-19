"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { Users, CalendarCheck, ScanLine, Settings, FilePlus, Megaphone, PlusCircle } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <p className="animate-pulse text-xl font-bold">Mengecek akses masuk...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pb-10">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Header Banner (Tetap gelap biar elegan di mode apapun) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-amber-500/40 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-slate-300 mb-1 text-sm md:text-base">Assalamu'alaikum,</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Selamat Datang di Dashboard! 👋</h1>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-sm shadow-sm">
              <span>✅ Login sebagai: <strong className="uppercase text-amber-400">{userRole}</strong></span>
            </div>
          </div>
        </div>

        {/* Menu Umum (Bisa diakses Admin & Anggota) */}
        <h2 className="text-xl font-bold mt-8 mb-4">Menu Utama</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {[
            { name: "Anggota", icon: Users, color: "bg-amber-500", path: "/anggota" },
            { name: "Absensi", icon: CalendarCheck, color: "bg-emerald-500", path: "/absensi" },
            { name: "Pengumuman", icon: Megaphone, color: "bg-purple-500", path: "/pengumuman" },
          ].map((menu, i) => (
            <Link key={i} href={menu.path}>
              <div className={`p-4 rounded-2xl ${menu.color} flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 gap-2`}>
                <menu.icon className="w-8 h-8" />
                <span className="font-semibold text-center">{menu.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* MENU RAHASIA: Cuma muncul kalau ADMIN */}
        {userRole === 'admin' && (
          <>
            <div className="mt-8 mb-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold text-rose-500 flex items-center gap-2">
                <Settings className="w-6 h-6" /> Menu Khusus Admin
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <Link href="/scan">
                <div className="p-4 rounded-2xl bg-rose-600 flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 gap-2">
                  <ScanLine className="w-8 h-8" />
                  <span className="font-semibold text-center text-sm">Scan QR</span>
                </div>
              </Link>
              <Link href="/tambah-anggota">
                <div className="p-4 rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 gap-2">
                  <FilePlus className="w-8 h-8" />
                  <span className="font-semibold text-center text-sm">Tambah Anggota</span>
                </div>
              </Link>
              <Link href="/tambah-agenda">
                <div className="p-4 rounded-2xl bg-teal-600 flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 gap-2">
                  <PlusCircle className="w-8 h-8" />
                  <span className="font-semibold text-center text-sm">Tambah Agenda</span>
                </div>
              </Link>
              <Link href="/buat-pengumuman">
                <div className="p-4 rounded-2xl bg-indigo-600 flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 gap-2">
                  <Megaphone className="w-8 h-8" />
                  <span className="font-semibold text-center text-sm">Buat Pengumuman</span>
                </div>
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}