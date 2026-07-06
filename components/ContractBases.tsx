"use client";

import { useState } from "react";
import type { Base } from "@/lib/bases";

export default function ContractBases({ bases }: { bases: Base[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const selected = openIdx == null ? null : bases[openIdx];

  return (
    <section
      id="bases"
      style={{ maxWidth: 1000, margin: "0 auto", padding: "12px 5vw 64px", scrollMarginTop: 80 }}
    >
      <h2 style={{ font: "700 24px 'Shippori Mincho', serif", color: "#1f4d40", margin: "0 0 8px" }}>
        拠点一覧
      </h2>
      <p style={{ fontSize: 13.5, color: "#5d6b5a", margin: "0 0 24px", fontWeight: 500 }}>
        本拠点の千葉を中心に、全国7支店を展開しています。
        <b style={{ color: "#1f4d40" }}>拠点をタップすると、契約ゴルフ場の一覧が表示されます。</b>
      </p>
      <div
        className="base-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}
      >
        {bases.map((base, i) => {
          const active = base.role === "本拠点";
          return (
            <div
              key={base.name}
              className="base-card"
              role="button"
              tabIndex={0}
              onClick={() => setOpenIdx(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpenIdx(i);
              }}
              style={{
                background: active ? "#22564b" : "#fff",
                border: active ? "none" : "1px solid #e7ecdf",
                borderRadius: 16,
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  font: "700 17px 'Shippori Mincho', serif",
                  color: active ? "#fff" : "#123329",
                }}
              >
                {base.displayName}
              </div>
              <div
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  color: active ? "#eee9dd" : "#8aa89a",
                  fontWeight: 700,
                }}
              >
                契約先{base.courses.length}件
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  fontWeight: 700,
                  color: active ? "#fff" : "#22564b",
                  background: active ? "rgba(255,255,255,.18)" : "#eee9dd",
                  borderRadius: 999,
                  padding: "4px 0",
                }}
              >
                契約先を見る ▸
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          onClick={() => setOpenIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(11,61,44,.55)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fbf9f0",
              borderRadius: 26,
              maxWidth: 560,
              width: "100%",
              maxHeight: "82vh",
              overflow: "auto",
              boxShadow: "0 24px 60px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                background: "#22564b",
                color: "#fff",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 46,
                    background: "rgba(255,255,255,.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "700 15px 'Shippori Mincho', serif",
                    borderRadius: 12,
                  }}
                >
                  {selected.role === "本拠点" ? "本部" : "支店"}
                </div>
                <div>
                  <div style={{ font: "700 20px 'Shippori Mincho', serif" }}>
                    {selected.displayName}
                  </div>
                  <div style={{ fontSize: 11.5, color: "#eee9dd", fontWeight: 700, marginTop: 2 }}>
                    契約ゴルフ場 {selected.courses.length}件
                  </div>
                </div>
              </div>
              <div
                className="modal-x"
                onClick={() => setOpenIdx(null)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                ×
              </div>
            </div>
            <div style={{ padding: "22px 28px 28px" }}>
              {selected.courses.map((course, i) => (
                <div
                  key={course.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "15px 0",
                    borderBottom: i < selected.courses.length - 1 ? "1px solid #eceadb" : "none",
                  }}
                >
                  <div
                    style={{
                      flex: "none",
                      width: 34,
                      height: 38,
                      background: "#eee9dd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      font: "700 13px 'Shippori Mincho', serif",
                      color: "#22564b",
                      borderRadius: 12,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#123329" }}>
                      {course.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#8aa89a", fontWeight: 500, marginTop: 2 }}>
                      {course.area}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
