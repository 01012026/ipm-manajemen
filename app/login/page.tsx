"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { Eye, EyeOff, LogIn, BookOpen } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Pakai Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg("Gagal masuk: Email atau Password salah.");
      setLoading(false);
    } else {
      router.push("/"); // Arahin ke Dashboard kalau sukses
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
        
        {/* Header Kartu Login - Navy & Gold */}
        <div className="bg-[#1E293B] p-8 text-center relative overflow-hidden shadow-inner">
          <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl" />
          <BookOpen className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 relative z-10" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] relative z-10 tracking-tight">
            Selamat Datang
          </h1>
          <p className="text-[#94A3B8] mt-2 text-sm font-medium tracking-wide relative z-10">
            Sistem Informasi Manajemen IPM
          </p>
        </div>
        
        {/* Form Login */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Notifikasi Error */}
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center animate-pulse">
                {errorMsg}
              </div>
            )}
            
            {/* Input Email/Username */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#334155] tracking-wide">Email / Username</label>
              <input 
                type="text" 
                placeholder="Masukkan email atau username..." 
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E293B] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#334155] tracking-wide">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Masukkan password..." 
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E293B] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1E293B] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Memproses..." : (
                <>
                  Masuk Sekarang <LogIn className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}