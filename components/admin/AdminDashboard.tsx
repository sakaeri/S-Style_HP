"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewsPost, NewsCategory } from "@/lib/news";
import type { Inquiry, InquiryType } from "@/lib/inquiries";
import type { SiteSettings } from "@/lib/settings";
import type { Base } from "@/lib/bases";

const CATEGORIES: NewsCategory[] = ["お知らせ", "契約情報", "サービス", "グッズ", "イベント"];

const INQUIRY_LABEL: Record<InquiryType, string> = {
  course: "ゴルフ場お問い合わせ",
  event: "イベント／プレーヤー様",
  recruit: "採用エントリー",
};

const FIELD_LABEL: Record<string, string> = {
  courseName: "ゴルフ場名",
  contactName: "ご担当者名",
  phone: "電話番号",
  email: "メールアドレス",
  topic: "ご相談内容",
  details: "詳細",
  agree: "個人情報同意",
  requestType: "ご依頼の種類",
  name: "お名前",
  desiredDate: "ご希望日",
  confirmed: "事前確認済み",
  kana: "フリガナ",
  location: "希望勤務地",
  experience: "キャディ経験",
  message: "メッセージ",
};

type Tab = "news" | "bases" | "inquiries" | "settings";

const wrapStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f4f1e8",
  fontFamily: "var(--font-gothic)",
  color: "#123329",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: 28,
  border: "1px solid #eceadb",
  marginBottom: 20,
};

const inputStyle: React.CSSProperties = {
  padding: "11px 13px",
  border: "1.5px solid #dbe4dd",
  borderRadius: 10,
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
};

const btnPrimary: React.CSSProperties = {
  padding: "11px 22px",
  background: "#22564b",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13.5,
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  padding: "10px 18px",
  background: "#eee9dd",
  color: "#1f4d40",
  border: "none",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  padding: "10px 18px",
  background: "#fbeceb",
  color: "#c0392b",
  border: "none",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
};

const uploadBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 22px",
  background: "#22564b",
  color: "#fff",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13.5,
  cursor: "pointer",
  width: "fit-content",
};

function UploadButton({
  label,
  uploading,
  onSelect,
}: {
  label: string;
  uploading: boolean;
  onSelect: (file: File) => void;
}) {
  return (
    <label style={{ ...uploadBtnStyle, opacity: uploading ? 0.6 : 1 }}>
      {uploading ? "アップロード中…" : label}
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = "";
        }}
        style={{ display: "none" }}
      />
    </label>
  );
}

interface NewsDraft {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  eyecatch: string | null;
  bodyText: string;
}

function emptyDraft(): NewsDraft {
  return { slug: "", title: "", category: "お知らせ", date: "", eyecatch: null, bodyText: "" };
}

function toDraft(post: NewsPost): NewsDraft {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    eyecatch: post.eyecatch,
    bodyText: post.body.join("\n\n"),
  };
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `news-${Date.now()}`
  );
}

function senderSummary(inq: Inquiry): string {
  if (inq.type === "course") {
    const course = inq.fields.courseName || "";
    const contact = inq.fields.contactName || "";
    return [course, contact].filter(Boolean).join(" ／ ") || "（不明）";
  }
  return inq.fields.name || "（不明）";
}

const MAX_UPLOAD_SIZE = 4 * 1024 * 1024;

async function uploadImage(file: File, folder: "news" | "president"): Promise<string> {
  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error("画像サイズが大きすぎます（4MBまで）。写真アプリなどで縮小してから再度お試しください。");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });

  let body: { url?: string; error?: string };
  try {
    body = await res.json();
  } catch {
    throw new Error(
      res.ok ? "アップロードに失敗しました" : `アップロードに失敗しました（サーバーエラー: ${res.status}）`
    );
  }
  if (!res.ok || !body.url) throw new Error(body.error || "アップロードに失敗しました");
  return body.url;
}

export default function AdminDashboard({
  initialNews,
  initialInquiries,
  initialSettings,
  initialBases,
  usingDefaultPassword,
}: {
  initialNews: NewsPost[];
  initialInquiries: Inquiry[];
  initialSettings: SiteSettings;
  initialBases: Base[];
  usingDefaultPassword: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("news");
  const [news, setNews] = useState(initialNews);
  const [inquiries] = useState(initialInquiries);
  const [expandedInquiries, setExpandedInquiries] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState(initialSettings);
  const [bases, setBases] = useState(initialBases);

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState<NewsDraft | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");

  const [basesSaving, setBasesSaving] = useState(false);
  const [basesSaved, setBasesSaved] = useState(false);
  const [basesError, setBasesError] = useState("");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function startNew() {
    setEditingSlug("__new__");
    setDraft(emptyDraft());
    setSaveError("");
  }

  function startEdit(post: NewsPost) {
    setEditingSlug(post.slug);
    setDraft(toDraft(post));
    setSaveError("");
  }

  function cancelEdit() {
    setEditingSlug(null);
    setDraft(null);
    setSaveError("");
  }

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const url = await uploadImage(file, "news");
      setDraft((d) => (d ? { ...d, eyecatch: url } : d));
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    setSaveError("");

    const isNew = editingSlug === "__new__";
    const slug = isNew ? slugify(draft.slug || draft.title) : draft.slug;
    const body = draft.bodyText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      slug,
      title: draft.title,
      category: draft.category,
      date: draft.date,
      eyecatch: draft.eyecatch,
      body,
    };

    try {
      const res = await fetch(isNew ? "/api/admin/news" : `/api/admin/news/${draft.slug}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "保存に失敗しました");

      setNews((prev) => {
        if (isNew) return [result, ...prev];
        return prev.map((p) => (p.slug === draft.slug ? result : p));
      });
      cancelEdit();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("このお知らせを削除しますか？")) return;
    const res = await fetch(`/api/admin/news/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setNews((prev) => prev.filter((p) => p.slug !== slug));
    }
  }

  async function handleSettingsSave() {
    setSettingsSaving(true);
    setSettingsSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings.recipients, presidentPhoto: settings.presidentPhoto }),
      });
      const result = await res.json();
      if (res.ok) {
        setSettings(result);
        setSettingsSaved(true);
      }
    } finally {
      setSettingsSaving(false);
    }
  }

  async function handlePresidentPhotoUpload(file: File) {
    setPhotoUploading(true);
    setPhotoError("");
    try {
      const url = await uploadImage(file, "president");
      setSettings((s) => ({ ...s, presidentPhoto: url }));
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : "アップロードに失敗しました");
    } finally {
      setPhotoUploading(false);
    }
  }

  function updateBase(index: number, updates: Partial<Base>) {
    setBases((prev) => prev.map((b, i) => (i === index ? { ...b, ...updates } : b)));
  }

  function updateCourse(baseIndex: number, courseIndex: number, updates: Partial<Base["courses"][number]>) {
    setBases((prev) =>
      prev.map((b, i) =>
        i === baseIndex
          ? { ...b, courses: b.courses.map((c, ci) => (ci === courseIndex ? { ...c, ...updates } : c)) }
          : b
      )
    );
  }

  function addCourse(baseIndex: number) {
    setBases((prev) =>
      prev.map((b, i) => (i === baseIndex ? { ...b, courses: [...b.courses, { name: "", area: b.displayName }] } : b))
    );
  }

  function removeCourse(baseIndex: number, courseIndex: number) {
    setBases((prev) =>
      prev.map((b, i) => (i === baseIndex ? { ...b, courses: b.courses.filter((_, ci) => ci !== courseIndex) } : b))
    );
  }

  function addBase() {
    setBases((prev) => [...prev, { name: "", displayName: "", role: "支店", courses: [] }]);
  }

  function removeBase(index: number) {
    if (!confirm("この拠点を削除しますか？契約ゴルフ場もすべて削除されます。")) return;
    setBases((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleBasesSave() {
    setBasesSaving(true);
    setBasesSaved(false);
    setBasesError("");
    try {
      const res = await fetch("/api/admin/bases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bases),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "保存に失敗しました");
      setBases(result);
      setBasesSaved(true);
    } catch (err) {
      setBasesError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setBasesSaving(false);
    }
  }

  return (
    <div style={wrapStyle}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 5vw",
          background: "#123329",
          color: "#fff",
        }}
      >
        <div style={{ font: "700 18px 'Shippori Mincho', serif" }}>S-Style 管理ダッシュボード</div>
        <button onClick={handleLogout} style={{ ...btnGhost, background: "rgba(255,255,255,.15)", color: "#fff" }}>
          ログアウト
        </button>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 5vw 80px" }}>
        {usingDefaultPassword && (
          <div
            style={{
              background: "#f6efe1",
              border: "1.5px solid #c9a86e",
              borderRadius: 14,
              padding: "14px 18px",
              marginBottom: 20,
              fontSize: 13,
              color: "#6d5528",
              fontWeight: 700,
            }}
          >
            現在デフォルトのパスワードで運用中です。本番公開前に環境変数 ADMIN_PASSWORD
            を設定して、必ず変更してください。
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {(
            [
              ["news", "お知らせ"],
              ["bases", "拠点・契約先"],
              ["inquiries", "お問い合わせ"],
              ["settings", "設定"],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={tab === key ? btnPrimary : btnGhost}>
              {label}
            </button>
          ))}
        </div>

        {tab === "news" && (
          <div>
            {!editingSlug && (
              <button style={{ ...btnPrimary, marginBottom: 20 }} onClick={startNew}>
                + 新しいお知らせ
              </button>
            )}

            {editingSlug && draft && (
              <div style={cardStyle}>
                <h2 style={{ font: "700 17px 'Shippori Mincho', serif", margin: "0 0 18px", color: "#1f4d40" }}>
                  {editingSlug === "__new__" ? "新しいお知らせ" : "お知らせを編集"}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                    タイトル
                    <input
                      style={inputStyle}
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    />
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                      カテゴリ
                      <select
                        style={inputStyle}
                        value={draft.category}
                        onChange={(e) => setDraft({ ...draft, category: e.target.value as NewsCategory })}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                      日付（例: 2026.07.06）
                      <input
                        style={inputStyle}
                        value={draft.date}
                        onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                      />
                    </label>
                  </div>
                  {editingSlug === "__new__" && (
                    <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                      URL用スラッグ（空欄でタイトルから自動生成／半角英数とハイフンのみ）
                      <input
                        style={inputStyle}
                        value={draft.slug}
                        onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                        placeholder="例: new-course-contract"
                      />
                    </label>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700 }}>アイキャッチ画像</span>
                    {draft.eyecatch && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={draft.eyecatch}
                        alt="アイキャッチプレビュー"
                        style={{ width: "100%", maxWidth: 320, borderRadius: 14 }}
                      />
                    )}
                    <UploadButton
                      label={draft.eyecatch ? "画像を変更する" : "画像を選択してアップロード"}
                      uploading={uploading}
                      onSelect={handleUpload}
                    />
                  </div>
                  <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                    本文（段落は空行で区切ってください）
                    <textarea
                      rows={8}
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={draft.bodyText}
                      onChange={(e) => setDraft({ ...draft, bodyText: e.target.value })}
                    />
                  </label>
                  {saveError && <p style={{ color: "#dc4c3e", fontSize: 13, fontWeight: 700, margin: 0 }}>{saveError}</p>}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={btnPrimary} onClick={handleSave} disabled={saving}>
                      {saving ? "保存中…" : "保存する"}
                    </button>
                    <button style={btnGhost} onClick={cancelEdit}>
                      キャンセル
                    </button>
                  </div>
                </div>
              </div>
            )}

            {news.map((post) => (
              <div
                key={post.slug}
                style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  {post.eyecatch && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.eyecatch}
                      alt=""
                      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 10, flex: "none" }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: 12, color: "#8aa89a", fontWeight: 700 }}>
                      {post.date} ／ {post.category}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{post.title}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flex: "none" }}>
                  <button style={btnGhost} onClick={() => startEdit(post)}>
                    編集
                  </button>
                  <button style={btnDanger} onClick={() => handleDelete(post.slug)}>
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "bases" && (
          <div>
            <p style={{ fontSize: 12.5, color: "#5d6b5a", margin: "0 0 18px" }}>
              会社案内・採用情報ページの拠点一覧と、契約ゴルフ場のポップアップに反映されます。
            </p>
            {bases.map((base, baseIndex) => (
              <div key={baseIndex} style={cardStyle}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px auto", gap: 12, marginBottom: 16 }}>
                  <label style={{ fontSize: 11.5, fontWeight: 700 }}>
                    表示名（例: 千葉県）
                    <input
                      style={inputStyle}
                      value={base.displayName}
                      onChange={(e) => updateBase(baseIndex, { displayName: e.target.value })}
                    />
                  </label>
                  <label style={{ fontSize: 11.5, fontWeight: 700 }}>
                    内部名（例: 千葉）
                    <input
                      style={inputStyle}
                      value={base.name}
                      onChange={(e) => updateBase(baseIndex, { name: e.target.value })}
                    />
                  </label>
                  <label style={{ fontSize: 11.5, fontWeight: 700 }}>
                    区分
                    <select
                      style={inputStyle}
                      value={base.role}
                      onChange={(e) => updateBase(baseIndex, { role: e.target.value as Base["role"] })}
                    >
                      <option value="本拠点">本拠点</option>
                      <option value="支店">支店</option>
                    </select>
                  </label>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button style={btnDanger} onClick={() => removeBase(baseIndex)}>
                      拠点を削除
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: 12, fontWeight: 700, color: "#1f4d40", marginBottom: 8 }}>
                  契約ゴルフ場（{base.courses.length}件）
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {base.courses.map((course, courseIndex) => (
                    <div key={courseIndex} style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: 8 }}>
                      <input
                        style={inputStyle}
                        placeholder="ゴルフ場名"
                        value={course.name}
                        onChange={(e) => updateCourse(baseIndex, courseIndex, { name: e.target.value })}
                      />
                      <input
                        style={inputStyle}
                        placeholder="エリア"
                        value={course.area}
                        onChange={(e) => updateCourse(baseIndex, courseIndex, { area: e.target.value })}
                      />
                      <button style={btnDanger} onClick={() => removeCourse(baseIndex, courseIndex)}>
                        削除
                      </button>
                    </div>
                  ))}
                </div>
                <button style={btnGhost} onClick={() => addCourse(baseIndex)}>
                  + ゴルフ場を追加
                </button>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
              <button style={btnGhost} onClick={addBase}>
                + 拠点を追加
              </button>
              <button style={btnPrimary} onClick={handleBasesSave} disabled={basesSaving}>
                {basesSaving ? "保存中…" : "すべて保存する"}
              </button>
              {basesSaved && <span style={{ fontSize: 12.5, color: "#22564b", fontWeight: 700 }}>保存しました</span>}
              {basesError && <span style={{ fontSize: 12.5, color: "#dc4c3e", fontWeight: 700 }}>{basesError}</span>}
            </div>
          </div>
        )}

        {tab === "inquiries" && (
          <div>
            {inquiries.length === 0 && (
              <div style={cardStyle}>
                <p style={{ margin: 0, fontSize: 14, color: "#5d6b5a" }}>まだお問い合わせはありません。</p>
              </div>
            )}
            {inquiries.map((inq) => {
              const isOpen = expandedInquiries.has(inq.id);
              return (
                <div key={inq.id} style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setExpandedInquiries((prev) => {
                        const next = new Set(prev);
                        if (next.has(inq.id)) next.delete(inq.id);
                        else next.add(inq.id);
                        return next;
                      })
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "16px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <span
                        style={{
                          flex: "none",
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: "#fff",
                          background: "#22564b",
                          padding: "4px 12px",
                          borderRadius: 999,
                        }}
                      >
                        {INQUIRY_LABEL[inq.type]}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#123329",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {senderSummary(inq)}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "none" }}>
                      <span style={{ fontSize: 12, color: "#8aa89a", fontWeight: 700 }}>
                        {new Date(inq.createdAt).toLocaleString("ja-JP")}
                      </span>
                      <span style={{ fontSize: 12, color: "#8aa89a" }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 20px 18px", fontSize: 13.5, lineHeight: 1.9, borderTop: "1px solid #eceadb" }}>
                      <div style={{ paddingTop: 14 }}>
                        {Object.entries(inq.fields).map(([key, value]) => (
                          <div key={key}>
                            <b>{FIELD_LABEL[key] ?? key}：</b>
                            {value === "true" ? "はい" : value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "settings" && (
          <div>
            <div style={cardStyle}>
              <h2 style={{ font: "700 17px 'Shippori Mincho', serif", margin: "0 0 6px", color: "#1f4d40" }}>
                代表者写真
              </h2>
              <p style={{ fontSize: 12.5, color: "#5d6b5a", margin: "0 0 18px" }}>
                会社案内ページ「代表挨拶」の写真を差し替えます。
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.presidentPhoto || "/assets/president-photo.jpg"}
                  alt="代表者写真プレビュー"
                  style={{ width: "100%", maxWidth: 360, borderRadius: 14, objectFit: "cover" }}
                />
                <UploadButton label="写真を変更する" uploading={photoUploading} onSelect={handlePresidentPhotoUpload} />
                {photoError && <p style={{ color: "#dc4c3e", fontSize: 13, fontWeight: 700, margin: 0 }}>{photoError}</p>}
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ font: "700 17px 'Shippori Mincho', serif", margin: "0 0 6px", color: "#1f4d40" }}>
                お問い合わせ送信先の設定
              </h2>
              <p style={{ fontSize: 12.5, color: "#5d6b5a", margin: "0 0 18px" }}>
                Gmail連携が設定されていれば、ここで登録したアドレスにフォーム送信時のメール通知が届きます。
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                  ゴルフ場お問い合わせの送信先
                  <input
                    style={inputStyle}
                    value={settings.recipients.course}
                    onChange={(e) => setSettings({ ...settings, recipients: { ...settings.recipients, course: e.target.value } })}
                    placeholder="course@example.com"
                  />
                </label>
                <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                  イベント／プレーヤー様お問い合わせの送信先
                  <input
                    style={inputStyle}
                    value={settings.recipients.event}
                    onChange={(e) => setSettings({ ...settings, recipients: { ...settings.recipients, event: e.target.value } })}
                    placeholder="event@example.com"
                  />
                </label>
                <label style={{ fontSize: 12.5, fontWeight: 700 }}>
                  採用エントリーの送信先
                  <input
                    style={inputStyle}
                    value={settings.recipients.recruit}
                    onChange={(e) => setSettings({ ...settings, recipients: { ...settings.recipients, recruit: e.target.value } })}
                    placeholder="recruit@example.com"
                  />
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button style={btnPrimary} onClick={handleSettingsSave} disabled={settingsSaving}>
                    {settingsSaving ? "保存中…" : "保存する"}
                  </button>
                  {settingsSaved && <span style={{ fontSize: 12.5, color: "#22564b", fontWeight: 700 }}>保存しました</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
