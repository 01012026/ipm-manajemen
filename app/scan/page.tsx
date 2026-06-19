"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ArrowLeft, ScanLine, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col items-center p-4 md:p-8">
      
      {/* Header dengan tombol kembali */}
      <div className="w-full max-w-md flex items-center gap-4 mb-8 pt-4">
        <Link href="/">
          <div className="p-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <ArrowLeft className="w-6 h-6 text-slate-800 dark:text-white" />
          </div>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ScanLine className="w-6 h-6 text-rose-500" />
          Scan Kehadiran
        </h1>
      </div>

      {/* Area Kamera */}
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="aspect-square rounded-2xl overflow-hidden relative bg-black flex items-center justify-center border-4 border-slate-100 dark:border-slate-900">
          
          <Scanner
            onScan={(result) => {
              if (result && result.length > 0) {
                setScanResult(result[0].rawValue);
              }
            }}
            onError={(error: any) => console.log(error?.message || error)}
            scanDelay={1000}
          />

          {/* Garis merah efek scanning */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-rose-500 shadow-[0_0_15px_#f43f5e] animate-pulse" />
        </div>
        <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-4">
          Arahkan QR Code Anggota ke dalam kotak kamera.
        </p>
      </div>

      {/* Hasil Scan */}
      {scanResult && (
        <div className="w-full max-w-md mt-6 p-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Scan Berhasil!</h2>
          <div className="mt-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 w-full">
            <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">
              {scanResult}
            </p>
          </div>
          <button 
            onClick={() => setScanResult(null)}
            className="mt-5 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition shadow-md hover:shadow-lg"
          >
            Scan Lagi
          </button>
        </div>
      )}

    </div>
  );
}