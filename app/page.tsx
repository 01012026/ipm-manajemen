"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { Users, BookOpen, CalendarCheck, LogOut, LayoutDashboard, QrCode, ScanLine, Wallet, Archive } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState("anggota");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.push("/login");
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
      if (profile) setRole(profile.role.toLowerCase());
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center"><div className="animate-spin h-10 w-10 border-4 border-[#D4AF37] border-t-transparent rounded-full"></div></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      <div className="bg-[#1E293B] p-8 text-white rounded-b-3xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#D4AF37]">IPM APP</h1>
          <p className="mt-2">Login sebagai: <span className="bg-[#D4AF37] text-[#1E293B] px-2 py-1 rounded font-bold uppercase text-xs">{role}</span></p>
        </div>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl flex items-center gap-2 font-bold"><LogOut className="w-5 h-5"/> Keluar</button>
      </div>

      <div className="p-8 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* SEMUA BISA AKSES INI */}
        <Link href="/materi" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><BookOpen className="text-amber-600 w-8 h-8"/><p className="font-bold text-slate-600">Materi</p></Link>
        <Link href="/arsip" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><Archive className="text-orange-600 w-8 h-8"/><p className="font-bold text-slate-600">Arsip</p></Link>
        <Link href="/keuangan" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><Wallet className="text-green-600 w-8 h-8"/><p className="font-bold text-slate-600">Keuangan</p></Link>
        <Link href="/anggota" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><Users className="text-blue-600 w-8 h-8"/><p className="font-bold text-slate-600">Anggota</p></Link>
        <Link href="/scan" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><ScanLine className="text-purple-600 w-8 h-8"/><p className="font-bold text-slate-600">Scan Kehadiran</p></Link>
        <Link href="/absensi" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><CalendarCheck className="text-emerald-600 w-8 h-8"/><p className="font-bold text-slate-600">Data Absen</p></Link>
        
        {/* KHUSUS ADMIN BISA BIKIN QR */}
        {role === "admin" && (
          <Link href="/generate" className="bg-white p-6 rounded-2xl shadow border flex flex-col items-center gap-2 hover:border-[#D4AF37]"><QrCode className="text-indigo-600 w-8 h-8"/><p className="font-bold text-slate-600">Bikin QR (Admin)</p></Link>
        )}
      </div>
    </div>
  );
}