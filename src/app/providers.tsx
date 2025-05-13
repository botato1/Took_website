"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/Auth/authcontext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}