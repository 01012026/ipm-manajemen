"use client";

import Link from "next/link";
import { ArrowLeft, Search, FileText, BookOpen, Download, Eye } from "lucide-react";

export default function MateriPage() {
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
            <h1 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tight">Pustaka Materi</h1>
            <p className="text-[#94A3B8] mt-1 text-sm font-medium tracking-wide">Tingkatkan wawasan dan keilmuanmu.</p>
          </div>
          <BookOpen className="w-8 h-8 text-[#D4AF37] opacity-80" />
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto mt-[-20px] relative z-20">
        
        {/* PENCARIAN */}
        <div className="relative mb-8 shadow-lg rounded-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Cari modul atau materi kajian..." className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#CBD5E1] text-[#1E293B] outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 font-medium transition-all" />
        </div>

        {/* LIST MATERI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
            <div className="p-6 relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><FileText className="w-6 h-6" /></div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600 tracking-wider mb-1">PERKADERAN</p>
                  <h3 className="font-bold text-[#1E293B] text-lg leading-tight">Modul Taruna Melati 1</h3>
                  <p className="text-xs text-[#64748B] mt-1">PDF • 4.5 MB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#F8FAFC] hover:bg-slate-100 text-[#1E293B] border border-[#CBD5E1] font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"><Eye className="w-4 h-4" /> Buka</button>
                <button className="bg-[#1E293B] hover:bg-[#0F172A] text-white p-2.5 rounded-xl transition-colors"><Download className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0"></div>
            <div className="p-6 relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0"><BookOpen className="w-6 h-6" /></div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 tracking-wider mb-1">KEMUHAMMADIYAHAN</p>
                  <h3 className="font-bold text-[#1E293B] text-lg leading-tight">Sejarah Muhammadiyah</h3>
                  <p className="text-xs text-[#64748B] mt-1">PDF • 2.1 MB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#F8FAFC] hover:bg-slate-100 text-[#1E293B] border border-[#CBD5E1] font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"><Eye className="w-4 h-4" /> Buka</button>
                <button className="bg-[#1E293B] hover:bg-[#0F172A] text-white p-2.5 rounded-xl transition-colors"><Download className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}