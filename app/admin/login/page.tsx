"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "ログインに失敗しました");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f1e8",
        fontFamily: "var(--font-gothic)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: 40,
          width: "min(360px, 88vw)",
          boxShadow: "0 20px 50px rgba(16,40,34,.16)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <h1 style={{ font: "700 20px 'Shippori Mincho', serif", color: "#1f4d40", margin: 0, textAlign: "center" }}>
          S-Style 管理ダッシュボード
        </h1>
        <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, fontWeight: 700, color: "#123329" }}>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            style={{ padding: "12px 14px", border: "1.5px solid #dbe4dd", borderRadius: 12, fontSize: 14 }}
          />
        </label>
        {error && <p style={{ color: "#dc4c3e", fontSize: 13, margin: 0, fontWeight: 700 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "13px 20px",
            background: "#22564b",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "確認中…" : "ログイン"}
        </button>
      </form>
    </div>
  );
}
