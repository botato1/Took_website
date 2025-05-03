"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = [
    "/images/banner/1.png",
    "/images/banner/2.png",
    "/images/banner/3.png", // <- 확장자 추가
  ];

  return (
    <div className="w-full mt-[64px] overflow-hidden"> {/* 상단 여백 추가 */}
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-[400px] object-contain" // 이미지 안 잘리게
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderBanner;
