"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, CalendarCheck } from "lucide-react";

export default function AbsensiPage() {
  const [dataAbsen, setDataAbsen] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("absensi").select("*").order("id", { ascending: false });
      if (data) setDataAbsen(data);
    };
    fetchData();
  }, []);

  // KODINGAN PINTAR: Ngelompokin data 1 tabel berdasarkan "nama_kegiatan"
  const kegiatanUnik = Array.from(new Set(dataAbsen.map(item => item.nama_kegiatan)));

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <div className="bg-[#1E293B] p-6 text-white rounded-b-3xl shadow-xl">
        <Link href="/" className="text-[#D4AF37] flex gap-2 font-bold mb-4"><ArrowLeft/> Kembali</Link>
        <h1 className="text-2xl font-black">Rekap Kehadiran Terstruktur</h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-8 mt-4">
        {kegiatanUnik.length === 0 ? <p className="text-center text-slate-500">Belum ada absen.</p> : null}

        {/* Bikin kotak/tabel terpisah untuk setiap kegiatan */}
        {kegiatanUnik.map((kegiatan) => (
          <div key={kegiatan} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-[#D4AF37] text-[#1E293B] px-6 py-4 font-black flex justify-between">
              <h3>Kegiatan: {kegiatan}</h3>
              <span className="bg-white px-3 py-1 rounded-full text-xs">
                {dataAbsen.filter(a => a.nama_kegiatan === kegiatan).length} Hadir
              </span>
            </div>
            
            <div className="p-2">
              {dataAbsen.filter((absen) => absen.nama_kegiatan === kegiatan).map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                  <div className="font-bold text-slate-400 w-6">{index + 1}.</div>
                  <div className="flex-1 font-bold text-[#1E293B]">{item.nama_anggota}</div>
                  <div className="text-xs text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-bold">Hadir</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}