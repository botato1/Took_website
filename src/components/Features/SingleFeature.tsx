// src/components/Features/SingleFeature.tsx
import { Feature } from "@/types/feature";
import { useEffect, useState } from "react";

const SingleFeature = ({ 
  feature, 
  delay = 0,
  isVisible = false
}: { 
  feature: Feature, 
  delay?: number,
  isVisible?: boolean
}) => {
  const { icon, title, paragraph } = feature;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimated(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div 
      className={`w-full transition-all duration-700 transform ${
        animated 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-16"
      }`}
    >
      <div>
        <div className="bg-primary/10 text-primary mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-md">
          {icon}
        </div>
        <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
          {title}
        </h3>
        <p className="text-body-color pr-[10px] text-base leading-relaxed font-medium">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;