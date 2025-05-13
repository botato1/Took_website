"use client";

import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* 메인 섹션 타이틀 */}
        <div 
          data-aos="fade-up"
          data-aos-duration="1000"
          className="mb-24 max-w-[770px] mx-auto text-center"
        >
          <h2 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Main Features
          </h2>
          <p className="mb-8 text-base leading-relaxed text-body-color md:text-lg">
            TOOK의 혁신적인 광고 솔루션은 광고주와 소비자 모두에게 가치를 제공합니다.
          </p>
          <div className="mt-6">
            <div className="rounded-full overflow-hidden inline-block" data-aos="zoom-in" data-aos-delay="300">
            <Link
              href="/contact"
              className="group flex items-center bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="transition-transform duration-300 group-hover:rotate-12"
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18 9l-7 7" />
                    <path d="M18 2v7h7" />
                  </svg>
                </span>
                <span>광고 문의하기</span>
                <ChevronRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 피처 그리드 */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <SingleFeature 
              key={feature.id} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;