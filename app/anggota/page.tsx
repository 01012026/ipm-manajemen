"use client";

import { useState } from "react";
import { Search, Plus, MoreVertical, Shield, User as UserIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";

// --- DUMMY DATA ---
const members = [
  { id: 1, name: "Ahmad Dahlan", role: "Ketua Umum", email: "ahmad@ipm.or.id", type: "Pimpinan" },
  { id: 2, name: "Siti Walidah", role: "Sekretaris", email: "siti@ipm.or.id", type: "Pimpinan" },
  { id: 3, name: "Budi Santoso", role: "Anggota Bidang", email: "budi@ipm.or.id", type: "Anggota" },
  { id: 4, name: "Aisyah Putri", role: "Bendahara", email: "aisyah@ipm.or.id", type: "Pimpinan" },
  { id: 5, name: "Tariq Bin Ziyad", role: "Kader", email: "tariq@ipm.or.id", type: "Anggota" },
];

export default function AnggotaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Semua");

  // Logika Pencarian & Filter
  const filteredMembers = members.filter(member => {
    const matchName = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === "Semua" || member.type === filter;
    return matchName && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Header & Sticky Search Bar */}
      <div className="sticky top-0 z-20 pt-2 pb-4 bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Data Anggota</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Kelola database pimpinan & anggota</p>
          </div>
          <button className="bg-primary text-primary-foreground p-2.5 md:px-4 md:py-2.5 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline font-bold text-sm">Tambah</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama anggota..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-foreground shadow-sm transition-all"
            />
          </div>
          <div className="flex bg-surface border border-border p-1 rounded-xl shadow-sm">
            {["Semua", "Pimpinan", "Anggota"].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all ${filter === f ? "bg-navy text-white dark:bg-primary dark:text-primary-foreground" : "text-slate-500 hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List Anggota (Gaya Aplikasi) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredMembers.map((member, index) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass p-4 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-colors group cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-surface border-2 border-border flex items-center justify-center text-lg font-bold text-foreground shadow-sm">
              {member.name.charAt(0)}
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-foreground truncate">{member.name}</h3>
                {member.type === "Pimpinan" && <Shield className="w-3.5 h-3.5 text-primary shrink-0" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                <Mail className="w-3 h-3" /> {member.email}
              </p>
            </div>

            {/* Badge Jabatan */}
            <div className="flex flex-col items-end gap-2">
              <button className="p-1 text-slate-400 hover:text-foreground transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${member.type === "Pimpinan" ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"}`}>
                {member.role}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-foreground font-semibold">Tidak ditemukan</h3>
          <p className="text-slate-500 text-sm">Coba cari dengan kata kunci lain.</p>
        </div>
      )}
    </div>
  );
}