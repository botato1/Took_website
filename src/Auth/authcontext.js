// src/Auth/authcontext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import axios from 'axios';

// 인증 컨텍스트 초기화
export const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: true,
  login: async (email, password) => {},
  register: async (name, email, password) => {},
  googleLogin: async () => {},
  logout: async () => {},
});

// 인증 상태 관리 Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 사용자 정보 로딩
  useEffect(() => {
    const loadUser = async () => {
      // 쿠키는 HTTP Only로 설정되어 있으므로 클라이언트에서 직접 접근 불가
      // API 요청 시 쿠키가 자동으로 전송됨
      try {
        const res = await axios.get('/api/authme');
        setUser(res.data);
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // 로그인 함수
const login = async (email, password) => {
  try {
    setIsLoading(true);
    console.log('로그인 요청:', { email }); // 디버깅 로그 추가
    
    const response = await axios.post('/api/login', { email, password });
    console.log('로그인 응답:', response.data); // 응답 데이터 확인
    
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    console.error('로그인 오류 상세:', error);
    console.error('응답 데이터:', error.response?.data);
    console.error('오류 상태 코드:', error.response?.status);
    
    throw error.response?.data || { message: '로그인 중 오류가 발생했습니다.' };
  } finally {
    setIsLoading(false);
  }
};

  // 회원가입 함수
const register = async (name, email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/signup', { name, email, password });
      setUser(response.data.user);
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data || { message: '회원가입 중 오류가 발생했습니다.' };
    } finally {
      setIsLoading(false);
    }
  };

  // 구글 로그인
  const googleLogin = async () => {
    // 구글 로그인은 리다이렉트 방식으로 동작하므로, 
    // 백엔드 라우트로 바로 이동
    window.location.href = '/api/google_login';
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/logout');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 컨텍스트 값
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 인증 컨텍스트 사용 훅
export const useAuth = () => useContext(AuthContext);