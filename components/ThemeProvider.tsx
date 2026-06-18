"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Komponen pembungkus ini bertugas membaca sistem operasi user
// Kalau HP user lagi Dark Mode, otomatis web kita jadi Dark Mode.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}