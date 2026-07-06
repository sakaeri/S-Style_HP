import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 5vw",
        background: "rgba(18,51,41,.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "2px solid #c9a86e",
        boxShadow: "0 2px 18px rgba(11,61,44,.25)",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: 11 }}
      >
        <Image
          src="/assets/bibi-logo.webp"
          alt="S-Style BiBi"
          width={44}
          height={44}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #c9a86e",
          }}
        />
        <span style={{ font: "700 20px 'Shippori Mincho', serif", color: "#fff" }}>
          S-Style
        </span>
      </Link>
      <nav
        className="hdr-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 26,
          fontSize: 13.5,
          color: "#eafaf3",
          fontWeight: 700,
        }}
      >
        <Link className="navlink" href="/about">
          会社案内
        </Link>
        <Link className="navlink" href="/caddie-day">
          キャディの一日
        </Link>
        <Link className="navlink" href="/event">
          イベントキャディ
        </Link>
        <Link className="navlink" href="/recruit">
          採用情報
        </Link>
        <Link className="navlink" href="/blog">
          お知らせ
        </Link>
        <Link
          className="btn"
          href="/contact-course"
          style={{
            padding: "11px 22px",
            background: "#c9a86e",
            color: "#463216",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          お問い合わせ
        </Link>
      </nav>
    </header>
  );
}
