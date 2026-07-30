import type { ReactNode } from "react";

export default function InfoTable({
  rows,
  labelWidth = 200,
}: {
  rows: { label: string; value: ReactNode }[];
  labelWidth?: number;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.55)",
        boxShadow: "0 10px 30px rgba(16,40,34,.18)",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className="info-row"
          style={{
            display: "grid",
            gridTemplateColumns: `${labelWidth}px 1fr`,
            borderBottom: i < rows.length - 1 ? "1px solid rgba(31,77,64,.12)" : "none",
          }}
        >
          <div
            className="info-label"
            style={{
              padding: "20px 24px",
              background: "rgba(34,86,75,.12)",
              fontWeight: 700,
              fontSize: 14,
              color: "#1f4d40",
            }}
          >
            {row.label}
          </div>
          <div
            className="info-value"
            style={{ padding: "20px 24px", fontSize: 14, fontWeight: 500, lineHeight: 1.9, color: "#33463d" }}
          >
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}
