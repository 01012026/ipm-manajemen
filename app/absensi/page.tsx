"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Megaphone, Bell, ChevronRight, CheckCircle2, Users, X, FileSpreadsheet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DUMMY DATA ---
const agendas = [
  { id: 1, title: "Rapat Evaluasi Bulanan", date: "20 Juni 2026", time: "15:30 WIB", location: "Aula Pimpinan Daerah", status: "Wajib Hadir" },
  { id: 2, title: "Kajian Rutin Keislaman", date: "25 Juni 2026", time: "16:00 WIB", location: "Masjid Raya", status: "Terbuka" },
];

const infos = [
  { id: 1, title: "Pendaftaran Kader Baru", date: "18 Juni 2026", content: "Telah dibuka pendaftaran Taruna Melati 1. Silakan bagikan formulir ke setiap ranting." },
  { id: 2, title: "Iuran Bulanan", date: "15 Juni 2026", content: "Mengingatkan kembali untuk iuran kas bulan ini sudah bisa disetorkan ke Bendahara." },
];

// DUMMY DATA KEHADIRAN (Khusus Admin)
const dummyAttendees = [
  { id: 1, name: "Ahmad Dahlan", role: "Ketua Umum", time: "15:10 WIB" },
  { id: 2, name: "Siti Walidah", role: "Sekretaris", time: "15:15 WIB" },
  { id: 3, name: "Budi Santoso", role: "Anggota Bidang", time: "15:25 WIB" },
];

export default function AbsensiPage() {
  const [activeTab, setActiveTab] = useState<"agenda" | "info">("agenda");
  const [userRole, setUserRole] = useState("anggota");
  const [isRekapOpen, setIsRekapOpen] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState("");

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "anggota");
  }, []);

  const openRekap = (agendaTitle: string) => {
    setSelectedAgenda(agendaTitle);
    setIsRekapOpen(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-8 relative">
      {/* Header & Tabs */}
      <div className="sticky top-0 z-20 pt-2 pb-4 bg-background/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Agenda & Info</h1>
        
        <div className="flex bg-white dark:bg-slate-900 border border-border p-1 rounded-xl shadow-sm">
          <button 
            onClick={() => setActiveTab("agenda")}
            className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "agenda" ? "bg-navy dark:bg-primary text-white shadow-md" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            <Calendar className="w-4 h-4" /> Jadwal Kegiatan
          </button>
          <button 
            onClick={() => setActiveTab("info")}
            className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "info" ? "bg-navy dark:bg-primary text-white shadow-md" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
          >
            <Megaphone className="w-4 h-4" /> Pengumuman
          </button>
        </div>
      </div>

      {/* Konten Agenda */}
      {activeTab === "agenda" && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          {agendas.map((agenda, i) => (
            <motion.div 
              key={agenda.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-2xl" />
              
              <div className="flex justify-between items-start mb-3 pl-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight pr-4">{agenda.title}</h3>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${agenda.status === "Wajib Hadir" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
                  {agenda.status}
                </span>
              </div>
              
              <div className="space-y-2 pl-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-primary" /> {agenda.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-primary" /> {agenda.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-primary" /> {agenda.location}
                </div>
              </div>

              {/* TOMBOL BERBEDA BERDASARKAN ROLE */}
              <div className="pl-2 pt-2 border-t border-border">
                 {userRole === "admin" ? (
                   <button 
                    onClick={() => openRekap(agenda.title)}
                    className="w-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                   >
                     <Users className="w-4 h-4" /> Lihat Daftar Hadir (3/35)
                   </button>
                 ) : (
                   <button className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 border border-border">
                      <CheckCircle2 className="w-4 h-4" /> Konfirmasi Kehadiran
                   </button>
                 )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Konten Pengumuman */}
      {activeTab === "info" && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          {infos.map((info, i) => (
            <motion.div key={info.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{info.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{info.date}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-border pt-3">
                {info.content}
              </p>
              <button className="mt-3 text-primary text-sm font-semibold flex items-center hover:underline">
                Baca selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* POPUP DAFTAR HADIR (KHUSUS ADMIN) */}
      <AnimatePresence>
        {isRekapOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsRekapOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] z-10"
            >
              <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-t-3xl md:rounded-3xl z-20">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Rekap Kehadiran</h2>
                  <p className="text-xs text-primary font-semibold truncate max-w-[200px]">{selectedAgenda}</p>
                </div>
                <button onClick={() => setIsRekapOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full hover:text-slate-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto no-scrollbar flex-1">
                <div className="space-y-3">
                  {dummyAttendees.map((person, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                          {person.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{person.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{person.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-md mb-1">
                          Hadir
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{person.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 border-t border-border bg-slate-50 dark:bg-slate-900/50 rounded-b-3xl mt-auto">
                <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                  <FileSpreadsheet className="w-5 h-5" /> Export ke Excel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}