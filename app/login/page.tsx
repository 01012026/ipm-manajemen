"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, User, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logika Role: Admin vs Anggota
    if (username === "admin" && password === "ipm123") {
      setErrorMsg("");
      document.cookie = "auth_token=karcis_admin; path=/; max-age=86400";
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userName", "Ahmad Dahlan (Admin)");
      router.push("/");
    } 
    else if (username === "anggota" && password === "ipm123") {
      setErrorMsg("");
      document.cookie = "auth_token=karcis_anggota; path=/; max-age=86400";
      localStorage.setItem("userRole", "anggota");
      localStorage.setItem("userName", "Budi Santoso (Anggota)");
      router.push("/");
    } 
    else {
      setErrorMsg("Username atau Password tidak sesuai!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Ornamen Latar Belakang (Aksen Blur Navy & Amber) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass w-full max-w-md p-8 md:p-10 rounded-[2rem] z-10 shadow-2xl relative"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-primary/30">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Selamat Datang</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 text-center">
            Sistem Manajemen IPM
          </p>
        </div>

        {/* Info Akun Dummy */}
        <div className="mb-6 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Info className="w-4 h-4" /> Daftar Akun Testing (Pw: ipm123)
          </div>
          <p>• Admin: <b>admin</b> (Akses Penuh)</p>
          <p>• Anggota: <b>anggota</b> (Akses Terbatas)</p>
        </div>

        {errorMsg && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{errorMsg}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username" 
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm shadow-sm text-foreground placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm shadow-sm text-foreground placeholder:text-slate-400"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 mt-4">
            Masuk Sekarang <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}