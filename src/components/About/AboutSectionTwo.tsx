import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto mb-12 aspect-25/24 max-w-[500px] text-center lg:m-0" data-wow-delay=".15s">
              <Image
                src="/images/about/about-image-2.svg"
                alt="Took 서비스 이미지"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  브랜드와 소비자, 연결의 순간
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Took은 광고를 &apos;시청하는&apos; 것 이상의 경험을 제공합니다. 소비자는 광고를 보는 것만으로 혜택을 받고, 브랜드는 소비자와 더 깊은 관계를 형성할 수 있습니다. Took은 광고의 진정성과 가치를 회복합니다.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  지속 가능한 비즈니스 모델
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Took은 친환경적이고 지속 가능한 방식으로 광고와 소비자 경험을 연결합니다. 모듈형 자판기를 통해 확장성 또한 뛰어나, 시장의 변화를 빠르게 반영할 수 있습니다.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  광고의 새로운 패러다임
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  전통적인 광고 방식에서 벗어나, 소비자에게 직접적인 가치를 전달하는 Took의 시스템은 광고의 패러다임을 바꾸고 있습니다. 기업은 더 많은 고객에게 다가가고, 소비자는 진정한 보상을 경험합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
