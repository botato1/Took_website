import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import ContactCTA from "@/components/ContactCTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOOK - 혁신적인 광고 서비스",
  description: "TOOK의 광고형 자판기를 통해 효과적인 마케팅 캠페인을 시작해보세요.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <AboutSectionTwo />
      <ContactCTA />
    </>
  );
}
