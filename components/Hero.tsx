import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="hero-grid"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1.05fr .95fr",
        alignItems: "center",
        color: "#fff",
        background:
          "radial-gradient(circle at 18% 26%,rgba(58,143,124,.95),transparent 44%),radial-gradient(circle at 74% 16%,rgba(30,132,150,.92),transparent 48%),radial-gradient(circle at 86% 74%,rgba(178,138,82,.88),transparent 44%),radial-gradient(circle at 34% 86%,rgba(110,79,128,.82),transparent 48%),#173b33",
      }}
    >
      <div className="leaded-overlay" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(105deg,rgba(12,33,27,.62),rgba(12,33,27,.15) 55%,transparent)",
        }}
      />

      <div className="hero-copy" style={{ position: "relative", padding: "82px 5vw" }}>
        <div
          style={{
            display: "inline-block",
            padding: "9px 20px",
            background: "rgba(255,255,255,.14)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.4)",
            borderRadius: 999,
            fontSize: 12.5,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          全国8拠点 ／ Sランクキャディ育成
        </div>
        <h1
          style={{
            font: "700 clamp(38px,4.4vw,56px)/1.35 'Shippori Mincho', serif",
            margin: "0 0 22px",
            textShadow: "0 2px 18px rgba(0,0,0,.35)",
          }}
        >
          日本全国を、
          <br />
          旅するキャディ。
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 2,
            color: "rgba(255,255,255,.95)",
            margin: "0 0 34px",
            maxWidth: 440,
            fontWeight: 500,
            textShadow: "0 1px 8px rgba(0,0,0,.3)",
          }}
        >
          王冠のクイーンビー「BiBi」と一緒に。Sランクキャディを育て、全国へお届けします。契約ゴルフ場からイベント、ご指名まで。
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            className="btn"
            href="/contact-course"
            style={{
              padding: "16px 32px",
              background: "#c9a86e",
              color: "#463216",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 12px 26px rgba(0,0,0,.28)",
            }}
          >
            ゴルフ場/相談窓口
          </Link>
          <Link
            className="btn"
            href="/recruit"
            style={{
              padding: "16px 32px",
              background: "rgba(255,255,255,.14)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,.6)",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            キャディ募集を見る
          </Link>
        </div>
      </div>

      <div
        className="hero-visual"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 520,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(450px,88%)",
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "7%",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 0 0 8px #fff,0 0 0 12px #c9a86e,0 24px 60px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 35% 30%,rgba(255,255,255,.9),transparent 60%)",
              }}
            />
          </div>
          <Image
            src="/assets/bibi-cutout.png"
            alt="S-Style BiBi"
            width={423}
            height={418}
            priority
            style={{
              position: "relative",
              width: 423,
              height: 418,
              filter: "drop-shadow(0 12px 22px rgba(0,0,0,.3))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
