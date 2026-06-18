"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-6 max-w-5xl mx-auto p-4 md:p-8">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-amber-500/40 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-slate-300 mb-1 text-sm md:text-base">Assalamu'alaikum,</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Selamat Datang di Dashboard! 👋</h1>
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-sm">
            <span>✅ Sistem login berhasil!</span>
          </div>
        </div>
      </div>

      {/* 2. Menu Cepat (Simple Version) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {[
          { name: "Anggota", color: "bg-amber-600", path: "/anggota" },
          { name: "Absensi", color: "bg-emerald-600", path: "/absensi" },
          { name: "Arsip", color: "bg-blue-600", path: "/arsip" },
          { name: "Pengaturan", color: "bg-slate-700", path: "/pengaturan" },
        ].map((menu, i) => (
          <Link key={i} href={menu.path}>
            <div className={`p-4 rounded-2xl ${menu.color} flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95`}>
              <span className="font-semibold text-center">{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Status Sederhana */}
      <h2 className="text-xl font-bold mt-8 mb-4">Status Sistem</h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-300">
          Koneksi ke Supabase aktif. Fitur <strong>Authentication</strong> telah sukses berjalan dengan sempurna.
        </p>
      </div>

    </div>
  );
}
// bismillah Netlify bangun