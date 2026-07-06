import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "キャディの一日 ｜ 株式会社S-Style",
  description:
    "S-Styleキャディの一日を、マスコットBiBiと一緒にご紹介。早朝の準備からラウンド、次の街への移動まで。未経験でも働くイメージが湧きます。",
};

const timeline = [
  {
    time: "7:00",
    image: "commute",
    title: "出勤",
    body: "早朝に出勤し、身だしなみを整えます。当日のスタート組・コース状況を確認します。",
    accent: "#22564b",
  },
  {
    time: "7:15",
    image: "prep",
    title: "準備・お客様をお出迎え",
    body: "キャディバッグやカートの準備を整え、笑顔でプレーヤー様をお出迎えします。",
    accent: "#22564b",
  },
  {
    time: "8:00",
    image: "start",
    title: "プレースタート（前半）",
    body: "距離や芝目を読み、最適なクラブをアドバイス。プレーヤーの気持ちに寄り添いながら、スムーズな進行をサポートします。",
    accent: "#22564b",
  },
  {
    time: "10:15",
    image: "lunch",
    title: "お昼休憩",
    body: "前半のラウンド終了。しっかり休憩をとって、後半に備えます。キャディ同士の情報共有もこの時間に。",
    accent: "#b28a52",
  },
  {
    time: "11:00",
    image: "back9",
    title: "後半プレー",
    body: "後半もプレーヤーのベストショットを引き出すお手伝い。最後の一打まで、最高の一日になるよう心を尽くします。",
    accent: "#22564b",
  },
  {
    time: "13:15",
    image: "cleanup",
    title: "プレー終了・片付け",
    body: "笑顔でお見送り。カートやクラブを片付け、翌日の準備をします。",
    accent: "#22564b",
  },
  {
    time: "14:00",
    image: "offwork",
    title: "退勤",
    body: "一日の業務を終え、退勤します。実働6時間で、最高の一日を届ける仕事です。",
    accent: "#22564b",
  },
];

export default function CaddieDayPage() {
  return (
    <>
      <Header />
      <PageBanner
        eyebrow="A DAY OF CADDIE"
        title="キャディの一日"
        description="BiBiと一緒に、旅するキャディの一日をのぞいてみよう！"
      />

      <section style={{ maxWidth: 860, margin: "0 auto", padding: "64px 5vw" }}>
        <div
          style={{
            position: "relative",
            paddingLeft: 44,
            borderLeft: "3px dashed #9cd7bf",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {timeline.map((item) => (
            <div key={item.time} style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: -58,
                  top: 0,
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: item.accent,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "700 13px 'Shippori Mincho', serif",
                  boxShadow: "0 0 0 5px #fbf9f0",
                }}
              >
                {item.time}
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "26px 28px",
                  border: "1px solid #eceadb",
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 22,
                  alignItems: "center",
                }}
              >
                <div style={{ position: "relative", height: 100, borderRadius: 14, overflow: "hidden" }}>
                  <Image
                    src={`/assets/caddie-day-${item.image}.jpg`}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 style={{ font: "700 18px 'Shippori Mincho', serif", margin: "0 0 8px", color: "#1f4d40" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.9, color: "#4d5f56", margin: 0, fontWeight: 500 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 5vw 64px" }}>
        <GlassPanel style={{ maxWidth: 1000, margin: "0 auto", padding: 48, textAlign: "center" }}>
          <h2 style={{ font: "700 clamp(22px,2.6vw,28px) 'Shippori Mincho', serif", margin: "0 0 10px" }}>
            こんな一日を、一緒に。
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.9)", margin: "0 0 26px", fontWeight: 500 }}>
            未経験からでも大丈夫。あなたもSランクキャディを目指しませんか？
          </p>
          <Link
            className="btn"
            href="/recruit"
            style={{
              display: "inline-block",
              padding: "15px 34px",
              background: "#c9a86e",
              color: "#463216",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            採用情報を見る →
          </Link>
        </GlassPanel>
      </section>

      <Footer />
    </>
  );
}
