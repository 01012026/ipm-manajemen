"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, History, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const transactions = [
  { id: 1, title: "Iuran Anggota (Juni)", type: "in", amount: "+ Rp 350.000", date: "18 Jun 2026", desc: "Dari 35 Anggota" },
  { id: 2, title: "Print Proposal Rapat", type: "out", amount: "- Rp 45.000", date: "15 Jun 2026", desc: "Fotokopi & Jilid" },
  { id: 3, title: "Donasi Alumni", type: "in", amount: "+ Rp 500.000", date: "10 Jun 2026", desc: "Donatur: Bpk. H. Ahmad" },
  { id: 4, title: "Konsumsi Kajian", type: "out", amount: "- Rp 120.000", date: "05 Jun 2026", desc: "Air mineral & snack" },
];

export default function KeuanganPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // PROTEKSI HALAMAN
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      router.push("/"); // Usir ke Dashboard kalau bukan Admin
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return <div className="p-8 text-center text-slate-500">Memeriksa akses...</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-8">
      {/* Header & Alert */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">E-Kas IPM</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Transparansi Keuangan Organisasi</p>
        </div>
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-2 rounded-xl text-xs font-bold flex items-center gap-1 border border-amber-200 dark:border-amber-800">
          <ShieldAlert className="w-4 h-4" /> Admin Only
        </div>
      </div>

      {/* Kartu Saldo Utama (Ala M-Banking) */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 md:p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-slate-300 text-sm font-medium mb-1">Total Saldo Kas Saat Ini</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white">Rp 1.450.000</h2>
          
          <div className="flex gap-4 w-full max-w-sm">
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold text-sm text-emerald-400">
              <ArrowUpRight className="w-4 h-4" /> Pemasukan
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold text-sm text-red-400">
              <ArrowDownRight className="w-4 h-4" /> Pengeluaran
            </button>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-2xl border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> <span className="text-xs font-bold uppercase tracking-wider">Uang Masuk</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Rp 850.000</h3>
        </div>
        <div className="glass p-4 rounded-2xl border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
            <TrendingDown className="w-4 h-4 text-red-500" /> <span className="text-xs font-bold uppercase tracking-wider">Uang Keluar</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Rp 165.000</h3>
        </div>
      </div>

      {/* Histori Transaksi */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <History className="w-5 h-5 text-primary" /> Riwayat Transaksi
        </h2>
        <button className="text-sm font-semibold text-primary hover:underline">Lihat Semua</button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {transactions.map((trx, i) => (
          <motion.div key={trx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${trx.type === 'in' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              {trx.type === 'in' ? <ArrowUpRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> : <ArrowDownRight className="w-6 h-6 text-red-600 dark:text-red-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{trx.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{trx.desc}</p>
            </div>
            <div className="text-right">
              <h4 className={`text-sm font-bold ${trx.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                {trx.amount}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{trx.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}