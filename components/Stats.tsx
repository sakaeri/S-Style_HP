const stats = [
  {
    value: "8",
    label: "全国拠点",
    bg: "rgba(58,143,124,.15)",
    border: "rgba(58,143,124,.4)",
    valueColor: "#1f4d40",
  },
  {
    value: "Sランク",
    label: "育成基準",
    bg: "rgba(30,132,150,.14)",
    border: "rgba(30,132,150,.4)",
    valueColor: "#186a7e",
  },
  {
    value: "単発OK",
    label: "イベント派遣",
    bg: "rgba(201,168,110,.2)",
    border: "rgba(201,168,110,.5)",
    valueColor: "#a5813f",
  },
];

export default function Stats() {
  return (
    <section
      className="stats3"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 18,
        padding: "44px 5vw 12px",
        maxWidth: 1120,
        margin: "0 auto",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            textAlign: "center",
            padding: 26,
            background: s.bg,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${s.border}`,
            borderRadius: 18,
          }}
        >
          <div
            style={{
              font: "700 40px 'Shippori Mincho', serif",
              color: s.valueColor,
            }}
          >
            {s.value}
          </div>
          <div style={{ fontSize: 13, color: "#3b5248", fontWeight: 700 }}>
            {s.label}
          </div>
        </div>
      ))}
    </section>
  );
}
