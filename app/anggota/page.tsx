"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, UserPlus, MoreVertical } from "lucide-react";

export default function AnggotaPage() {
  const [activeTab, setActiveTab] = useState("semua");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* HEADER NAVY-GOLD */}
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-6 relative z-10 font-bold">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </Link>
        <div className="flex justify-between items-end relative z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tight">Data Anggota</h1>
            <p className="text-[#94A3B8] mt-1 text-sm font-medium tracking-wide">Kelola database pimpinan & anggota</p>
          </div>
          <button className="bg-white text-[#1E293B] p-3 rounded-full shadow-md hover:bg-slate-100 transition-colors">
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-3xl mx-auto mt-[-20px] relative z-20">
        
        {/* PENCARIAN & TAB */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#E2E8F0] mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Cari nama anggota..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E293B] outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all" />
          </div>
          <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-[#CBD5E1]">
            {['semua', 'pimpinan', 'anggota'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white shadow text-[#1E293B]' : 'text-[#64748B]'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* LIST ANGGOTA */}
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-lg text-[#1E293B] border border-slate-200">A</div>
              <div>
                <h3 className="font-bold text-[#1E293B]">Ahmad Dahlan</h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1">ahmad@ipm.or.id</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MoreVertical className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#1E293B] text-[#1E293B]">Ketua Umum</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-lg text-[#1E293B] border border-slate-200">S</div>
              <div>
                <h3 className="font-bold text-[#1E293B]">Siti Walidah</h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1">siti@ipm.or.id</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MoreVertical className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#1E293B] text-[#1E293B]">Sekretaris</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}