import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlassPanel from "@/components/GlassPanel";
import ContractBases from "@/components/ContractBases";
import RecruitForm from "@/components/RecruitForm";

export const metadata: Metadata = {
  title: "採用情報 ｜ 株式会社S-Style",
  description:
    "株式会社S-Styleのキャディ採用情報。未経験歓迎、Sランクキャディを目指せる研修制度。全国8拠点で募集中。旅するキャディという働き方を。",
};

const merits = [
  {
    num: "01",
    gradient: "linear-gradient(135deg,#3a8f7c,#1e8ca0)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.35),0 6px 14px rgba(30,132,150,.3)",
    title: "未経験でも安心の研修",
    body: "Sランク基準に沿った独自の研修で、マナーも技術も基礎からしっかり身につきます。",
  },
  {
    num: "02",
    gradient: "linear-gradient(135deg,#c9a86e,#b24f7a)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.4),0 6px 14px rgba(178,79,122,.28)",
    title: "全国を旅する働き方",
    body: "全国8拠点。行ってみたい土地のゴルフ場で働ける、旅するキャディならではの体験を。",
  },
  {
    num: "03",
    gradient: "linear-gradient(135deg,#7a4f9f,#3a5f9f)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.35),0 6px 14px rgba(90,79,159,.28)",
    title: "頑張りが評価される",
    body: "スキルに応じたランク制度。努力がきちんと評価され、キャリアアップにつながります。",
  },
];

const requirements = [
  { label: "職種", value: "ゴルフキャディ（正社員・契約社員・アルバイト）" },
  { label: "応募資格", value: "未経験者歓迎／経験者優遇。人と接することが好きな方。" },
  { label: "勤務地", value: "全国8拠点（千葉／北海道／埼玉／山梨／三重／大阪／兵庫／沖縄）" },
  { label: "給与", value: "日給11,000円～16,000円" },
  { label: "勤務時間", value: "実働5～7時間／週1日～OK（自由シフト制）" },
  {
    label: "福利厚生",
    value: "社会保険加入可、寮完備、プチボーナスあり、研修制度あり",
  },
  { label: "選考の流れ", value: "エントリー → 面接 → 研修 → 配属" },
];

export default function RecruitPage() {
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
              RECRUIT
            </div>
            <h1 style={{ font: "700 clamp(30px,4vw,46px)/1.4 'Shippori Mincho', serif", margin: "10px 0 14px" }}>
              未経験から、
              <br />
              Sランクキャディへ。
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.95, color: "rgba(255,255,255,.92)", margin: 0, maxWidth: 520, fontWeight: 500 }}>
              全国8拠点でキャディを募集中。研修制度が整っているので、未経験の方も安心してスタートできます。旅するように、全国で働こう。
            </p>
          </div>
          <div className="hero-visual" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src="/assets/bibi-fly.png"
              alt="応援するBiBi"
              width={300}
              height={300}
              style={{ width: "min(300px,80%)", height: "auto", filter: "drop-shadow(0 14px 26px rgba(0,0,0,.3))" }}
            />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 5vw 40px" }}>
        <h2 style={{ font: "700 26px 'Shippori Mincho', serif", color: "#1f4d40", margin: "0 0 30px", textAlign: "center" }}>
          S-Styleで働く魅力
        </h2>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {merits.map((m) => (
            <div key={m.num} style={{ background: "#fff", borderRadius: 24, padding: "32px 28px", border: "1px solid #eceadb" }}>
              <div
                style={{
                  width: 56,
                  height: 64,
                  marginBottom: 16,
                  background: m.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "700 20px 'Shippori Mincho', serif",
                  color: "#fff",
                  borderRadius: 12,
                  boxShadow: m.shadow,
                }}
              >
                {m.num}
              </div>
              <h3 style={{ font: "700 18px 'Shippori Mincho', serif", margin: "0 0 10px" }}>{m.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.9, color: "#4d5f56", margin: 0, fontWeight: 500 }}>
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "24px 5vw 40px" }}>
        <GlassPanel>
          <h2 style={{ font: "700 24px 'Shippori Mincho', serif", color: "#fff", margin: "0 0 24px" }}>
            募集要項
          </h2>
          <div
            style={{
              background: "rgba(255,255,255,.8)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.55)",
              boxShadow: "0 10px 30px rgba(16,40,34,.18)",
            }}
          >
            {requirements.map((row, i) => (
              <div
                key={row.label}
                className="kv-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  borderBottom: i < requirements.length - 1 ? "1px solid rgba(31,77,64,.12)" : "none",
                }}
              >
                <div style={{ padding: "18px 22px", background: "rgba(34,86,75,.12)", fontWeight: 700, fontSize: 14, color: "#1f4d40" }}>
                  {row.label}
                </div>
                <div style={{ padding: "18px 22px", fontSize: 14, fontWeight: 500, lineHeight: 1.9, color: "#33463d" }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <ContractBases />

      <RecruitForm />

      <Footer />
    </>
  );
}
