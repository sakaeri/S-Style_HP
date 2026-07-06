const reasons = [
  {
    title: "育成品質",
    body: "独自基準で磨いたSランクキャディ。マナーも技術も高水準でお届けします。",
  },
  {
    title: "全国対応",
    body: "北海道から沖縄まで8拠点。地域を越えて、必要な時に必要な人材を。",
  },
  {
    title: "柔軟な派遣",
    body: "契約はもちろん、単発・イベントにも対応。急なご相談もお気軽に。",
  },
];

export default function WhyUs() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        margin: "0 5vw 52px",
        borderRadius: 30,
        padding: "52px 5vw",
        color: "#fff",
        background:
          "radial-gradient(circle at 22% 30%,rgba(58,143,124,.95),transparent 46%),radial-gradient(circle at 78% 24%,rgba(30,132,150,.9),transparent 48%),radial-gradient(circle at 60% 88%,rgba(178,138,82,.85),transparent 46%),#173b33",
        boxShadow: "0 14px 40px rgba(16,40,34,.25)",
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
      <div style={{ position: "relative", textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            font: "700 12px 'Shippori Mincho', serif",
            letterSpacing: ".2em",
            color: "#e6cf9c",
          }}
        >
          WHY S-STYLE
        </div>
        <h2
          style={{
            font: "700 clamp(24px,3vw,30px) 'Shippori Mincho', serif",
            margin: "8px 0 0",
          }}
        >
          S-Styleが選ばれる理由
        </h2>
      </div>
      <div
        className="g3"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 24,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {reasons.map((r) => (
          <div key={r.title} style={{ textAlign: "center" }}>
            <div
              style={{
                font: "700 22px 'Shippori Mincho', serif",
                marginBottom: 8,
                color: "#e6cf9c",
              }}
            >
              {r.title}
            </div>
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.95,
                color: "rgba(255,255,255,.92)",
                margin: 0,
                fontWeight: 500,
              }}
            >
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
