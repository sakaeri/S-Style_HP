import Link from "next/link";
import { getAllNews, categoryStyle } from "@/lib/news";

export default async function NewsPreview() {
  const news = await getAllNews();
  const latest = news.slice(0, 3);

  return (
    <section style={{ padding: "0 5vw 52px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 24,
          maxWidth: 1000,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2 style={{ font: "700 24px 'Shippori Mincho', serif", margin: 0, color: "#1f4d40" }}>
          お知らせ
        </h2>
        <Link href="/blog" style={{ fontSize: 12.5, color: "#22564b", fontWeight: 700 }}>
          お知らせ一覧 →
        </Link>
      </div>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          background: "rgba(255,255,255,.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,.75)",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(31,77,64,.1)",
        }}
      >
        {latest.map((n, i) => {
          const style = categoryStyle[n.category];
          return (
            <Link
              key={n.slug}
              className="gcard news-row"
              href={`/blog/${n.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 96px 1fr auto",
                gap: 18,
                alignItems: "center",
                padding: "20px 26px",
                borderBottom: i < latest.length - 1 ? "1px solid rgba(31,77,64,.1)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "#8aa89a",
                  fontWeight: 700,
                  fontFamily: "'Shippori Mincho', serif",
                }}
              >
                {n.date}
              </span>
              <span
                style={{
                  textAlign: "center",
                  padding: "5px 0",
                  background: style.gradient,
                  color: style.color,
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {n.category}
              </span>
              <span
                style={{
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: "#123329",
                  lineHeight: 1.6,
                }}
              >
                {n.title}
              </span>
              <span style={{ fontSize: 16, color: "#c9a86e" }}>→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
