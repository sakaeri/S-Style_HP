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

export default function ContactEventForm() {
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
          type: "event",
          fields: {
            requestType: data.get("requestType") ?? "",
            name: data.get("name") ?? "",
            phone: data.get("phone") ?? "",
            email: data.get("email") ?? "",
            desiredDate: data.get("desiredDate") ?? "",
            courseName: data.get("courseName") ?? "",
            confirmed: data.get("confirmed") ? "true" : "",
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
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5vw 64px" }}>
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
    <section style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5vw 64px" }}>
      <div style={{ background: "#fff", borderRadius: 26, padding: 44, border: "1px solid #eceadb" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={labelStyle}>
            <span>ご依頼の種類 {required}</span>
            <select name="requestType" required style={inputStyle} defaultValue="">
              <option value="" disabled>
                選択してください
              </option>
              <option>イベント・コンペへのキャディ派遣</option>
              <option>プレーヤーとしてキャディを指名したい</option>
              <option>その他のご相談</option>
            </select>
          </label>
          <div className="form-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={labelStyle}>
              <span>お名前 {required}</span>
              <input name="name" required type="text" placeholder="山田 太郎" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              電話番号
              <input name="phone" type="tel" placeholder="090-0000-0000" style={inputStyle} />
            </label>
          </div>
          <label style={labelStyle}>
            <span>メールアドレス {required}</span>
            <input name="email" required type="email" placeholder="mail@example.com" style={inputStyle} />
          </label>
          <div className="form-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={labelStyle}>
              ご希望日
              <input name="desiredDate" type="date" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              プレー予定のゴルフ場名
              <input name="courseName" type="text" placeholder="○○カントリークラブ" style={inputStyle} />
            </label>
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: "#564628",
              fontWeight: 700,
              background: "#f6efe1",
              padding: "14px 16px",
              borderRadius: 12,
            }}
          >
            <input name="confirmed" required type="checkbox" style={{ width: 17, height: 17, accentColor: "#b28a52", marginTop: 2 }} />
            <span>プレー予定のゴルフ場へ事前にお問い合わせ・ご了承済みです</span>
          </label>
          <label style={labelStyle}>
            ご依頼内容
            <textarea name="details" rows={4} placeholder="人数・時間・ご希望などをご記入ください" style={{ ...inputStyle, resize: "vertical" }} />
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
