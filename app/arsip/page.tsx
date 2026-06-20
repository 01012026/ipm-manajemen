"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, Archive, Plus, X, Download, Lock } from "lucide-react";

export default function ArsipPage() {
  const router = useRouter();
  const [role, setRole] = useState("anggota");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataArsip, setDataArsip] = useState<any[]>([]);
  
  const [judul, setJudul] = useState("");
  const [urlFile, setUrlFile] = useState("");

  const fetchData = async () => {
    const { data, error } = await supabase.from("arsip").select("*").order("id", { ascending: false });
    if (!error && data) setDataArsip(data);
  };

  useEffect(() => {
    const initData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.push("/login");
      
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
      if (profile) setRole(profile.role.toLowerCase());
      
      setLoading(false);
      fetchData();
    };
    initData();
  }, [router]);

  const handleSimpan = async () => {
    if (!judul || !urlFile) return alert("Isi form dengan lengkap!");
    const { error } = await supabase.from("arsip").insert([{ judul, url_file: urlFile }]);
    if (error) alert("Gagal: " + error.message);
    else {
      alert("Arsip berhasil ditambahkan!");
      setIsModalOpen(false); setJudul(""); setUrlFile(""); fetchData();
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-black">Pengarsipan</h1>
            {role === "admin" && (
              <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Tambah Arsip
              </button>
            )}
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        {dataArsip.length === 0 ? (
          <p className="text-center text-slate-400 py-10 bg-white rounded-2xl border border-slate-200">Belum ada dokumen arsip.</p>
        ) : (
          dataArsip.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex justify-between items-center hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Archive /></div>
                <div>
                  <p className="font-bold text-[#1E293B] text-lg">{item.judul}</p>
                  <p className="text-xs text-slate-400">{item.tanggal}</p>
                </div>
              </div>
              
              {role === "admin" ? (
                <a href={item.url_file} target="_blank" rel="noreferrer" className="bg-[#F8FAFC] hover:bg-slate-100 p-3 rounded-xl text-[#1E293B] border border-slate-200 transition-colors">
                  <Download className="w-5 h-5" />
                </a>
              ) : (
                <div className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg font-bold border border-red-100"><Lock className="w-4 h-4"/> Akses Terbatas</div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && role === "admin" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-[#1E293B]">Tambah Arsip</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500"><X /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Nama Dokumen" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              <input type="text" placeholder="Link Dokumen" value={urlFile} onChange={(e) => setUrlFile(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none text-sm" />
              <button onClick={handleSimpan} className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white p-4 rounded-xl font-bold transition-all">Simpan Arsip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}