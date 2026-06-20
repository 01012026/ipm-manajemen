"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { ArrowLeft, Wallet, Plus, X, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function KeuanganPage() {
  const router = useRouter();
  const [role, setRole] = useState("anggota");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataKeuangan, setDataKeuangan] = useState<any[]>([]);
  const [saldo, setSaldo] = useState(0);

  // State Form
  const [keterangan, setKeterangan] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [jenis, setJenis] = useState("Pemasukan");

  const fetchData = async () => {
    const { data, error } = await supabase.from("keuangan").select("*").order("id", { ascending: false });
    if (!error && data) {
      setDataKeuangan(data);
      let total = 0;
      data.forEach((item) => {
        if (item.jenis === "Pemasukan") total += Number(item.jumlah);
        else total -= Number(item.jumlah);
      });
      setSaldo(total);
    }
  };

  useEffect(() => {
    const initData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      
      // Cek Role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setRole(profile.role.toLowerCase());
      }
      
      setLoading(false);
      fetchData();
    };
    
    initData();
  }, [router]);

  const handleSimpan = async () => {
    if (!keterangan || !jumlah) return alert("Isi form dengan lengkap!");
    const { error } = await supabase.from("keuangan").insert([{ keterangan, jumlah: Number(jumlah), jenis }]);
    if (error) {
      alert("Gagal: " + error.message);
    } else {
      alert("Data berhasil disimpan!");
      setIsModalOpen(false); 
      setKeterangan(""); 
      setJumlah(""); 
      fetchData();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold relative z-10"><ArrowLeft /> Kembali</Link>
        <div className="flex justify-between items-center relative z-10">
            <h1 className="text-2xl md:text-3xl font-black">Keuangan</h1>
            
            {/* TOMBOL TAMBAH DATA KHUSUS ADMIN */}
            {role === "admin" && (
              <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1E293B] px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors">
                  <Plus className="w-5 h-5" /> Tambah Data
              </button>
            )}
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto mt-[-20px] relative z-20 space-y-6">
        <div className="bg-[#1E293B] text-white p-6 rounded-2xl shadow-lg border border-slate-700">
          <p className="text-[#94A3B8] font-bold mb-1">Total Saldo Kas</p>
          <h2 className="text-4xl font-black text-[#D4AF37]">Rp {saldo.toLocaleString("id-ID")}</h2>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-[#1E293B] mb-2 px-2">Riwayat Transaksi</h3>
          {dataKeuangan.length === 0 ? (
            <p className="text-center text-slate-400 py-10 bg-white rounded-2xl border border-slate-200">Belum ada transaksi.</p>
          ) : (
            dataKeuangan.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${item.jenis === "Pemasukan" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                    {item.jenis === "Pemasukan" ? <ArrowDownRight /> : <ArrowUpRight />}
                  </div>
                  <div>
                    <p className="font-bold text-[#1E293B]">{item.keterangan}</p>
                    <p className="text-xs text-slate-400">{item.tanggal}</p>
                  </div>
                </div>
                <p className={`font-bold ${item.jenis === "Pemasukan" ? "text-emerald-600" : "text-red-600"}`}>
                  {item.jenis === "Pemasukan" ? "+" : "-"} Rp {Number(item.jumlah).toLocaleString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL FORM KHUSUS ADMIN */}
      {isModalOpen && role === "admin" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-[#1E293B]">Tambah Transaksi</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500"><X /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Keterangan (Contoh: Iuran)" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              <input type="number" placeholder="Jumlah (Contoh: 50000)" value={jumlah} onChange={(e) => setJumlah(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none" />
              <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4AF37] outline-none font-bold">
                <option value="Pemasukan">Pemasukan</option>
                <option value="Pengeluaran">Pengeluaran</option>
              </select>
              <button onClick={handleSimpan} className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white p-4 rounded-xl font-bold transition-all mt-2">Simpan Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}