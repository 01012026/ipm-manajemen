"use client";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <div className="bg-[#1E293B] text-white p-6 md:p-8 rounded-b-3xl shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-6 font-bold"><ArrowLeft /> Kembali</Link>
        <h1 className="text-2xl font-black">Generate QR</h1>
      </div>
      <div className="p-8 text-center"><QrCode className="w-24 h-24 mx-auto text-[#1E293B] mb-4"/> <p>Fitur Generate QR siap digunakan.</p></div>
    </div>
  );
}