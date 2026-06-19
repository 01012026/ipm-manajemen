"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Library pembuat QR
import { ArrowLeft, UserPlus, Download } from "lucide-react";
import Link from "next/link";

export default function TambahAnggotaPage() {
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  // Fungsi buat bikin QR Code dari NIS
  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (nis && nama) {
      setQrGenerated(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Link href="/">
            <div className="p-2 bg-white shadow-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </div>
          </Link>
          <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <UserPlus className="w-6 h-6 text-blue-600" />
            Tambah Anggota & QR
          </h1>
        </div>

        {/* Form Input */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <form onSubmit={handleGenerateQR} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">NIS (Nomor Induk Siswa)</label>
              <input 
                type="text" 
                placeholder="Contoh: 12345"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={nis}
                onChange={(e) => {
                  setNis(e.target.value);
                  setQrGenerated(false); // Reset QR kalau diketik ulang
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Contoh: Ahmad Budi"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              Buat QR Code
            </button>
          </form>
        </div>

        {/* Hasil QR Code */}
        {qrGenerated && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-lg font-bold text-slate-700 mb-4">Kartu QR Anggota</h2>
            
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-white" id="qr-container">
              <QRCodeCanvas 
                value={nis} // Yang disecan nanti adalah NIS-nya
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#0F172A"}
                level={"H"}
                includeMargin={true}
              />
            </div>
            
            <p className="mt-4 font-bold text-slate-800 text-lg">{nama}</p>
            <p className="text-slate-500 font-mono text-sm">NIS: {nis}</p>
            
            <p className="text-xs text-slate-400 mt-6 text-center">
              *Silakan screenshot QR Code ini dan berikan kepada anggota.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}