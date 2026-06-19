"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wallet, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KeuanganPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <h1 className="text-2xl font-black">Manajemen Keuangan</h1>
      </div>

      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Total Saldo */}
        <div className="bg-[#1E293B] text-white p-6 rounded-2xl shadow-lg">
          <p className="text-[#94A3B8]">Total Saldo</p>
          <h2 className="text-4xl font-black">Rp 5.400.000</h2>
        </div>

        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Plus /> Pemasukan</button>
          <button className="bg-red-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Plus /> Pengeluaran</button>
        </div>
      </div>
    </div>
  );
}