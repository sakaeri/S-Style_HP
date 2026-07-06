import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactTabs from "@/components/ContactTabs";
import ContactEventForm from "@/components/ContactEventForm";

export const metadata: Metadata = {
  title: "イベントキャディ・プレーヤー様お問い合わせ ｜ 株式会社S-Style",
  description:
    "イベントキャディの単発派遣、プレーヤー様からのご指名のお問い合わせフォーム。プレーヤー様のご依頼は事前にゴルフ場へのお問い合わせが必須です。",
};

export default function ContactEventPage() {
  return (
    <>
      <Header />
      <PageBanner
        eyebrow="EVENT ／ PLAYER"
        title={
          <>
            イベントキャディ・
            <br />
            プレーヤー様お問い合わせ
          </>
        }
        breadcrumb="イベント・プレーヤー様"
        square
      />
      <ContactTabs active="event" />

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5vw 0" }}>
        <div
          style={{
            background: "#f6efe1",
            border: "1.5px solid #c9a86e",
            borderRadius: 18,
            padding: "22px 24px",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: "none",
              width: 38,
              height: 44,
              background: "#c9a86e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              font: "700 18px 'Shippori Mincho', serif",
              color: "#463216",
              borderRadius: 12,
            }}
          >
            !
          </div>
          <div>
            <div style={{ font: "700 15px 'Shippori Mincho', serif", color: "#6d5528", marginBottom: 6 }}>
              ご依頼前の大切なお願い
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.9, color: "#564628", margin: 0, fontWeight: 500 }}>
              イベントキャディのご利用（コンペ・単発派遣・プレーヤー様のご指名）は、いずれの場合も
              <b>事前にプレー予定のゴルフ場様へのお問い合わせ・ご了承</b>
              が必須です。ご了承を得たうえで、本フォームよりご依頼ください。
            </p>
          </div>
        </div>
      </section>

      <ContactEventForm />
      <Footer />
    </>
  );
}
