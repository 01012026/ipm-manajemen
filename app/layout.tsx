import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import AppShell from "../components/AppShell"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPM Manajemen App",
  description: "Sistem Manajemen Ikatan Pelajar Muhammadiyah",
};

// Kita kunci warna tema browser ke krem klasik
export const viewport: Viewport = {
  themeColor: "#F5F4F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Paksa mode light dari akar HTML-nya biar nggak berantem
    <html lang="id" className="light" suppressHydrationWarning>
      {/* Ganti bg-background dengan warna hardcode klasik kita */}
      <body className={`${inter.className} antialiased bg-[#F5F4F0] text-[#2C3E50]`}>
        <ThemeProvider>
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}