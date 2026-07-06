import Link from "next/link";
import type { ReactNode } from "react";

export default function PageBanner({
  eyebrow,
  title,
  breadcrumb,
  description,
  square = false,
}: {
  eyebrow: string;
  title: ReactNode;
  breadcrumb?: string;
  description?: string;
  square?: boolean;
}) {
  return (
    <section
      style={{
        position: "relative",
        color: "#fff",
        padding: "56px 5vw",
        overflow: "hidden",
        background:
          "repeating-linear-gradient(63deg,rgba(6,16,12,.36) 0 2px,transparent 2px 46px),repeating-linear-gradient(-63deg,rgba(6,16,12,.36) 0 2px,transparent 2px 46px),linear-gradient(rgba(23,59,51,.42),rgba(23,59,51,.54)),radial-gradient(circle at 20% 26%,rgba(58,143,124,.92),transparent 48%),radial-gradient(circle at 80% 22%,rgba(30,132,150,.88),transparent 48%),radial-gradient(circle at 62% 88%,rgba(178,138,82,.8),transparent 48%),#173b33",
      }}
    >
      {square && (
        <div
          style={{
            position: "absolute",
            top: -20,
            right: "8vw",
            width: 80,
            height: 92,
            background: "rgba(255,255,255,.12)",
            borderRadius: 12,
          }}
        />
      )}
      <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            font: "700 12px 'Shippori Mincho', serif",
            letterSpacing: ".25em",
            color: "#c9a86e",
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            font: "700 clamp(28px,3.6vw,42px) 'Shippori Mincho', serif",
            margin: "10px 0 0",
          }}
        >
          {title}
        </h1>
        {breadcrumb && (
          <div style={{ fontSize: 12.5, marginTop: 14, color: "rgba(255,255,255,.85)" }}>
            <Link href="/" style={{ color: "#fff" }}>
              ホーム
            </Link>{" "}
            ／ {breadcrumb}
          </div>
        )}
        {description && (
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.9)", margin: "14px 0 0", fontWeight: 500 }}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
