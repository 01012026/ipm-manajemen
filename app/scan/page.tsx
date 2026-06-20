"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [namaAnggota, setNamaAnggota] = useState("");

  useEffect(() => {
    // SATPAM GAIB: Cek dia udah login atau belum
    const cekLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Kalau belum login, lempar ke halaman login
      if (!session) {
        router.push("/login");
      } else {
        // Bebas akses buat Admin DAN Anggota
        setLoading(false);
      }
    };
    
    cekLogin();
  }, [router]);

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
      setNamaAnggota(""); // Kosongkan nama biar bisa gantian absen kalau pake 1 HP
      router.push("/absensi"); // Otomatis pindah ke halaman rekap biar bisa liat namanya muncul
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold hover:text-white transition-colors"><ArrowLeft /> Kembali</Link>
        <h1 className="text-2xl md:text-3xl font-black">Scan Kehadiran</h1>
      </div>

      <div className="p-4 md:p-8 max-w-md mx-auto space-y-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-center bg-slate-100 h-40 rounded-xl mb-6 border-2 border-dashed border-slate-300">
            <p className="text-slate-400 flex flex-col items-center gap-2"><ScanLine className="w-8 h-8" /> Simulasi Scanner / Input Cepat</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-1">Nama Kegiatan (Lihat di QR)</label>
              <input 
                type="text" 
                placeholder="Contoh: Rapat Rutin PR IPM" 
                value={namaKegiatan} 
                onChange={(e) => setNamaKegiatan(e.target.value)} 
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-1">Nama Anggota Yang Hadir</label>
              <input 
                type="text" 
                placeholder="Masukkan nama kamu..." 
                value={namaAnggota} 
                onChange={(e) => setNamaAnggota(e.target.value)} 
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none" 
              />
            </div>
            <button 
              onClick={handleAbsen} 
              className="w-full bg-[#1E293B] text-white p-4 rounded-xl font-bold mt-2 hover:bg-[#0F172A] transition-colors shadow-md"
            >
              Catat Kehadiran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}