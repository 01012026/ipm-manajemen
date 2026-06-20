"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, Archive, Plus, X, Download, Lock } from "lucide-react";

export default function ArsipPage() {
  const [role, setRole] = useState("anggota");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataArsip, setDataArsip] = useState<any[]>([]);
  const [judul, setJudul] = useState("");
  const [urlFile, setUrlFile] = useState("");

  const fetchData = async () => {
    const { data } = await supabase.from("arsip").select("*").order("id", { ascending: false });
    if (data) setDataArsip(data);
  };

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        if (data) setRole(data.role.toLowerCase());
      }
      fetchData();
    };
    checkRole();
  }, []);

  const handleSimpan = async () => {
    await supabase.from("arsip").insert([{ judul, url_file: urlFile }]);
    setIsModalOpen(false); fetchData();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <div className="bg-[#1E293B] p-6 text-white rounded-b-3xl shadow-xl flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-[#D4AF37]"><ArrowLeft/></Link>
          <h1 className="text-2xl font-black">Arsip Surat</h1>
        </div>
        {/* Tombol Tambah cuma muncul buat Admin */}
        {role === "admin" && (
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex gap-2"><Plus/> Tambah</button>
        )}
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-4 mt-4">
        {dataArsip.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Archive className="text-amber-600" />
              <p className="font-bold">{item.judul}</p>
            </div>
            {/* Download khusus Admin */}
            {role === "admin" ? (
              <a href={item.url_file} target="_blank" className="bg-slate-100 p-3 rounded-xl hover:bg-slate-200"><Download className="w-5 h-5 text-slate-700"/></a>
            ) : (
              <div className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md"><Lock className="w-3 h-3"/> Rahasia</div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && role === "admin" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
            <div className="flex justify-between mb-4"><h3 className="font-bold">Tambah Arsip</h3><button onClick={() => setIsModalOpen(false)}><X/></button></div>
            <input placeholder="Nama Surat" onChange={(e) => setJudul(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl mb-3" />
            <input placeholder="Link File" onChange={(e) => setUrlFile(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl mb-3" />
            <button onClick={handleSimpan} className="w-full bg-[#1E293B] text-white p-3 rounded-xl font-bold">Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
}