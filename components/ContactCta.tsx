import Link from "next/link";

export default function ContactCta() {
  return (
    <section style={{ padding: "0 5vw 60px" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          maxWidth: 1120,
          margin: "0 auto",
          borderRadius: 30,
          padding: 52,
          textAlign: "center",
          color: "#fff",
          background:
            "radial-gradient(circle at 20% 24%,rgba(58,143,124,.9),transparent 50%),radial-gradient(circle at 82% 30%,rgba(178,138,82,.85),transparent 48%),radial-gradient(circle at 50% 92%,rgba(30,132,150,.85),transparent 50%),#153229",
          boxShadow: "0 14px 40px rgba(16,40,34,.28)",
        }}
      >
        <div className="leaded-overlay" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(rgba(16,40,34,.5),rgba(16,40,34,.6))",
          }}
        />
        <div style={{ position: "relative" }}>
          <h2 style={{ font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif", margin: "0 0 10px" }}>
            お問い合わせ
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.92)", margin: "0 0 30px", fontWeight: 500 }}>
            ゴルフ場様・イベントのご依頼はこちらから。採用エントリーもお待ちしています。
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              className="btn"
              href="/contact-course"
              style={{
                padding: "15px 30px",
                background: "#fff",
                color: "#1f4d40",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              ゴルフ場お問い合わせ
            </Link>
            <Link
              className="btn"
              href="/contact-event"
              style={{
                padding: "15px 30px",
                background: "#c9a86e",
                color: "#463216",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              イベントキャディ依頼
            </Link>
            <Link
              className="btn"
              href="/recruit"
              style={{
                padding: "15px 30px",
                background: "rgba(255,255,255,.14)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,.6)",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              採用エントリー
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
