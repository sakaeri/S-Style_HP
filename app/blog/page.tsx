import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { getAllNews, categoryStyle } from "@/lib/news";

export const metadata: Metadata = {
  title: "お知らせ ｜ 株式会社S-Style",
  description:
    "株式会社S-Styleからのお知らせ一覧。契約ゴルフ場の追加、新サービスのリリース、BiBiオリジナルグッズの販売情報などをお届けします。",
};

export default async function BlogPage() {
  const news = await getAllNews();
  return (
    <>
      <Header />
      <PageBanner eyebrow="NEWS" title="お知らせ" description="S-Styleの最新情報をお届けします。" />

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 5vw 20px" }}>
        <div
          style={{
            background: "rgba(255,255,255,.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,.7)",
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 12px 34px rgba(31,77,64,.1)",
          }}
        >
          {news.map((post, i) => {
            const style = categoryStyle[post.category];
            return (
              <Link
                key={post.slug}
                className="newsrow news-row"
                href={`/blog/${post.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 96px 1fr auto",
                  gap: 18,
                  alignItems: "center",
                  padding: "22px 26px",
                  borderBottom: i < news.length - 1 ? "1px solid rgba(31,77,64,.1)" : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "#8aa89a", fontWeight: 700, fontFamily: "'Shippori Mincho', serif" }}>
                  {post.date}
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
                  {post.category}
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#123329", lineHeight: 1.6 }}>
                  {post.title}
                </span>
                <span style={{ fontSize: 16, color: "#c9a86e" }}>→</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
