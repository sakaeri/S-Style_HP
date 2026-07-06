import type { CSSProperties, ReactNode } from "react";

export default function GlassPanel({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 26,
        padding: 44,
        color: "#fff",
        boxShadow: "0 16px 44px rgba(16,40,34,.24)",
        background:
          "repeating-linear-gradient(63deg,rgba(6,16,12,.34) 0 2px,transparent 2px 46px),repeating-linear-gradient(-63deg,rgba(6,16,12,.34) 0 2px,transparent 2px 46px),linear-gradient(rgba(23,59,51,.42),rgba(23,59,51,.54)),radial-gradient(circle at 18% 24%,rgba(58,143,124,.9),transparent 48%),radial-gradient(circle at 84% 26%,rgba(30,132,150,.85),transparent 48%),radial-gradient(circle at 60% 92%,rgba(178,138,82,.8),transparent 48%),#173b33",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
