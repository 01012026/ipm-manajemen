import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
// INI YANG TADI KELUPAAN DIMASUKIN:
import AppShell from "../components/AppShell"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPM Manajemen App",
  description: "Sistem Manajemen Ikatan Pelajar Muhammadiyah",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
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
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {/* SEKARANG CHILDREN-NYA DIBUNGKUS SAMA APPSHELL */}
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}