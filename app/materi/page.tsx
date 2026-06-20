"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, BookOpen, Plus, X, Download } from "lucide-react";

export default function MateriPage() {
  const [role, setRole] = useState("anggota");
  const [dataMateri, setDataMateri] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [urlFile, setUrlFile] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        if (data) setRole(data.role.toLowerCase());
      }
      fetchMateri();
    };
    init();
  }, []);

  // Fungsi buat narik data materi
  const fetchMateri = async () => {
    const { data: materi } = await supabase.from("materi").select("*").order("id", { ascending: false });
    if (materi) setDataMateri(materi);
  };

  // Fungsi buat nyimpen materi baru ke Supabase
  const handleTambah = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !urlFile) return alert("Isi semua kolom!");
    
    setLoadingSubmit(true);
    const { error } = await supabase.from("materi").insert([{ judul, url_file: urlFile }]);
    setLoadingSubmit(false);

    if (error) {
      alert("Gagal menambahkan materi: " + error.message);
    } else {
      alert("Materi berhasil ditambahkan!");
      setJudul("");
      setUrlFile("");
      setIsModalOpen(false); // Tutup modal otomatis
      fetchMateri(); // Refresh daftar materi otomatis
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans relative">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 text-white flex justify-between items-center shadow-xl">
        <Link href="/" className="text-[#D4AF37] flex gap-2 font-bold hover:text-white transition-colors">
          <ArrowLeft/> Materi
        </Link>
        {role === "admin" && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#D4AF37] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex gap-2 hover:bg-yellow-500 transition-colors shadow-md"
          >
            <Plus/> Tambah
          </button>
        )}
      </div>

      {/* List Materi */}
      <div className="p-6 max-w-4xl mx-auto space-y-4 mt-2">
        {dataMateri.length === 0 ? (
          <p className="text-center text-slate-500 mt-10 font-medium">Belum ada materi yang dibagikan.</p>
        ) : (
          dataMateri.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center hover:border-[#D4AF37] transition-colors">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl hidden sm:block">
                  <BookOpen className="w-5 h-5"/>
                </div>
                <p className="font-bold text-[#1E293B]">{item.judul}</p>
              </div>
              <a 
                href={item.url_file} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1E293B] text-white px-4 py-3 rounded-xl flex gap-2 text-sm font-bold hover:bg-[#0F172A] transition-colors shadow-sm"
              >
                <Download className="w-4 h-4"/> Buka
              </a>
            </div>
          ))
        )}
      </div>
      
      {/* Modal Tambah Khusus Admin (Sekarang beneran ada wujudnya) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 text-slate-400 hover:text-red-500 transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black text-[#1E293B] mb-6 mt-2">Tambah Materi Baru</h2>
            
            <form onSubmit={handleTambah} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Judul Materi</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Modul Taruna Melati 1"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:border-[#D4AF37] outline-none bg-slate-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Link File / GDrive</label>
                <input 
                  type="url" 
                  placeholder="https://drive.google.com/..."
                  value={urlFile}
                  onChange={(e) => setUrlFile(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:border-[#D4AF37] outline-none bg-slate-50"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loadingSubmit}
                className="w-full bg-[#1E293B] text-white p-4 rounded-xl font-bold mt-2 hover:bg-[#0F172A] transition-colors disabled:opacity-50 shadow-md"
              >
                {loadingSubmit ? "Menyimpan..." : "Simpan Materi"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}