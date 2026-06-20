"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";

export default function GenerateQRPage() {
  const [kegiatan, setKegiatan] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerate = () => {
    if (!kegiatan) return alert("Masukkan nama kegiatan dulu!");
    // Menggunakan API aman untuk membuat QR tanpa install module tambahan
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(kegiatan)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <h1 className="text-2xl md:text-3xl font-black">Bikin QR Absensi</h1>
      </div>

      <div className="p-4 md:p-8 max-w-md mx-auto space-y-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <label className="block font-bold text-[#1E293B] mb-2">Nama Kegiatan</label>
          <input type="text" placeholder="Contoh: Rapat Rutin PR IPM" value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border focus:border-[#D4AF37] outline-none mb-4" />
          <button onClick={handleGenerate} className="w-full bg-[#D4AF37] text-[#1E293B] p-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5" /> Generate QR Code
          </button>
        </div>

        {qrUrl && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-4 text-center">
            <h3 className="font-bold text-[#1E293B]">QR Kegiatan: {kegiatan}</h3>
            <img src={qrUrl} alt="QR Code" className="w-64 h-64 border-4 border-[#1E293B] p-2 rounded-xl" />
            <p className="text-sm text-slate-500">Tunjukkan QR ini ke anggota untuk di-scan.</p>
          </div>
        )}
      </div>
    </div>
  );
}