"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async (email, password) => {},
  register: async (name, email, password) => {},
  googleLogin: async () => {},
  logout: async () => {},
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  withCredentials: true 
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 사용자 정보 로딩 - 애플리케이션 초기화 시
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.getItem('isLoggedOut') === 'true') {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/authme');
        setUser(res.data);
        localStorage.removeItem('isLoggedOut'); 
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('사용자가 인증되지 않았습니다 - 정상적인 상태');
        } else {
          console.error('사용자 정보 로딩 중 예상치 못한 오류:', error);
        }
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
      const response = await api.post('/api/login', { email, password });
      setUser(response.data.user);
      localStorage.removeItem('isLoggedOut'); 
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || '로그인 중 오류가 발생했습니다';
      console.error('로그인 오류:', errorMsg);
      throw { message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      setIsLoading(true);
      await api.post('/api/logout');
      setUser(null);
      localStorage.setItem('isLoggedOut', 'true'); 
      router.push('/');
    } catch (error) {
      console.error('로그아웃 오류:', error);
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
const googleLogin = () => {
  window.location.href = '/api/google_login';
};


  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);