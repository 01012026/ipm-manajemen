"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [namaAnggota, setNamaAnggota] = useState("");

  useEffect(() => {
    const cekLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
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
      setNamaAnggota(""); 
      router.push("/absensi"); 
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold hover:text-white transition-colors">
          <ArrowLeft /> Kembali
        </Link>
        <h1 className="text-2xl md:text-3xl font-black">Scan Kehadiran</h1>
      </div>

      <div className="p-4 md:p-8 max-w-md mx-auto space-y-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          
          {/* Kamera Scanner Asli */}
          <div className="overflow-hidden rounded-xl border-2 border-slate-200 mb-6 bg-black">
            <Scanner
              onScan={(result: any) => {
                // Logika anti-error buat nangkap teks dari QR Code
                if (result && result.length > 0) {
                  setNamaKegiatan(result[0].rawValue);
                } else if (result && typeof result === "string") {
                  setNamaKegiatan(result);
                }
              }}
              onError={(error: any) => console.log("Kamera error:", error?.message)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-1">Nama Kegiatan (Lihat di QR)</label>
              <input 
                type="text" 
                placeholder="Arahkan kamera ke QR..." 
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