import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "イベントキャディ ｜ 株式会社S-Style",
  description:
    "コンペ・トーナメント、契約外ゴルフ場への単発派遣、プレーヤー様のご指名まで。S-Styleのイベントキャディが、特別な一日を華やかに演出します。",
};

const useCases = [
  {
    num: "01",
    gradient: "linear-gradient(135deg,#3a8f7c,#1e8ca0)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.35),0 6px 14px rgba(30,132,150,.3)",
    title: "コンペ・トーナメント",
    body: "大人数のコンペや大会も、複数名のキャディで対応。進行をスムーズにし、参加者の満足度を高めます。",
  },
  {
    num: "02",
    gradient: "linear-gradient(135deg,#c9a86e,#b24f7a)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.4),0 6px 14px rgba(178,79,122,.28)",
    title: "契約外ゴルフ場での単発",
    body: "普段キャディが付かないコースでも、単発でお呼びいただけます。旅行先や遠方のラウンドにも。",
  },
  {
    num: "03",
    gradient: "linear-gradient(135deg,#7a4f9f,#3a5f9f)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.35),0 6px 14px rgba(90,79,159,.28)",
    title: "プレーヤー様のご指名",
    body: "プレーヤー様から直接キャディをご指名いただけます。",
  },
];

const features = [
  { title: "Sランクの品質", body: "独自基準で磨いたキャディが、単発でも変わらぬ上質なおもてなしをお届けします。" },
  { title: "全国どこでも", body: "全国8拠点のネットワークで、幅広いエリアのゴルフ場に対応します。" },
  { title: "柔軟な手配", body: "人数やご希望に合わせて柔軟に手配。急なご相談もまずはお問い合わせください。" },
];

const flow = [
  { num: "1", title: "お問い合わせ", body: "フォームより日程・場所・人数をお知らせください。", accent: "#22564b" },
  { num: "2", title: "ヒアリング", body: "ご要望を伺い、最適なプランをご提案します。", accent: "#22564b" },
  { num: "3", title: "手配・ご確認", body: "キャディを手配し、当日の詳細をご確認いただきます。", accent: "#22564b" },
  { num: "4", title: "当日", body: "キャディが伺い、特別な一日をサポートします。", accent: "#c9a86e", accentText: "#463216" },
];

export default function EventPage() {
  return (
    <>
      <Header />

      <section
        style={{
          position: "relative",
          color: "#fff",
          padding: "64px 5vw",
          overflow: "hidden",
          background:
            "repeating-linear-gradient(63deg,rgba(6,16,12,.36) 0 2px,transparent 2px 46px),repeating-linear-gradient(-63deg,rgba(6,16,12,.36) 0 2px,transparent 2px 46px),linear-gradient(rgba(23,59,51,.42),rgba(23,59,51,.54)),radial-gradient(circle at 20% 26%,rgba(58,143,124,.92),transparent 48%),radial-gradient(circle at 80% 22%,rgba(30,132,150,.88),transparent 48%),radial-gradient(circle at 62% 88%,rgba(178,138,82,.8),transparent 48%),#173b33",
        }}
      >
        <div
          className="hero-grid"
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.25fr .75fr",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ font: "700 12px 'Shippori Mincho', serif", letterSpacing: ".25em", color: "#c9a86e" }}>
              EVENT CADDIE ／ 単発・スポット派遣
            </div>
            <h1 style={{ font: "700 clamp(32px,4vw,48px)/1.45 'Shippori Mincho', serif", margin: "10px 0 14px" }}>
              特別な一日を、
              <br />
              特別なキャディと。
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.95, color: "rgba(255,255,255,.92)", margin: 0, maxWidth: 520, fontWeight: 500 }}>
              コンペやトーナメント、契約外のゴルフ場でのラウンドにも。S-StyleのSランクキャディが単発で伺い、大切な一日を上質に彩ります。
            </p>
          </div>
          <div className="hero-visual" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src="/assets/bibi-welcome.png"
              alt="S-Style BiBi"
              width={300}
              height={300}
              style={{ width: "min(300px,80%)", height: "auto", filter: "drop-shadow(0 14px 26px rgba(0,0,0,.3))" }}
            />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 5vw 20px", textAlign: "center" }}>
        <div style={{ font: "700 12px 'Shippori Mincho', serif", letterSpacing: ".25em", color: "#b28a52" }}>
          WHAT IS EVENT CADDIE
        </div>
        <h2 style={{ font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif", margin: "10px 0 18px", color: "#1f4d40" }}>
          イベントキャディとは
        </h2>
        <p style={{ fontSize: 15, lineHeight: 2.1, color: "#33463d", margin: "0 auto", maxWidth: 680, fontWeight: 500 }}>
          ご契約ゴルフ場への派遣とは別に、<b style={{ color: "#1f4d40" }}>その日・その場所だけ</b>
          キャディをお届けするサービスです。コンペや記念ラウンド、接待ゴルフなど「いつもより特別な一日」に、経験を積んだSランクキャディが寄り添います。
        </p>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 5vw" }}>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {useCases.map((c) => (
            <div
              key={c.num}
              className="gcard"
              style={{ background: "#fff", borderRadius: 24, padding: "34px 30px", border: "1px solid #eceadb" }}
            >
              <div
                style={{
                  width: 56,
                  height: 64,
                  marginBottom: 18,
                  background: c.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "700 20px 'Shippori Mincho', serif",
                  color: "#fff",
                  borderRadius: 12,
                  boxShadow: c.shadow,
                }}
              >
                {c.num}
              </div>
              <h3 style={{ font: "700 19px 'Shippori Mincho', serif", margin: "0 0 12px" }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.95, color: "#4d5f56", margin: 0, fontWeight: 500 }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ margin: "20px 5vw 52px" }}>
        <GlassPanel style={{ padding: "52px 5vw" }}>
          <div style={{ textAlign: "center", marginBottom: 36, position: "relative" }}>
            <div style={{ font: "700 12px 'Shippori Mincho', serif", letterSpacing: ".25em", color: "#c9a86e" }}>
              FEATURES
            </div>
            <h2 style={{ font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif", margin: "8px 0 0" }}>
              イベントキャディの魅力
            </h2>
          </div>
          <div
            className="g3"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1000, margin: "0 auto" }}
          >
            {features.map((f) => (
              <div key={f.title} style={{ textAlign: "center" }}>
                <div style={{ font: "700 20px 'Shippori Mincho', serif", marginBottom: 8, color: "#e6d3ad" }}>
                  {f.title}
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.95, color: "rgba(255,255,255,.9)", margin: 0, fontWeight: 500 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <section id="flow" style={{ maxWidth: 1000, margin: "0 auto", padding: "8px 5vw 56px", scrollMarginTop: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 38 }}>
          <div style={{ font: "700 12px 'Shippori Mincho', serif", letterSpacing: ".25em", color: "#b28a52" }}>
            FLOW
          </div>
          <h2 style={{ font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif", margin: "8px 0 0", color: "#1f4d40" }}>
            ご利用の流れ
          </h2>
        </div>
        <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {flow.map((f) => (
            <div
              key={f.num}
              style={{ background: "#fff", borderRadius: 20, padding: "28px 22px", border: "1px solid #eceadb", textAlign: "center" }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  margin: "0 auto 14px",
                  borderRadius: "50%",
                  background: f.accent,
                  color: f.accentText ?? "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "700 16px 'Shippori Mincho', serif",
                }}
              >
                {f.num}
              </div>
              <h3 style={{ font: "700 15px 'Shippori Mincho', serif", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ fontSize: 12.5, lineHeight: 1.8, color: "#5d6b5a", margin: 0, fontWeight: 500 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 5vw 56px" }}>
        <div
          style={{
            background: "#f6efe1",
            border: "1.5px solid #c9a86e",
            borderRadius: 20,
            padding: "26px 30px",
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: "none",
              width: 40,
              height: 46,
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
            <div style={{ font: "700 16px 'Shippori Mincho', serif", color: "#6d5528", marginBottom: 8 }}>
              ご依頼前の大切なお願い
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.95, color: "#564628", margin: 0, fontWeight: 500 }}>
              イベントキャディのご利用（コンペ・単発派遣・プレーヤー様のご指名）は、いずれの場合も
              <b>事前にプレー予定のゴルフ場様へのお問い合わせ・ご了承</b>
              が必須です。ご了承を得たうえで、お問い合わせフォームよりご依頼ください。
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 5vw 60px" }}>
        <GlassPanel style={{ maxWidth: 1120, margin: "0 auto", padding: 52, textAlign: "center" }}>
          <h2 style={{ font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif", margin: "0 0 10px" }}>
            イベントキャディのご相談
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.9)", margin: "0 0 30px", fontWeight: 500 }}>
            コンペ・単発ラウンド・ご指名まで、お気軽にお問い合わせください。
          </p>
          <Link
            className="btn"
            href="/contact-event"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "#c9a86e",
              color: "#463216",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            お問い合わせフォームへ →
          </Link>
        </GlassPanel>
      </section>

      <Footer />
    </>
  );
}
