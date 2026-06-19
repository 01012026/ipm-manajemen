"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wallet, Plus, X } from "lucide-react";

export default function KeuanganPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* HEADER */}
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black">Manajemen Keuangan</h1>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                <Plus /> Tambah Data
            </button>
        </div>
      </div>

      {/* MODAL FORM INPUT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Tambah Transaksi</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Keterangan (Contoh: Iuran)" className="w-full p-3 rounded-xl bg-slate-50 border" />
              <input type="number" placeholder="Jumlah (Contoh: 50000)" className="w-full p-3 rounded-xl bg-slate-50 border" />
              <select className="w-full p-3 rounded-xl bg-slate-50 border">
                <option>Pemasukan</option>
                <option>Pengeluaran</option>
              </select>
              <button className="w-full bg-[#1E293B] text-white p-3 rounded-xl font-bold">Simpan Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}