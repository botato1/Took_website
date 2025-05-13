import { Feature } from "@/types/feature";

const SingleFeature = ({ feature, index }: { feature: Feature; index: number }) => {
  const { icon, title, paragraph } = feature;
  
  return (
    <div 
      className="w-full"
      data-aos="fade-up" 
      data-aos-delay={index * 100} 
      data-aos-duration="1000"
    >
      <div className="group hover:bg-white/5 p-6 rounded-lg transition-all duration-300">
        <div className="bg-primary/10 text-primary mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-md group-hover:bg-primary/20 transition-all duration-300">
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