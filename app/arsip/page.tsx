"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, FileText, Download, Plus, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const files = [
  { id: 1, name: "SK Pimpinan Daerah 2026.pdf", type: "Surat Keputusan", date: "10 Jan 2026", size: "2.4 MB" },
  { id: 2, name: "Proposal Musyawarah.docx", type: "Proposal", date: "15 Mei 2026", size: "1.1 MB" },
  { id: 3, name: "Surat Undangan Rapat.pdf", type: "Surat Keluar", date: "16 Jun 2026", size: "450 KB" },
  { id: 4, name: "LPJ Ramadhan 1447 H.pdf", type: "Laporan", date: "20 Mei 2026", size: "3.2 MB" },
];

export default function ArsipPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // PROTEKSI HALAMAN
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      router.push("/"); // Usir ke Dashboard kalau bukan Admin
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return <div className="p-8 text-center text-slate-500">Memeriksa akses...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">E-Arsip</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pusat data & dokumen IPM</p>
        </div>
        <button className="bg-primary text-white p-2.5 md:px-4 md:py-2.5 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline font-bold text-sm">Upload File</span>
        </button>
      </div>

      {/* Kategori Folder */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Surat Masuk", "Surat Keluar", "Proposal", "LPJ"].map((folder, i) => (
          <motion.div key={folder} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
            <FolderOpen className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{folder}</span>
          </motion.div>
        ))}
      </div>

      {/* Pencarian */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" placeholder="Cari nama dokumen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white shadow-sm transition-all"
          />
        </div>
        <button className="glass p-3 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white border border-border shadow-sm">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Daftar File */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-4">File Terbaru</h2>
      <div className="glass rounded-2xl overflow-hidden">
        {files.map((file, i) => (
          <motion.div key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                <span className="bg-slate-100 dark:bg-slate-800 border border-border px-1.5 py-0.5 rounded text-[10px]">{file.type}</span>
                {file.date} • {file.size}
              </p>
            </div>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors bg-white dark:bg-slate-900 rounded-lg border border-border shadow-sm active:scale-95">
              <Download className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}