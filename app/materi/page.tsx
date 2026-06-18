"use client";

import { useState, useEffect } from "react";
import { BookOpen, Search, Download, Eye, FileText, PlayCircle, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Data awal (Default)
const initialMateris = [
  { id: 1, title: "Modul Taruna Melati 1", category: "Perkaderan", type: "pdf", size: "4.5 MB", icon: FileText, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { id: 2, title: "Sejarah Muhammadiyah", category: "Kemuhammadiyahan", type: "pdf", size: "2.1 MB", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  { id: 3, title: "Pedoman Administrasi IPM", category: "Organisasi", type: "pdf", size: "3.8 MB", icon: FileText, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
];

export default function MateriPage() {
  const [materis, setMateris] = useState(initialMateris);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState("anggota");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form tambah materi
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Perkaderan");
  const [newType, setNewType] = useState("pdf");
  const [newSize, setNewSize] = useState("");

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "anggota");
  }, []);

  // Fungsi saat tombol "Simpan" diklik
  const handleAddMateri = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Nentuin warna dan ikon otomatis berdasarkan tipe file
    const icon = newType === "video" ? PlayCircle : FileText;
    const color = newType === "video" ? "text-rose-500" : "text-blue-500";
    const bg = newType === "video" ? "bg-rose-100 dark:bg-rose-900/30" : "bg-blue-100 dark:bg-blue-900/30";

    const newItem = {
      id: Date.now(), // Bikin ID acak
      title: newTitle,
      category: newCategory,
      type: newType,
      size: newSize || (newType === "video" ? "Link YouTube" : "1.0 MB"),
      icon, color, bg
    };

    // Masukin materi baru ke urutan paling atas
    setMateris([newItem, ...materis]);
    
    // Tutup popup dan reset form
    setIsModalOpen(false);
    setNewTitle("");
    setNewSize("");
  };

  const filteredMateri = materis.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Header & Tombol Tambah (Khusus Admin) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pustaka Materi</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Tingkatkan wawasan dan keilmuanmu.</p>
        </div>
        
        {userRole === "admin" ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white p-2.5 md:px-4 md:py-2.5 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline font-bold text-sm">Tambah Materi</span>
          </button>
        ) : (
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" placeholder="Cari modul atau materi kajian..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white shadow-sm transition-all"
        />
      </div>

      {/* List Materi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <AnimatePresence>
          {filteredMateri.map((materi, i) => (
            <motion.div 
              key={materi.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2, delay: i * 0.05 }}
              className="glass p-5 rounded-2xl border border-border hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 ${materi.bg}`} />
              <div className="flex gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${materi.bg}`}>
                  <materi.icon className={`w-6 h-6 ${materi.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">{materi.category}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight mt-0.5 truncate">{materi.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{materi.type.toUpperCase()} • {materi.size}</p>
                  
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
                      <Eye className="w-4 h-4" /> Buka
                    </button>
                    {materi.type === 'pdf' && (
                      <button className="px-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMateri.length === 0 && (
        <div className="text-center py-10 text-slate-500">Materi tidak ditemukan.</div>
      )}

      {/* POPUP (MODAL) FORM TAMBAH MATERI - KHUSUS ADMIN */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Latar Belakang Blur */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Kotak Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 z-10"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tambah Materi Baru</h2>
              
              <form onSubmit={handleAddMateri} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1">Judul Materi</label>
                  <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Misal: Materi Kemuhammadiyahan" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1">Kategori</label>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white">
                      <option value="Perkaderan">Perkaderan</option>
                      <option value="Kemuhammadiyahan">Kemuhammadiyahan</option>
                      <option value="Organisasi">Organisasi</option>
                      <option value="Skill">Skill</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1">Tipe File</label>
                    <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white">
                      <option value="pdf">Dokumen (PDF)</option>
                      <option value="video">Video (Link)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 ml-1">Ukuran / Info File</label>
                  <input type="text" value={newSize} onChange={(e) => setNewSize(e.target.value)} placeholder={newType === 'video' ? "Misal: YouTube Link" : "Misal: 2.5 MB"} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white" />
                </div>

                <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-primary/30 mt-2">
                  Simpan Materi
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}