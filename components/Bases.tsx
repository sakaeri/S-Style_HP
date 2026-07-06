const bases = [
  { name: "千葉県", active: true },
  { name: "北海道" },
  { name: "沖縄県" },
  { name: "山梨県" },
  { name: "兵庫県" },
  { name: "大阪府" },
  { name: "埼玉県" },
  { name: "三重県" },
];

export default function Bases() {
  return (
    <section
      className="bases-grid"
      style={{
        margin: "0 5vw 52px",
        background: "rgba(255,255,255,.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,.7)",
        borderRadius: 30,
        padding: "48px 5vw",
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: 36,
        alignItems: "center",
        boxShadow: "0 12px 34px rgba(31,77,64,.1)",
      }}
    >
      <div>
        <h2
          style={{
            font: "700 clamp(24px,3vw,28px) 'Shippori Mincho', serif",
            margin: "0 0 12px",
            color: "#1f4d40",
          }}
        >
          全国8拠点のネットワーク
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.95, color: "#3b5248", margin: 0, fontWeight: 500 }}>
          本拠点の千葉を中心に、全国7支店。地域に根ざしたネットワークで、最適なキャディをアサインします。
        </p>
      </div>
      <div
        className="bases-tags"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}
      >
        {bases.map((b) =>
          b.active ? (
            <span
              key={b.name}
              style={{
                padding: "12px 20px",
                textAlign: "center",
                background: "linear-gradient(135deg,#3a8f7c,#1e8ca0)",
                color: "#fff",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(30,132,150,.28)",
              }}
            >
              {b.name}
            </span>
          ) : (
            <span
              key={b.name}
              style={{
                padding: "12px 20px",
                textAlign: "center",
                background: "rgba(255,255,255,.75)",
                border: "1px solid rgba(58,143,124,.3)",
                borderRadius: 999,
                fontSize: 14,
                color: "#2f4a40",
                fontWeight: 700,
              }}
            >
              {b.name}
            </span>
          )
        )}
      </div>
    </section>
  );
}
