import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "48px 5vw 36px",
        background: "#123329",
        color: "#a9d5c4",
        borderTop: "2px solid #c9a86e",
      }}
    >
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: 30,
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src="/assets/bibi-logo.webp"
              alt="BiBi"
              width={46}
              height={46}
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #c9a86e",
              }}
            />
            <div style={{ font: "700 22px 'Shippori Mincho', serif", color: "#fff" }}>
              S-Style
            </div>
          </div>
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.9,
              margin: 0,
              maxWidth: 280,
              fontWeight: 500,
            }}
          >
            BiBiと一緒に、旅するキャディという新しい働き方を全国へ。
            <br />
            SINCE 2020
          </p>
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.3, fontWeight: 500 }}>
          <div style={{ color: "#c9a86e", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
            会社案内
          </div>
          <Link className="navlink" href="/about#message">
            代表挨拶
          </Link>
          <br />
          <Link className="navlink" href="/about#company">
            会社概要
          </Link>
          <br />
          <Link className="navlink" href="/caddie-day">
            キャディの一日
          </Link>
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.3, fontWeight: 500 }}>
          <div style={{ color: "#c9a86e", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
            サービス・お知らせ
          </div>
          <Link className="navlink" href="/event">
            イベントキャディ
          </Link>
          <br />
          <Link className="navlink" href="/recruit">
            採用情報
          </Link>
          <br />
          <Link className="navlink" href="/blog">
            お知らせ
          </Link>
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.3, fontWeight: 500 }}>
          <div style={{ color: "#c9a86e", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
            お問い合わせ
          </div>
          <Link className="navlink" href="/contact-course">
            ゴルフ場様
          </Link>
          <br />
          <Link className="navlink" href="/contact-event">
            イベントキャディ
          </Link>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 36,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,.12)",
          fontSize: 11.5,
          color: "#6f9d8a",
        }}
      >
        © 2026 株式会社S-Style. All rights reserved.
      </div>
    </footer>
  );
}
