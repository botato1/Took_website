"use client";

import { AuthProvider } from "@/Auth/authcontext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}