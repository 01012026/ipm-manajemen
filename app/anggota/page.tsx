"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, Users, Plus, X, UserCheck } from "lucide-react";

export default function AnggotaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataAnggota, setDataAnggota] = useState<any[]>([]);

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [nbam, setNbam] = useState("");

  const fetchData = async () => {
    const { data, error } = await supabase.from("anggota").select("*").order("id", { ascending: false });
    if (!error && data) setDataAnggota(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSimpan = async () => {
    if (!nama || !jabatan) return alert("Nama dan Jabatan wajib diisi!");
    const { error } = await supabase.from("anggota").insert([{ nama, jabatan, nbam }]);
    if (error) alert("Gagal: " + error.message);
    else {
      alert("Anggota berhasil ditambah!");
      setIsModalOpen(false); setNama(""); setJabatan(""); setNbam(""); fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-black">Data Anggota</h1>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" /> Tambah
            </button>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        {dataAnggota.length === 0 ? (
          <p className="text-center text-slate-400 py-10 bg-white rounded-2xl border border-slate-200">Belum ada data anggota.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataAnggota.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                  {item.nama.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B]">{item.nama}</h3>
                  <p className="text-sm text-slate-500">{item.jabatan} • NBAM: {item.nbam || "-"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">Tambah Anggota</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500"><X /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border focus:border-[#D4AF37] outline-none" />
              <input type="text" placeholder="Jabatan (Contoh: Ketua Umum)" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border focus:border-[#D4AF37] outline-none" />
              <input type="text" placeholder="NBAM (Opsional)" value={nbam} onChange={(e) => setNbam(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border focus:border-[#D4AF37] outline-none" />
              <button onClick={handleSimpan} className="w-full bg-[#1E293B] text-white p-4 rounded-xl font-bold mt-2">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}