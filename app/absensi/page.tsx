"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, CalendarCheck } from "lucide-react";

export default function AbsensiPage() {
  const [dataAbsen, setDataAbsen] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("absensi").select("*").order("id", { ascending: false });
      if (!error && data) setDataAbsen(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <h1 className="text-2xl md:text-3xl font-black">Rekap Absensi</h1>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        {dataAbsen.length === 0 ? (
          <p className="text-center text-slate-400 py-10 bg-white rounded-2xl border border-slate-200">Belum ada data kehadiran.</p>
        ) : (
          <div className="space-y-3">
            {dataAbsen.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><CalendarCheck className="w-5 h-5" /></div>
                  <div>
                    <p className="font-bold text-[#1E293B]">{item.nama_anggota}</p>
                    <p className="text-xs text-slate-500 font-medium">Hadir di: {item.nama_kegiatan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">HADIR</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}