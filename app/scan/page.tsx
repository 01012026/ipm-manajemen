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
  const [userEmail, setUserEmail] = useState("");
  const [isScanned, setIsScanned] = useState(false); // Kunci biar ga ke-scan 2 kali

  useEffect(() => {
    const cekLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        // Tarik email otomatis dari sistem, GA BISA BOHONG!
        setUserEmail(session.user.email); 
        setLoading(false);
      }
    };
    cekLogin();
  }, [router]);

  const handleScan = async (result: any) => {
    // Kalau udah berhasil scan, gembok kameranya biar ga ngirim data dobel
    if (isScanned) return;

    let scannedText = "";
    if (result && result.length > 0) {
      scannedText = result[0].rawValue;
    } else if (result && typeof result === "string") {
      scannedText = result;
    }

    if (scannedText) {
      setIsScanned(true); // Gembok aktif
      
      // Langsung absen otomatis tanpa perlu klik tombol!
      const { error } = await supabase.from("absensi").insert([{ 
        nama_kegiatan: scannedText, 
        nama_anggota: userEmail // Ini ditarik otomatis dari akun yang login
      }]);

      if (error) {
        alert("Gagal mencatat: " + error.message);
        setIsScanned(false); // Buka gembok kalau error
      } else {
        alert(`✅ Berhasil! Kehadiran untuk ${userEmail} tercatat.`);
        router.push("/absensi"); 
      }
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
          
          <div className="text-center mb-4">
            <p className="text-sm font-bold text-slate-500">Mencatat kehadiran untuk:</p>
            <p className="text-[#1E293B] font-black text-lg bg-slate-100 py-2 mt-1 rounded-lg border border-slate-200">{userEmail}</p>
          </div>

          {/* Kamera Scanner Asli */}
          <div className="overflow-hidden rounded-xl border-2 border-slate-200 mb-6 bg-black relative">
            {isScanned && (
              <div className="absolute inset-0 z-10 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                <p className="text-white font-bold animate-pulse">Memproses Kehadiran...</p>
              </div>
            )}
            <Scanner
              onScan={handleScan}
              onError={(error: any) => console.log("Kamera error:", error?.message)}
            />
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-[#1E293B]">Arahkan kamera ke QR Code</p>
            <p className="text-xs text-slate-500 mt-1">Sistem akan otomatis mencatat data Anda.</p>
          </div>

        </div>
      </div>
    </div>
  );
}