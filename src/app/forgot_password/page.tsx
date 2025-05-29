"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resetCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };

  // 1단계: 인증코드 요청
  const handleRequestCode = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post('/api/forgot_password', {
        name: formData.name,
        email: formData.email,
      });

      setMessage(response.data.message);
      setStep(2); 
    } catch (error) {
      setError(error.response?.data?.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!formData.resetCode || !formData.newPassword || !formData.confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.put('/api/reset_password', {
        email: formData.email,
        resetCode: formData.resetCode,
        newPassword: formData.newPassword,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-dark mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                {step === 1 ? "비밀번호 찾기" : "새 비밀번호 설정"}
              </h3>
              <p className="text-body-color mb-11 text-center text-base font-medium">
                {step === 1 
                  ? "가입 시 입력하신 이름과 이메일을 입력해주세요" 
                  : "이메일로 받은 인증코드와 새 비밀번호를 입력해주세요"
                }
              </p>

              {/* 에러/성공 메시지 */}
              {error && (
                <div className="mb-6 rounded-xs bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}
              {message && (
                <div className="mb-6 rounded-xs bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  {message}
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleRequestCode}>
                  <div className="mb-8">
                    <label htmlFor="name" className="text-dark mb-3 block text-sm dark:text-white">
                      이름
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="가입 시 입력한 이름을 입력하세요"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="email" className="text-dark mb-3 block text-sm dark:text-white">
                      이메일
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="가입 시 사용한 이메일을 입력하세요"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-xs px-9 py-4 text-base font-medium text-white duration-300 disabled:opacity-70"
                    >
                      {isLoading ? "처리 중..." : "인증코드 받기"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-8">
                    <label htmlFor="resetCode" className="text-dark mb-3 block text-sm dark:text-white">
                      인증코드
                    </label>
                    <input
                      type="text"
                      name="resetCode"
                      id="resetCode"
                      value={formData.resetCode}
                      onChange={handleChange}
                      placeholder="이메일로 받은 6자리 코드를 입력하세요"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="newPassword" className="text-dark mb-3 block text-sm dark:text-white">
                      새 비밀번호
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="새 비밀번호를 입력하세요 (최소 6자)"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="confirmPassword" className="text-dark mb-3 block text-sm dark:text-white">
                      새 비밀번호 확인
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="새 비밀번호를 다시 입력하세요"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-xs px-9 py-4 text-base font-medium text-white duration-300 disabled:opacity-70"
                    >
                      {isLoading ? "처리 중..." : "비밀번호 변경"}
                    </button>
                  </div>
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-body-color hover:text-primary w-full text-center text-sm font-medium"
                    >
                      ← 이전 단계로
                    </button>
                  </div>
                </form>
              )}

              <p className="text-body-color text-center text-base font-medium">
                비밀번호가 기억나셨나요?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;