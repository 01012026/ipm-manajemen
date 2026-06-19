"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Import supabase untuk ngecek tiket

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // INI SATPAMNYA: Mengecek apakah user punya tiket login yang sah
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Kalau nggak ada tiket, tendang ke login!
        router.push("/login");
      } else {
        // Kalau ada tiket, persilakan masuk
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  // Tampilan layar loading pas satpam lagi ngecek tiket
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="animate-pulse text-xl font-bold">Mengecek akses masuk...</p>
      </div>
    );
  }

  // Tampilan halaman utama kalau sukses tembus
  return (
    <div className="space-y-6 pb-6 max-w-5xl mx-auto p-4 md:p-8">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-amber-500/40 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-slate-300 mb-1 text-sm md:text-base">Assalamu'alaikum,</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Selamat Datang di Dashboard! 👋</h1>
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-sm">
            <span>✅ Keamanan Aktif. Anda aman di sini.</span>
          </div>
        </div>
      </div>

      {/* 2. Menu Cepat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {[
          { name: "Anggota", color: "bg-amber-600", path: "/anggota" },
          { name: "Absensi", color: "bg-emerald-600", path: "/absensi" },
          { name: "Scan QR", color: "bg-rose-600", path: "/scan" },
          { name: "Pengaturan", color: "bg-slate-700", path: "/pengaturan" },
        ].map((menu, i) => (
          <Link key={i} href={menu.path}>
            <div className={`p-4 rounded-2xl ${menu.color} flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95`}>
              <span className="font-semibold text-center">{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}