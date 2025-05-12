"use client"

import { useEffect, useRef, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Features = () => {
  const [mainSectionVisible, setMainSectionVisible] = useState(false);
  const featuresRef = useRef(null);   // 특징 아이템들을 위한 상태와 참조
  const [featuresVisible, setFeaturesVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMainSectionVisible(true);
    }, 550); 
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* Main Features 영역 - 히어로 섹션 애니메이션 후 표시 */}
        <div 
          className={`mb-24 max-w-[770px] mx-auto text-center transition-all duration-1000 transform ${
            mainSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Main Features
          </h2>
          <p className="mb-8 text-base leading-relaxed text-body-color md:text-lg">
            TOOK의 혁신적인 광고 솔루션은 광고주와 소비자 모두에게 가치를 제공합니다.
          </p>
          <div className="mt-6">
            <div className="rounded-full overflow-hidden inline-block">
              <Link
                href="/contact"
                className="group flex items-center bg-primary px-10 py-5 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
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
                <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuresData.map((feature, index) => (
            <SingleFeature 
              key={feature.id} 
              feature={feature} 
              delay={index * 200}
              isVisible={featuresVisible}
            />
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-all {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;