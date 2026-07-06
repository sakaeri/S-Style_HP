import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllNews, getNewsBySlug, categoryStyle } from "@/lib/news";

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} ｜ 株式会社S-Style`,
    description: post.body[0],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  const style = categoryStyle[post.category];
  const news = await getAllNews();
  const others = news.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "44px 5vw 0" }}>
        <div style={{ fontSize: 12.5, color: "#8aa89a", fontWeight: 700 }}>
          <Link href="/" style={{ color: "#8aa89a" }}>
            ホーム
          </Link>{" "}
          ／{" "}
          <Link href="/blog" style={{ color: "#8aa89a" }}>
            お知らせ
          </Link>{" "}
          ／ {post.category}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", margin: "20px 0 14px" }}>
          <span
            style={{
              padding: "5px 16px",
              background: style.gradient,
              color: style.color,
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {post.category}
          </span>
          <span style={{ fontSize: 12.5, color: "#8aa89a", fontWeight: 700, fontFamily: "'Shippori Mincho', serif" }}>
            {post.date}
          </span>
        </div>
        <h1 style={{ font: "700 clamp(24px,3.2vw,34px)/1.5 'Shippori Mincho', serif", margin: 0, color: "#123329" }}>
          {post.title}
        </h1>
      </section>

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "28px 5vw 0" }}>
        <div
          style={{
            position: "relative",
            height: 300,
            borderRadius: 24,
            overflow: "hidden",
            background: post.eyecatch
              ? undefined
              : "radial-gradient(circle at 30% 30%,rgba(58,143,124,.9),transparent 55%),radial-gradient(circle at 78% 68%,rgba(30,132,150,.85),transparent 55%),#173b33",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {post.eyecatch && (
            <Image src={post.eyecatch} alt={post.title} fill style={{ objectFit: "cover" }} />
          )}
          {!post.eyecatch && (
            <span
              style={{
                font: "11px ui-monospace, monospace",
                color: "rgba(255,255,255,.7)",
                background: "rgba(0,0,0,.2)",
                padding: "6px 12px",
                borderRadius: 6,
              }}
            >
              お知らせのアイキャッチ画像
            </span>
          )}
        </div>
      </section>

      <article style={{ maxWidth: 820, margin: "0 auto", padding: "40px 5vw 20px", fontSize: 15.5, lineHeight: 2.15, color: "#33463d" }}>
        {post.body.map((paragraph, i) => (
          <p key={i} style={{ margin: "0 0 24px" }}>
            {paragraph}
          </p>
        ))}
        {post.overview && (
          <div
            style={{
              background: "rgba(255,255,255,.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.7)",
              borderRadius: 16,
              padding: "22px 26px",
              margin: "0 0 24px",
            }}
          >
            <div style={{ font: "700 15px 'Shippori Mincho', serif", color: "#1f4d40", marginBottom: 10 }}>
              概要
            </div>
            <div style={{ fontSize: 14, lineHeight: 2, fontWeight: 500 }}>
              {post.overview.map((row) => (
                <div key={row.label}>
                  <b>{row.label}：</b>
                  {row.value}
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "20px 5vw 40px", textAlign: "center" }}>
        <Link
          className="btn"
          href="/blog"
          style={{ display: "inline-block", padding: "14px 34px", background: "#22564b", color: "#fff", borderRadius: 999, fontWeight: 700, fontSize: 14 }}
        >
          お知らせ一覧へ戻る
        </Link>
      </section>

      {others.length > 0 && (
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "0 5vw 60px" }}>
          <h2 style={{ font: "700 22px 'Shippori Mincho', serif", color: "#1f4d40", margin: "0 0 20px" }}>
            その他のお知らせ
          </h2>
          <div
            style={{
              background: "rgba(255,255,255,.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.7)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(31,77,64,.08)",
            }}
          >
            {others.map((p, i) => {
              const s = categoryStyle[p.category];
              return (
                <Link
                  key={p.slug}
                  className="newsrow news-row"
                  href={`/blog/${p.slug}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 90px 1fr",
                    gap: 16,
                    alignItems: "center",
                    padding: "20px 24px",
                    borderBottom: i < others.length - 1 ? "1px solid rgba(31,77,64,.1)" : "none",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#8aa89a", fontWeight: 700, fontFamily: "'Shippori Mincho', serif" }}>
                    {p.date}
                  </span>
                  <span
                    style={{
                      textAlign: "center",
                      padding: "5px 0",
                      background: s.gradient,
                      color: s.color,
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {p.category}
                  </span>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: "#123329" }}>{p.title}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
