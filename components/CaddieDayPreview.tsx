import Image from "next/image";
import Link from "next/link";

export default function CaddieDayPreview() {
  return (
    <section
      className="day-grid"
      style={{
        position: "relative",
        overflow: "hidden",
        margin: "0 5vw 52px",
        borderRadius: 30,
        padding: "48px 5vw",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: 34,
        alignItems: "center",
        color: "#fff",
        background:
          "radial-gradient(circle at 24% 30%,rgba(30,132,150,.92),transparent 48%),radial-gradient(circle at 80% 70%,rgba(110,79,128,.85),transparent 48%),radial-gradient(circle at 60% 12%,rgba(58,143,124,.85),transparent 46%),#173b33",
        boxShadow: "0 14px 40px rgba(16,40,34,.25)",
      }}
    >
      <div className="leaded-overlay" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(rgba(16,40,34,.5),rgba(16,40,34,.58))",
        }}
      />
      <div
        className="day-visual"
        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Image
          src="/assets/bibi-fly.png"
          alt="BiBi"
          width={227}
          height={213}
          style={{
            width: 227,
            maxWidth: 280,
            height: 213,
            filter: "drop-shadow(0 10px 22px rgba(0,0,0,.3))",
          }}
        />
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            font: "700 12px 'Shippori Mincho', serif",
            letterSpacing: ".2em",
            color: "#e6cf9c",
          }}
        >
          A DAY OF CADDIE
        </div>
        <h2
          style={{
            font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif",
            margin: "8px 0 14px",
          }}
        >
          キャディの一日
        </h2>
        <p
          style={{
            fontSize: 14.5,
            lineHeight: 2,
            color: "rgba(255,255,255,.94)",
            margin: "0 0 26px",
            fontWeight: 500,
          }}
        >
          早朝の準備からラウンド、次の街への移動まで。BiBiと一緒に、旅するキャディのリアルな一日をご紹介します。未経験の方も、働くイメージがきっと湧きます。
        </p>
        <Link
          className="btn"
          href="/caddie-day"
          style={{
            display: "inline-block",
            padding: "14px 30px",
            background: "#c9a86e",
            color: "#463216",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          一日を見る →
        </Link>
      </div>
    </section>
  );
}
