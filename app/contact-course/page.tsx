import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactTabs from "@/components/ContactTabs";
import ContactLink from "@/components/ContactLink";

export const metadata: Metadata = {
  title: "ゴルフ場お問い合わせ ｜ 株式会社S-Style",
  description:
    "ゴルフ場のご担当者様向けお問い合わせフォーム。契約キャディ派遣・スポット派遣のご相談を受け付けています。株式会社S-Style。",
};

export default function ContactCoursePage() {
  return (
    <>
      <Header />
      <PageBanner eyebrow="FOR GOLF COURSES" title="ゴルフ場お問い合わせ" breadcrumb="ゴルフ場お問い合わせ" square />
      <ContactTabs active="course" />
      <ContactLink
        title="ゴルフ場お問い合わせ"
        description="ご担当者様のお名前・メールアドレス・お問い合わせ内容をご入力のうえ送信してください。担当者より折り返しご連絡いたします。"
      />
      <Footer />
    </>
  );
}
