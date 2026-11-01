const CHAT_URL = "https://port.s-stylegolf.com/s-style";

export default function ContactLink({
  title,
  description,
  buttonLabel = "お問い合わせフォームへ",
}: {
  title: string;
  description: string;
  buttonLabel?: string;
}) {
  return (
    <section style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5vw 64px" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 26,
          padding: 44,
          border: "1px solid #eceadb",
          textAlign: "center",
        }}
      >
        <h2 style={{ font: "700 24px 'Shippori Mincho', serif", color: "#1f4d40", margin: "0 0 8px" }}>
          {title}
        </h2>
        <p style={{ fontSize: 13, color: "#5d6b5a", margin: "0 0 28px", fontWeight: 500, lineHeight: 1.9 }}>
          {description}
        </p>
        <a
          href={CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{
            display: "inline-block",
            padding: "16px 48px",
            background: "#22564b",
            color: "#fff",
            borderRadius: 999,
            font: "700 15px 'Shippori Mincho', serif",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(14,158,110,.25)",
            textDecoration: "none",
          }}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
