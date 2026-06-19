"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ArrowLeft, ScanLine, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 flex flex-col items-center">
      
      {/* Header dengan tombol kembali */}
      <div className="w-full max-w-md flex items-center gap-4 mb-8 pt-4">
        <Link href="/">
          <div className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
            <ArrowLeft className="w-6 h-6 text-white" />
          </div>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ScanLine className="w-6 h-6 text-amber-500" />
          Scan Kehadiran
        </h1>
      </div>

      {/* Area Kamera */}
      <div className="w-full max-w-md bg-slate-800 p-4 rounded-3xl shadow-2xl border border-slate-700">
        <div className="aspect-square rounded-2xl overflow-hidden relative bg-black flex items-center justify-center">
          
          {/* Mesin Scanner YANG UDAH DIPERBARUI */}
          <Scanner
            onScan={(result) => {
              // Di versi baru, hasilnya bentuk array, jadi kita ambil urutan ke-0
              if (result && result.length > 0) {
                setScanResult(result[0].rawValue);
              }
            }}
            onError={(error: any) => console.log(error?.message || error)}
            scanDelay={1000}
          />

          {/* Garis merah efek scanning */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_15px_red] animate-pulse" />
        </div>
        <p className="text-center text-sm text-slate-400 mt-4">
          Arahkan QR Code Anggota ke dalam kotak kamera.
        </p>
      </div>

      {/* Hasil Scan */}
      {scanResult && (
        <div className="w-full max-w-md mt-6 p-4 bg-emerald-600/20 border border-emerald-500 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
          <h2 className="text-lg font-bold text-emerald-400">Scan Berhasil!</h2>
          <p className="text-slate-300 mt-1 break-all bg-slate-900 p-2 rounded-lg text-sm w-full">
            Data: {scanResult}
          </p>
          <button 
            onClick={() => setScanResult(null)}
            className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition"
          >
            Scan Lagi
          </button>
        </div>
      )}

    </div>
  );
}