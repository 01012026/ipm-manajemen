import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // INI KUNCI BAJUNYA!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPM Manajemen App",
  description: "Sistem Manajemen Ikatan Pelajar Muhammadiyah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-[#F5F4F0] text-[#2C3E50]`}>
        {children}
      </body>
    </html>
  );
}