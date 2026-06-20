"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, BookOpen, Plus, X, Eye } from "lucide-react";

export default function MateriPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataMateri, setDataMateri] = useState<any[]>([]);

  // State Form
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Kemuhammadiyahan");
  const [urlFile, setUrlFile] = useState("");

  const fetchData = async () => {
    const { data, error } = await supabase.from("materi").select("*").order("id", { ascending: false });
    if (!error && data) setDataMateri(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSimpan = async () => {
    if (!judul || !urlFile) return alert("Isi form dengan lengkap!");
    const { error } = await supabase.from("materi").insert([{ judul, kategori, url_file: urlFile }]);
    if (error) {
      alert("Gagal: " + error.message);
    } else {
      alert("Materi berhasil ditambahkan!");
      setIsModalOpen(false);
      setJudul("");
      setUrlFile("");
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-black">Pustaka Materi</h1>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" /> Tambah Materi
            </button>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        {dataMateri.length === 0 ? (
          <p className="text-center text-slate-400 py-10 bg-white rounded-2xl border border-slate-200">Belum ada materi kajian.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataMateri.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><BookOpen className="w-6 h-6" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 tracking-wider mb-1 uppercase">{item.kategori}</p>
                    <h3 className="font-bold text-[#1E293B] text-lg leading-tight">{item.judul}</h3>
                  </div>
                </div>
                <a href={item.url_file} target="_blank" rel="noreferrer" className="w-full bg-[#F8FAFC] hover:bg-slate-100 text-[#1E293B] border border-[#CBD5E1] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Eye className="w-5 h-5" /> Buka Materi
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-[#1E293B]">Tambah Materi</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500"><X /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Judul Materi" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none font-bold text-slate-700">
                <option value="Kemuhammadiyahan">Kemuhammadiyahan</option>
                <option value="Keislaman">Keislaman</option>
                <option value="Ke-IPM-an">Ke-IPM-an</option>
                <option value="Umum">Umum</option>
              </select>
              <input type="text" placeholder="Link Materi (G-Drive / PDF Link)" value={urlFile} onChange={(e) => setUrlFile(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none text-sm" />
              <button onClick={handleSimpan} className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white p-4 rounded-xl font-bold transition-all mt-2">Simpan Materi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}