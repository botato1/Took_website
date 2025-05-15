"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white py-8">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="mb-6 md:mb-0 md:min-w-[140px]">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/logo-2.svg"
                alt="logo"
                className="w-full"
                width={140}
                height={30}
              />
            </Link>
          </div>
          <div className="text-sm text-body-color">
            <p>(주)투크 | 대표: 가동현</p>
            <p>대전광역시 동구 동대전로171(자양동 155-3번지) Startup Playground(엔디컷빌딩)</p>
            <p>사업자등록번호: x</p>
            <p>통신판매업 번호: x</p>
            <p>이용 관련 및 제휴문의: contact@took.me</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <Link 
              href="/privacy" 
              className="text-sm text-body-color hover:text-primary mr-6"
            >
              개인정보처리방침
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-body-color hover:text-primary"
            >
              서비스이용약관
            </Link>
          </div>
          <p className="text-sm text-body-color">
            Copyright © 2025 TOOK Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;