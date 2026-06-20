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

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        if (data) setRole(data.role.toLowerCase());
      }
      const { data: materi } = await supabase.from("materi").select("*");
      if (materi) setDataMateri(materi);
    };
    init();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <div className="bg-[#1E293B] p-6 text-white flex justify-between items-center shadow-xl">
        <Link href="/" className="text-[#D4AF37] flex gap-2 font-bold"><ArrowLeft/> Materi</Link>
        {role === "admin" && <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-bold flex gap-2"><Plus/> Tambah</button>}
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {dataMateri.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
            <div className="flex gap-4"><BookOpen className="text-blue-600"/><p className="font-bold">{item.judul}</p></div>
            {/* SEMUA BISA DOWNLOAD MATERI */}
            <a href={item.url_file} target="_blank" className="bg-[#1E293B] text-white p-3 rounded-xl flex gap-2 text-sm font-bold hover:bg-slate-800"><Download className="w-4 h-4"/> Buka</a>
          </div>
        ))}
      </div>
      
      {/* Modal Tambah Khusus Admin, logic sama kayak sebelumnya */}
    </div>
  );
}