"use client";

import { useState } from "react";
import Link from "next/link";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ArrowLeft, Camera, CheckCircle2, RefreshCcw } from "lucide-react";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState("");

  // Fungsi penangkap data QR Code
  const handleScan = (result: any) => {
    if (!result) return;
    
    let text = "";
    // Nyesuain versi library biar anti-error
    if (Array.isArray(result) && result.length > 0) {
      text = result[0].rawValue;
    } else if (typeof result === 'string') {
      text = result;
    } else if (result.text) {
      text = result.text;
    }
    
    if (text) {
      setScanResult(text);
      // Nanti di sini lu bisa tambahin script buat ngirim ke database Supabase
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* HEADER NAVY-GOLD */}
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-6 relative z-10 font-bold">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-black text-[#F8FAFC] relative z-10 tracking-tight">
          Scan Kehadiran
        </h1>
        <p className="text-[#94A3B8] mt-2 text-sm font-medium tracking-wide relative z-10">
          Arahkan kamera perangkat ke QR Code panitia
        </p>
      </div>

      {/* KONTEN UTAMA */}
      <div className="p-4 md:p-8 max-w-md mx-auto mt-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E2E8F0] text-center">
          
          {!scanResult ? (
            <>
              {/* STATE 1: KAMERA NYALA */}
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Camera className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mb-2">Kamera Aktif</h2>
              <p className="text-[#64748B] text-sm mb-6 px-4">Pastikan posisi QR Code berada tepat di tengah area agar mudah terbaca oleh sistem.</p>
              
              {/* KOMPONEN KAMERA ASLI DARI LIBRARY */}
              <div className="rounded-2xl overflow-hidden border-4 border-[#1E293B] shadow-inner mb-6 relative bg-black">
                <Scanner 
                  onScan={handleScan}
                  formats={["qr_code"]}
                />
                {/* Efek Garis Scan Laser */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] animate-[ping_2s_ease-in-out_infinite] shadow-[0_0_15px_#D4AF37] pointer-events-none"></div>
              </div>
            </>
          ) : (
            <>
              {/* STATE 2: SUKSES SCAN */}
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-[#1E293B] mb-2">Berhasil Discan!</h2>
              <p className="text-[#64748B] text-sm mb-6">Data dari QR Code berhasil ditangkap oleh sistem.</p>
              
              <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-4 rounded-xl mb-8 break-words text-left">
                <span className="text-xs font-bold text-[#94A3B8] block mb-1">Hasil Teks/Link QR Code:</span>
                <span className="text-[#1E293B] font-bold">{scanResult}</span>
              </div>

              <button 
                onClick={() => setScanResult("")}
                className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" /> Scan QR Lainnya
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}