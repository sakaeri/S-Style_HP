import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import GlassPanel from "@/components/GlassPanel";
import ContractBases from "@/components/ContractBases";
import { getBases } from "@/lib/bases";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "会社案内 ｜ 株式会社S-Style",
  description:
    "株式会社S-Styleの会社案内。代表挨拶と会社概要をご紹介します。全国8拠点（本拠点：千葉）でSランクキャディの育成・派遣事業を行っています。",
};

const companyInfo = [
  { label: "会社名", value: "株式会社S-Style" },
  { label: "設立", value: "2020年12月" },
  { label: "代表者", value: "代表取締役　榮 恵里香" },
  {
    label: "事業内容",
    value: (
      <>
        キャディの育成および派遣事業
        <br />
        イベントキャディの派遣
        <br />
        ゴルフ関連サービス
      </>
    ),
  },
  { label: "所在地", value: "千葉県香取市山倉3055-2" },
  { label: "拠点数", value: "全国8拠点（本拠点＋7支部）" },
];

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [bases, settings] = await Promise.all([getBases(), getSettings()]);
  return (
    <>
      <Header />
      <PageBanner eyebrow="COMPANY" title="会社案内" breadcrumb="会社案内" square />

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 5vw 0" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="#message"
            style={{
              padding: "10px 22px",
              background: "#eee9dd",
              color: "#1f4d40",
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 700,
            }}
          >
            代表挨拶
          </a>
          <a
            href="#company"
            style={{
              padding: "10px 22px",
              background: "#fff",
              border: "1px solid #dbe4dd",
              color: "#3b5248",
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 700,
            }}
          >
            会社概要
          </a>
          <a
            href="#bases"
            style={{
              padding: "10px 22px",
              background: "#fff",
              border: "1px solid #dbe4dd",
              color: "#3b5248",
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 700,
            }}
          >
            拠点一覧
          </a>
        </div>
      </section>

      <section
        id="message"
        style={{ maxWidth: 1000, margin: "0 auto", padding: "52px 5vw 0", scrollMarginTop: 80 }}
      >
        <div style={{ font: "700 12px 'Shippori Mincho', serif", letterSpacing: ".25em", color: "#b28a52" }}>
          MESSAGE
        </div>
        <h2 style={{ font: "700 28px 'Shippori Mincho', serif", color: "#1f4d40", margin: "8px 0 32px" }}>
          代表挨拶
        </h2>
        <div
          className="msg-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 24,
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "min(42vw,480px)",
              borderRadius: 26,
              overflow: "hidden",
            }}
          >
            {settings.presidentPhoto ? (
              // Uploaded photos are data URIs; next/image can't optimize those, so render directly.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.presidentPhoto}
                alt="代表取締役 榮 恵里香"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Image src="/assets/president-photo.jpg" alt="代表取締役 榮 恵里香" fill style={{ objectFit: "cover" }} />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Image
              src="/assets/bibi-fly.png"
              alt="元気なBiBi"
              width={238}
              height={236}
              style={{ width: 238, height: "auto", filter: "drop-shadow(0 10px 20px rgba(31,77,64,.22))" }}
            />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1f4d40", textAlign: "center" }}>
              イメージキャラクター「BiBi」
            </span>
          </div>
        </div>
        <div style={{ fontSize: 15, lineHeight: 2.2, color: "#33463d" }}>
          <p
            style={{
              font: "700 clamp(22px,2.6vw,28px)/1.6 'Shippori Mincho', serif",
              color: "#1f4d40",
              margin: "0 0 28px",
            }}
          >
            ゴルフ場と、プレーヤーと、キャディの笑顔をつなぐ。
          </p>
          <p style={{ margin: "0 0 22px" }}>
            数あるゴルフ場の中で、キャディはコースとプレーヤーをつなぐ、なくてはならない存在です。私たち株式会社S-Styleは「旅するキャディ」という新しい働き方を掲げ、全国8拠点からSランクのキャディをお届けしています。
          </p>
          <p style={{ margin: "0 0 22px" }}>
            キャディの仕事は、単にバッグを運ぶだけではありません。コースを読み、プレーヤーの気持ちに寄り添い、その一日を最高の思い出に変える。だからこそ私たちは、技術だけでなくマナー・ホスピタリティまでを独自の基準で磨き上げ、自信を持って送り出しています。
          </p>
          <p style={{ margin: "0 0 22px" }}>
            契約ゴルフ場様への安定した派遣はもちろん、契約外のコースやコンペへの単発派遣（イベントキャディ）、プレーヤー様からのご指名にも柔軟に対応しています。マスコットの「BiBi」とともに、全国のゴルフシーンをもっと豊かにしていくことが私たちの願いです。
          </p>
          <p style={{ margin: "0 0 28px" }}>
            これからも、働くキャディが誇りを持てる会社であり続けること。そして、ゴルフに関わるすべての方の笑顔を増やすこと。その想いを胸に、一歩ずつ歩んでまいります。
          </p>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 13, color: "#5d6b5a" }}>
              代表取締役
              <span style={{ fontSize: 18, color: "#123329", fontWeight: 500, fontFamily: "Georgia" }}>
                榮 恵里香
              </span>
            </span>
            <br />
            <Image
              src="/assets/president-signature.png"
              alt="Erika Sakae"
              width={281}
              height={118}
              style={{ height: 118, width: 281 }}
            />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: "56px auto 0", padding: "0 5vw" }}>
        <div style={{ height: 1, background: "#e4e0d0" }} />
      </div>

      <section
        id="company"
        style={{ maxWidth: 960, margin: "0 auto", padding: "32px 5vw 40px", scrollMarginTop: 80 }}
      >
        <GlassPanel>
          <div style={{ font: "700 12px 'Shippori Mincho', serif", letterSpacing: ".25em", color: "#e6cf9c" }}>
            COMPANY PROFILE
          </div>
          <h2 style={{ font: "700 24px 'Shippori Mincho', serif", color: "#fff", margin: "8px 0 24px" }}>
            会社概要
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
            {companyInfo.map((row, i) => (
              <div
                key={row.label}
                className="kv-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  borderBottom: i < companyInfo.length - 1 ? "1px solid rgba(31,77,64,.12)" : "none",
                }}
              >
                <div
                  style={{
                    padding: "20px 24px",
                    background: "rgba(34,86,75,.12)",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#1f4d40",
                  }}
                >
                  {row.label}
                </div>
                <div style={{ padding: "20px 24px", fontSize: 14, fontWeight: 500, lineHeight: 1.9, color: "#33463d" }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <ContractBases bases={bases} />

      <Footer />
    </>
  );
}
