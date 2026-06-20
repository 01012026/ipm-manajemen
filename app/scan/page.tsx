"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";

export default function ScanPage() {
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [namaAnggota, setNamaAnggota] = useState("");

  const handleAbsen = async () => {
    if (!namaKegiatan || !namaAnggota) return alert("Lengkapi data kehadiran!");
    
    const { error } = await supabase.from("absensi").insert([{ 
      nama_kegiatan: namaKegiatan, 
      nama_anggota: namaAnggota 
    }]);

    if (error) {
      alert("Gagal mencatat: " + error.message);
    } else {
      alert(`Berhasil! Kehadiran ${namaAnggota} tercatat.`);
      setNamaAnggota(""); // Kosongkan nama untuk input anggota selanjutnya
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <h1 className="text-2xl md:text-3xl font-black">Scan Kehadiran</h1>
      </div>

      <div className="p-4 md:p-8 max-w-md mx-auto space-y-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-center bg-slate-100 h-40 rounded-xl mb-6 border-2 border-dashed border-slate-300">
            <p className="text-slate-400 flex flex-col items-center gap-2"><ScanLine className="w-8 h-8" /> Simulasi Scanner / Input Cepat</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nama Kegiatan (Dari QR)</label>
              <input type="text" placeholder="Contoh: Rapat Rutin PR IPM" value={namaKegiatan} onChange={(e) => setNamaKegiatan(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border focus:border-[#D4AF37] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nama Anggota Yang Hadir</label>
              <input type="text" placeholder="Masukkan nama anggota..." value={namaAnggota} onChange={(e) => setNamaAnggota(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border focus:border-[#D4AF37] outline-none" />
            </div>
            <button onClick={handleAbsen} className="w-full bg-[#1E293B] text-white p-4 rounded-xl font-bold mt-2 hover:bg-[#0F172A] transition-colors">
              Catat Kehadiran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}