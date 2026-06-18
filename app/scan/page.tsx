"use client";

import { useState, useEffect } from "react";
import { QrCode, ScanLine, CheckCircle2, RefreshCw, Smartphone, User, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScanPage() {
  const [userRole, setUserRole] = useState<"admin" | "anggota">("anggota");
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState<"scanner" | "generator">("scanner");
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [timer, setTimer] = useState(10);

  // Ambil profil dari memori browser
  useEffect(() => {
    const role = localStorage.getItem("userRole") as "admin" | "anggota";
    const name = localStorage.getItem("userName");
    if (role) {
      setUserRole(role);
      if (role === "anggota") setActiveTab("scanner");
    }
    if (name) setUserName(name);
  }, []);

  // Timer QR Admin
  useEffect(() => {
    if (activeTab === "generator") {
      const interval = setInterval(() => setTimer((prev) => (prev === 1 ? 10 : prev - 1)), 1000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const simulateScan = () => {
    if (scanStatus !== "idle") return;
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("success");
      setTimeout(() => setScanStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-8">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sistem Kehadiran QR</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Validasi instan tanpa antre.</p>
        </div>
        <div className="glass px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold text-foreground shadow-sm">
          <User className="w-4 h-4 text-primary" /> {userName || "Memuat..."}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface border border-border p-1 rounded-xl shadow-sm w-fit">
        <button 
          onClick={() => setActiveTab("scanner")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "scanner" ? "bg-navy text-white dark:bg-primary dark:text-primary-foreground shadow-md" : "text-slate-500 hover:text-foreground"}`}
        >
          <ScanLine className="w-4 h-4" /> Scanner
        </button>
        {userRole === "admin" && (
          <button 
            onClick={() => setActiveTab("generator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "generator" ? "bg-navy text-white dark:bg-primary dark:text-primary-foreground shadow-md" : "text-slate-500 hover:text-foreground"}`}
          >
            <QrCode className="w-4 h-4" /> Buat QR
          </button>
        )}
      </div>

      {/* Konten Utama */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2rem] overflow-hidden relative"
      >
        {userRole === "anggota" && (
          <div className="bg-primary/20 text-primary text-xs font-bold text-center py-2 z-10 border-b border-primary/30 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Akses Admin ditutup.
          </div>
        )}

        {/* --- SCANNER KAMERA --- */}
        {activeTab === "scanner" && (
          <div className="p-6 md:p-10 flex flex-col items-center">
            <h2 className="text-lg font-bold text-foreground mb-6 text-center">Arahkan kamera ke QR Code</h2>
            
            <div className="relative w-full max-w-sm aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl cursor-pointer" onClick={simulateScan}>
              {/* Dummy Camera Image */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-[2px] grayscale" />
              
              {/* Kotak bidik */}
              <div className="absolute inset-8 border-2 border-white/20 rounded-2xl" />
              <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <div className="absolute bottom-8 left-8 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <div className="absolute bottom-8 right-8 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl" />

              {/* Garis Laser */}
              {scanStatus !== "success" && (
                <motion.div 
                  className="absolute left-8 right-8 h-0.5 bg-primary shadow-[0_0_20px_rgba(217,119,6,1)] z-10"
                  animate={{ top: ["2rem", "calc(100% - 2rem)", "2rem"] }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
              )}

              {/* Overlay Status */}
              <AnimatePresence>
                {scanStatus === "scanning" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                    <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-white font-bold tracking-widest">MEMVALIDASI...</p>
                  </motion.div>
                )}
                {scanStatus === "success" && (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-emerald-500/95 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                      <CheckCircle2 className="w-20 h-20 text-white mb-4 shadow-xl rounded-full" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-white">BERHASIL!</h3>
                    <p className="text-emerald-100 font-medium mt-2 bg-black/20 px-4 py-1 rounded-full">{userName.split(' ')[0]} • 10:56 WIB</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-slate-500 text-xs mt-6 text-center font-medium">Klik area kamera untuk simulasi *scan* sukses.</p>
          </div>
        )}

        {/* --- GENERATOR QR (ADMIN) --- */}
        {activeTab === "generator" && userRole === "admin" && (
          <div className="p-6 md:p-12 flex flex-col items-center bg-navy text-white relative">
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-primary/30 rounded-full blur-[80px]" />
            <h2 className="text-2xl font-black text-center z-10">Rapat Evaluasi Bulanan</h2>
            <p className="text-slate-400 text-sm mt-1 mb-8 z-10 flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> Buka aplikasi dan scan QR ini
            </p>

            <div className="bg-white p-6 md:p-8 rounded-[2rem] relative z-10 shadow-[0_0_50px_rgba(217,119,6,0.2)]">
              <QrCode className="w-48 h-48 md:w-64 md:h-64 text-slate-900" strokeWidth={1} />
              
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold border border-slate-700 flex items-center gap-2 shadow-xl whitespace-nowrap">
                <RefreshCw className={`w-4 h-4 text-primary ${timer <= 3 ? "animate-spin" : ""}`} />
                Diperbarui dalam {timer}d
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}