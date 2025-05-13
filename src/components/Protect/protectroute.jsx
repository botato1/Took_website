"use client";

import { useAuth } from "@/Auth/authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 로딩이 완료되고 인증되지 않은 경우에만 리다이렉트
    if (!isLoading && !isAuthenticated) {
      router.push('/signin?callbackUrl=' + encodeURIComponent(window.location.pathname));
    }
  }, [isLoading, isAuthenticated, router]);

  // 로딩 중일 때는 로딩 인디케이터 표시
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  // 중요 변경: 항상 children을 반환 - 리다이렉트는 useEffect에서 처리
  return <>{children}</>;
}