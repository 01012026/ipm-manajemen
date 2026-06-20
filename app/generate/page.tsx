"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";

export default function GenerateQRPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [kegiatan, setKegiatan] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const proteksiHalaman = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Kalau belum login, lempar ke halaman login
      if (!session) {
        router.push("/login");
        return;
      }
      
      // Cek apakah dia admin atau anggota
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      // Kalau dia bukan admin, TENDANG KELUAR!
      if (!profile || profile.role.toLowerCase() !== "admin") {
        alert("Akses Ditolak: Halaman ini khusus Admin!");
        router.push("/");
      } else {
        // Kalau dia admin, bukakan pintunya
        setLoading(false);
      }
    };
    
    proteksiHalaman();
  }, [router]);

  const handleGenerate = () => {
    if (!kegiatan) return alert("Masukkan nama kegiatan dulu!");
    // Pakai API public buat bikin QR tanpa ribet install module tambahan
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(kegiatan)}`);
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
        <h1 className="text-2xl md:text-3xl font-black">Bikin QR Absensi</h1>
      </div>

      <div className="p-4 md:p-8 max-w-md mx-auto space-y-6 mt-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <label className="block font-bold text-[#1E293B] mb-2">Nama Kegiatan</label>
          <input 
            type="text" 
            placeholder="Contoh: Rapat Rutin PR IPM" 
            value={kegiatan} 
            onChange={(e) => setKegiatan(e.target.value)} 
            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none mb-4" 
          />
          <button 
            onClick={handleGenerate} 
            className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#1E293B] p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <QrCode className="w-5 h-5" /> Generate QR Code
          </button>
        </div>

        {qrUrl && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-300">
            <h3 className="font-bold text-[#1E293B]">QR Kegiatan: {kegiatan}</h3>
            <img src={qrUrl} alt="QR Code" className="w-64 h-64 border-4 border-[#1E293B] p-2 rounded-xl" />
            <p className="text-sm text-slate-500 font-medium">Silakan tunjukkan QR ini ke anggota untuk di-scan.</p>
          </div>
        )}
      </div>
    </div>
  );
}