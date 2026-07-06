import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社S-Style",
  description:
    "株式会社S-StyleはSランクキャディを育成し、全国8拠点から派遣するキャディ派遣会社です。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Shippori+Mincho:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="page-bg">{children}</body>
    </html>
  );
}
