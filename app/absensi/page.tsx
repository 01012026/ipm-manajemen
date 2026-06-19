"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, QrCode, CalendarDays, History, MapPin, Clock, Camera, CheckCircle2 } from "lucide-react";

export default function AbsensiPage() {
  const [activeTab, setActiveTab] = useState("scan");
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* HEADER NAVY-GOLD */}
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-6 relative z-10 font-bold">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-black text-[#F8FAFC] relative z-10 tracking-tight">
          Presensi & Kehadiran
        </h1>
        <p className="text-[#94A3B8] mt-2 text-sm font-medium tracking-wide relative z-10">
          Sistem Absensi Digital Terintegrasi
        </p>
      </div>

      {/* MENU TABS (NAVIGASI) */}
      <div className="flex justify-center mt-[-20px] px-4 relative z-20">
        <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-[#E2E8F0] flex w-full max-w-md">
          <button 
            onClick={() => setActiveTab("scan")} 
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'scan' ? 'bg-[#1E293B] text-[#D4AF37] shadow-md' : 'text-[#64748B] hover:bg-slate-50'}`}
          >
            <QrCode className="w-4 h-4" /> Scan QR
          </button>
          <button 
            onClick={() => setActiveTab("jadwal")} 
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'jadwal' ? 'bg-[#1E293B] text-[#D4AF37] shadow-md' : 'text-[#64748B] hover:bg-slate-50'}`}
          >
            <CalendarDays className="w-4 h-4" /> Jadwal
          </button>
          <button 
            onClick={() => setActiveTab("riwayat")} 
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'riwayat' ? 'bg-[#1E293B] text-[#D4AF37] shadow-md' : 'text-[#64748B] hover:bg-slate-50'}`}
          >
            <History className="w-4 h-4" /> Riwayat
          </button>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="p-4 md:p-8 max-w-2xl mx-auto mt-4">

        {/* TAB 1: SCANNER QR */}
        {activeTab === 'scan' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E2E8F0] text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <QrCode className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mb-2">Scan QR Code Kehadiran</h2>
              <p className="text-[#64748B] text-sm mb-8 px-4">Arahkan kamera ke QR Code yang ditampilkan oleh panitia acara untuk mengisi daftar hadir.</p>
              
              {/* Box Kamera Mockup */}
              <div className="relative w-full max-w-sm mx-auto aspect-square bg-[#F8FAFC] rounded-3xl border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center overflow-hidden mb-6 group">
                {isScanning ? (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="w-full h-1 bg-[#D4AF37] absolute top-1/2 animate-ping shadow-[0_0_15px_#D4AF37]"></div>
                    <p className="text-[#1E293B] font-bold animate-pulse">Memindai...</p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-[#94A3B8] mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-[#64748B] font-medium">Kamera Siap</p>
                  </>
                )}
                {/* Frame Sudut Scan */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#1E293B] rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#1E293B] rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#1E293B] rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#1E293B] rounded-br-lg"></div>
              </div>

              <button 
                onClick={() => setIsScanning(!isScanning)}
                className="w-full max-w-sm mx-auto bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                {isScanning ? "Batalkan Scan" : "Mulai Scan QR"}
              </button>

              <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                <p className="text-sm font-bold text-[#64748B] mb-3">Atau masukkan PIN Kehadiran manual:</p>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <input type="text" placeholder="Contoh: 8492" className="flex-1 px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E293B] font-bold text-center tracking-widest focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none" />
                  <button className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1E293B] font-bold px-6 rounded-xl transition-all">Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: JADWAL KEGIATAN (Warna Teks Diperbaiki) */}
        {activeTab === 'jadwal' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-black text-[#1E293B]">Rapat Evaluasi Bulanan</h3>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">Wajib Hadir</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-[#64748B] font-medium">
                  <CalendarDays className="w-4 h-4 text-[#D4AF37]" /> 20 Juni 2026
                </div>
                <div className="flex items-center gap-3 text-[#64748B] font-medium">
                  <Clock className="w-4 h-4 text-[#D4AF37]" /> 15:30 WIB
                </div>
                <div className="flex items-center gap-3 text-[#64748B] font-medium">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> Aula Pimpinan Daerah
                </div>
              </div>
              <button className="w-full bg-[#1E293B] text-white font-bold py-3.5 rounded-xl hover:bg-[#0F172A] transition-colors flex justify-center items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> Konfirmasi Kehadiran
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-black text-[#1E293B]">Kajian Rutin Keislaman</h3>
                <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full">Terbuka</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-[#64748B] font-medium">
                  <CalendarDays className="w-4 h-4 text-[#D4AF37]" /> 25 Juni 2026
                </div>
                <div className="flex items-center gap-3 text-[#64748B] font-medium">
                  <Clock className="w-4 h-4 text-[#D4AF37]" /> 16:00 WIB
                </div>
                <div className="flex items-center gap-3 text-[#64748B] font-medium">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> Masjid Raya
                </div>
              </div>
              <button className="w-full bg-[#1E293B] text-white font-bold py-3.5 rounded-xl hover:bg-[#0F172A] transition-colors flex justify-center items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> Konfirmasi Kehadiran
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: RIWAYAT KEHADIRAN */}
        {activeTab === 'riwayat' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <h3 className="font-bold text-[#1E293B]">Bulan Juni 2026</h3>
                </div>
                <div className="divide-y divide-[#E2E8F0]">
                  <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-[#1E293B]">Pelatihan Jurnalistik</h4>
                      <p className="text-xs text-[#64748B] mt-1">10 Juni 2026 • 09:15 WIB</p>
                    </div>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Hadir
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-[#1E293B]">Musyawarah Ranting</h4>
                      <p className="text-xs text-[#64748B] mt-1">05 Juni 2026 • 13:00 WIB</p>
                    </div>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Hadir
                    </span>
                  </div>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}