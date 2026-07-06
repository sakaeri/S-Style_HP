import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Bases from "@/components/Bases";
import CaddieDayPreview from "@/components/CaddieDayPreview";
import NewsPreview from "@/components/NewsPreview";
import ContactCta from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "株式会社S-Style ｜ 旅するキャディ・全国8拠点のキャディ派遣",
  description:
    "株式会社S-StyleはSランクキャディを育成し、全国8拠点から派遣するキャディ派遣会社です。契約ゴルフ場派遣・イベントキャディ・プレーヤー様のご指名に対応します。",
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Bases />
      <CaddieDayPreview />
      <NewsPreview />
      <ContactCta />
      <Footer />
    </>
  );
}
