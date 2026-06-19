"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowLeft, UserPlus, Info } from "lucide-react";
import Link from "next/link";

export default function TambahAnggotaPage() {
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (nis && nama) {
      setQrGenerated(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#2C3E50] p-4 md:p-8 font-sans">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 pt-4 mb-8">
          <Link href="/">
            <div className="p-2.5 bg-[#FCFCFA] shadow-sm border border-[#E2E8F0] rounded-xl hover:bg-[#F1F5F9] transition">
              <ArrowLeft className="w-5 h-5 text-[#475569]" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[#1E293B] tracking-tight">
            <UserPlus className="w-6 h-6 text-[#2563EB]" />
            Registrasi & Cetak QR
          </h1>
        </div>

        {/* Form Input */}
        <div className="bg-[#FCFCFA] p-8 rounded-2xl shadow-sm border border-[#E2E8F0]">
          <form onSubmit={handleGenerateQR} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#475569] mb-2 tracking-wide">NOMOR INDUK SISWA (NIS)</label>
              <input 
                type="text" 
                placeholder="Masukkan NIS..."
                className="w-full p-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition text-[#1E293B]"
                value={nis}
                onChange={(e) => {
                  setNis(e.target.value);
                  setQrGenerated(false); 
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#475569] mb-2 tracking-wide">NAMA LENGKAP</label>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap..."
                className="w-full p-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition text-[#1E293B]"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                  setQrGenerated(false);
                }}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#1E293B] text-white font-bold py-4 rounded-xl hover:bg-[#0F172A] transition shadow-md mt-4 tracking-wide"
            >
              Cetak QR Code
            </button>
          </form>
        </div>

        {/* Hasil Cetak QR Code */}
        {qrGenerated && (
          <div className="bg-[#FCFCFA] p-8 rounded-2xl shadow-sm border border-[#E2E8F0] flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-lg font-bold text-[#1E293B] mb-6 uppercase tracking-widest border-b border-[#E2E8F0] pb-2 w-full text-center">Kartu Akses Anggota</h2>
            
            <div className="p-5 border-2 border-dashed border-[#CBD5E1] rounded-2xl bg-white shadow-inner mb-6">
              <QRCodeCanvas 
                value={nis} 
                size={220}
                bgColor={"#ffffff"}
                fgColor={"#1E293B"}
                level={"H"}
                includeMargin={true}
              />
            </div>
            
            <p className="font-bold text-[#1E293B] text-xl text-center uppercase tracking-wide">{nama}</p>
            <p className="text-[#64748B] font-mono mt-1 text-lg">NIS: {nis}</p>
            
            <div className="mt-8 bg-[#EFF6FF] p-4 rounded-xl flex items-start gap-3 border border-[#BFDBFE]">
              <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-sm text-[#1E3A8A] leading-relaxed">
                Silakan ambil tangkapan layar (screenshot) area ini dan kirimkan kepada anggota yang bersangkutan sebagai kartu akses absen mereka.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}