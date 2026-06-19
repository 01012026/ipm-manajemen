"use client";

import Link from "next/link";
import { ArrowLeft, User, Lock, Bell, Moon, ChevronRight, Shield } from "lucide-react";

export default function PengaturanPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* HEADER NAVY-GOLD */}
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-6 relative z-10 font-bold">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl md:text-3xl font-black text-[#F8FAFC] relative z-10 tracking-tight">Pengaturan</h1>
      </div>

      <div className="p-4 md:p-8 max-w-2xl mx-auto mt-[-20px] relative z-20">
        
        {/* PROFIL CARD */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] flex items-center gap-5 mb-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#1E293B] border-4 border-white shadow-sm shrink-0">
            N
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">Nama Tidak Diketahui</h2>
            <div className="flex items-center gap-1 mt-1 text-[#64748B] bg-slate-100 px-3 py-1 rounded-lg w-max border border-slate-200">
              <Shield className="w-3 h-3" />
              <span className="text-xs font-bold">Anggota Biasa</span>
            </div>
          </div>
        </div>

        {/* LIST PENGATURAN */}
        <div className="space-y-6">
          
          <div>
            <p className="text-xs font-bold text-[#94A3B8] tracking-wider mb-3 px-2">AKUN SAYA</p>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden divide-y divide-[#E2E8F0]">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><User className="w-5 h-5" /></div>
                  <span className="font-bold text-[#1E293B]">Edit Profil</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Lock className="w-5 h-5" /></div>
                  <span className="font-bold text-[#1E293B]">Ubah Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-[#94A3B8] tracking-wider mb-3 px-2">PREFERENSI APLIKASI</p>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden divide-y divide-[#E2E8F0]">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center"><Bell className="w-5 h-5" /></div>
                  <span className="font-bold text-[#1E293B]">Notifikasi</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Moon className="w-5 h-5" /></div>
                  <span className="font-bold text-[#1E293B]">Mode Gelap</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#94A3B8]">Mati</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}