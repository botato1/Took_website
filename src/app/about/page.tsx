import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Took | 혁신적인 광고 리워드 시스템",
  description:
    "Took은 광고를 보는 즐거움을 선사하고, 소비자는 그 대가로 실제 제품을 받는 새로운 형태의 체험 기반 리워드 시스템을 제공합니다.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Took 소개"
        description="Took은 소비자와 브랜드가 상호작용을 통해 가치를 창출하는 혁신적인 플랫폼입니다. 광고를 즐기는 것만으로도 소비자에게 혜택이 돌아가고, 브랜드는 자연스럽게 소비자와 연결됩니다."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
