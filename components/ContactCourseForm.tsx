"use client";

import { useState, type FormEvent } from "react";

const inputStyle: React.CSSProperties = {
  padding: "13px 14px",
  border: "1.5px solid #dbe4dd",
  borderRadius: 12,
  fontSize: 14,
  background: "#fbfdfb",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 7,
  fontSize: 13,
  fontWeight: 700,
  color: "#123329",
};

const required = (
  <span style={{ color: "#dc4c3e", verticalAlign: "super", fontSize: 11 }}>*</span>
);

export default function ContactCourseForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "course",
          fields: {
            courseName: data.get("courseName") ?? "",
            contactName: data.get("contactName") ?? "",
            phone: data.get("phone") ?? "",
            email: data.get("email") ?? "",
            topic: data.get("topic") ?? "",
            details: data.get("details") ?? "",
            agree: data.get("agree") ? "true" : "",
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "送信に失敗しました");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "送信に失敗しました");
    }
  }

  if (status === "done") {
    return (
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "28px 5vw 64px" }}>
        <div style={{ background: "#fff", borderRadius: 26, padding: 44, border: "1px solid #eceadb", textAlign: "center" }}>
          <h2 style={{ font: "700 22px 'Shippori Mincho', serif", color: "#1f4d40", margin: "0 0 12px" }}>
            お問い合わせを受け付けました
          </h2>
          <p style={{ fontSize: 14, color: "#4d5f56", margin: 0, fontWeight: 500 }}>
            お問い合わせいただきありがとうございます。担当者より折り返しご連絡いたします。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 820, margin: "0 auto", padding: "28px 5vw 64px" }}>
      <div style={{ background: "#fff", borderRadius: 26, padding: 44, border: "1px solid #eceadb" }}>
        <p style={{ fontSize: 14, color: "#4d5f56", margin: "0 0 28px", lineHeight: 1.9, fontWeight: 500 }}>
          契約キャディ派遣・スポット派遣のご相談を承ります。下記フォームにご記入ください。担当者より折り返しご連絡いたします。
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={labelStyle}>
            <span>ゴルフ場名 {required}</span>
            <input name="courseName" required type="text" placeholder="○○カントリークラブ" style={inputStyle} />
          </label>
          <div className="form-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={labelStyle}>
              <span>ご担当者名 {required}</span>
              <input name="contactName" required type="text" placeholder="山田 太郎" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              電話番号
              <input name="phone" type="tel" placeholder="000-0000-0000" style={inputStyle} />
            </label>
          </div>
          <label style={labelStyle}>
            <span>メールアドレス {required}</span>
            <input name="email" required type="email" placeholder="mail@example.com" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            <span>ご相談内容 {required}</span>
            <select name="topic" required style={inputStyle} defaultValue="">
              <option value="" disabled>
                選択してください
              </option>
              <option>契約キャディ派遣について</option>
              <option>スポット（単発）派遣について</option>
              <option>料金・条件について</option>
              <option>その他</option>
            </select>
          </label>
          <label style={labelStyle}>
            お問い合わせ詳細
            <textarea name="details" rows={5} placeholder="ご希望の時期・人数・コース状況などをご記入ください" style={{ ...inputStyle, resize: "vertical" }} />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#4d5f56", fontWeight: 500 }}>
            <input name="agree" required type="checkbox" style={{ width: 17, height: 17, accentColor: "#22564b" }} />
            <span>個人情報の取り扱いに同意します</span>
          </label>
          {status === "error" && (
            <p style={{ color: "#dc4c3e", fontSize: 13, fontWeight: 700, margin: 0 }}>{error}</p>
          )}
          <button
            className="btn"
            type="submit"
            disabled={status === "submitting"}
            style={{
              alignSelf: "center",
              padding: "16px 48px",
              background: "#22564b",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              font: "700 15px 'Shippori Mincho', serif",
              cursor: status === "submitting" ? "default" : "pointer",
              opacity: status === "submitting" ? 0.6 : 1,
              boxShadow: "0 8px 20px rgba(14,158,110,.25)",
            }}
          >
            {status === "submitting" ? "送信中…" : "送信する"}
          </button>
        </form>
      </div>
    </section>
  );
}
