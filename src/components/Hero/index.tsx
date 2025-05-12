"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  // 슬라이더 설정 수정 - 더 느린 속도로 변경
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,              
    autoplay: true,
    autoplaySpeed: 6000,      
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,               
    pauseOnHover: false       
  };


  const slides = [
    {
      id: 1,
      image: "/images/hero_image/1.png",
      title: "혁신적인 광고형 자판기 솔루션",
      description: "광고를 통해 무료 제품체험을 제공하는 신개념 마케팅 플랫폼"
    },
    {
      id: 2,
      image: "/images/hero_image/2.png",
      title: "직접 뛰는 광고 솔루션",
      description: "친환경적이고 효과적인 오프라인 광고 서비스를 제공합니다"
    },
    {
      id: 3,
      image: "/images/hero_image/3.png",
      title: "맞춤형 마케팅 효과",
      description: "고객 니즈에 맞는 제품과 광고를 연결하여 최적의 마케팅 효과를 창출합니다"
    }
  ];

  return (
    <div className="w-full overflow-hidden"> 
      <Slider {...settings} className="hero-slider">
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={`TOOK 광고형 자판기 - ${slide.title}`}
              className="w-full h-[805px] object-cover"
            />
            

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-center px-4">
              <div className="max-w-[800px] animate-fade-in">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-shadow">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      

      <style jsx global>{`
        /* 슬라이더 dots 스타일 커스텀 */
        .hero-slider .slick-dots {
          bottom: 20px;
        }
        .hero-slider .slick-dots li button:before {
          color: white;
          font-size: 12px;
          opacity: 0.7;
        }
        .hero-slider .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
        
        /* 텍스트 페이드인 애니메이션 */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        /* 텍스트 그림자 효과 */
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Hero;