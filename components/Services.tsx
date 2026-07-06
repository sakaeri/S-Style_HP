import Link from "next/link";

const services = [
  {
    num: "01",
    gradient: "linear-gradient(135deg,#3a8f7c,#1e8ca0)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.35),0 6px 14px rgba(30,132,150,.3)",
    title: "契約ゴルフ場派遣",
    body: "育成済みのSランクキャディを、全国のご契約ゴルフ場へ安定してお届けします。",
    linkHref: "/contact-course",
    linkLabel: "ゴルフ場のご相談 →",
    linkColor: "#22564b",
  },
  {
    num: "02",
    gradient: "linear-gradient(135deg,#c9a86e,#b24f7a)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.4),0 6px 14px rgba(178,79,122,.28)",
    title: "イベントキャディ",
    body: "契約外のゴルフ場・コンペにも単発で派遣。大切な一日を華やかに彩ります。",
    linkHref: "/contact-event",
    linkLabel: "イベントのご依頼 →",
    linkColor: "#b28a52",
  },
  {
    num: "03",
    gradient: "linear-gradient(135deg,#7a4f9f,#3a5f9f)",
    shadow: "inset 0 2px 8px rgba(255,255,255,.35),0 6px 14px rgba(90,79,159,.28)",
    title: "プレーヤー指名",
    body: (
      <>
        プレーヤー様からのご依頼も受付。
        <b style={{ color: "#1f4d40" }}>※事前にゴルフ場への確認が必須です。</b>
      </>
    ),
    linkHref: "/contact-event",
    linkLabel: "ご相談はコチラ →",
    linkColor: "#22564b",
  },
];

export default function Services() {
  return (
    <section style={{ padding: "52px 5vw" }}>
      <div style={{ textAlign: "center", marginBottom: 38 }}>
        <div
          style={{
            font: "700 12px 'Shippori Mincho', serif",
            letterSpacing: ".2em",
            color: "#b28a52",
          }}
        >
          SERVICE
        </div>
        <h2
          style={{
            font: "700 clamp(26px,3vw,32px) 'Shippori Mincho', serif",
            margin: "8px 0 0",
            color: "#1f4d40",
          }}
        >
          3つの派遣のかたち
        </h2>
      </div>
      <div
        className="g3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 24,
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        {services.map((s) => (
          <div
            key={s.num}
            className="gcard"
            style={{
              background: "rgba(255,255,255,.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.75)",
              borderRadius: 24,
              padding: "34px 30px",
              boxShadow: "0 10px 30px rgba(31,77,64,.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 58,
                height: 66,
                margin: "0 auto 18px",
                background: s.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "700 20px 'Shippori Mincho', serif",
                color: "#fff",
                borderRadius: 12,
                boxShadow: s.shadow,
              }}
            >
              {s.num}
            </div>
            <h3
              style={{
                font: "700 19px 'Shippori Mincho', serif",
                margin: "0 0 12px",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.95,
                color: "#4d5f56",
                margin: "0 0 18px",
                fontWeight: 500,
              }}
            >
              {s.body}
            </p>
            <Link
              href={s.linkHref}
              style={{ fontSize: 13, color: s.linkColor, fontWeight: 700 }}
            >
              {s.linkLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
