"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-gray-light dark:bg-gray-dark overflow-hidden">
      {/* 배경 요소 */}
      <div className="absolute top-0 right-0 z-[-1] opacity-30">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-2/3">
            <div className="wow fadeInUp mx-auto text-center">
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                혁신적인 광고 서비스에 관심이 있으신가요?
              </h2>
              <p className="mb-10 text-base font-medium !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                TOOK의 광고형 자판기와 직접 뛰는 광고 솔루션을 통해 효과적인 마케팅 캠페인을 시작해보세요.
                맞춤형 서비스 상담 및 견적 문의는 아래 버튼을 통해 가능합니다.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href="/contact"
                  className="rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
                >
                  광고 문의하기
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 장식 요소 */}
        <div className="absolute bottom-0 left-0 z-[-1]">
          <svg
            width="239"
            height="601"
            viewBox="0 0 239 601"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-184.451"
              y="600.973"
              width="196"
              height="541.607"
              rx="2"
              transform="rotate(-128.7 -184.451 600.973)"
              fill="url(#paint0_linear_93:235)"
            />
            <rect
              opacity="0.3"
              x="-188.201"
              y="385.272"
              width="59.7544"
              height="541.607"
              rx="2"
              transform="rotate(-128.7 -188.201 385.272)"
              fill="url(#paint1_linear_93:235)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_93:235"
                x1="-90.1184"
                y1="420.414"
                x2="-90.1184"
                y2="1131.65"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_93:235"
                x1="-159.441"
                y1="204.714"
                x2="-159.441"
                y2="915.952"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;