import { NextRequest, NextResponse } from "next/server";
import { addInquiry, type InquiryType } from "@/lib/inquiries";
import { getSettings } from "@/lib/settings";
import { sendMail } from "@/lib/mailer";

const VALID_TYPES: InquiryType[] = ["course", "event", "recruit"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS: Record<InquiryType, string[]> = {
  course: ["courseName", "contactName", "email", "topic"],
  event: ["requestType", "name", "email", "confirmed"],
  recruit: ["name", "email", "agree"],
};

const TYPE_LABEL: Record<InquiryType, string> = {
  course: "ゴルフ場お問い合わせ",
  event: "イベント／プレーヤー様お問い合わせ",
  recruit: "採用エントリー",
};

export async function POST(req: NextRequest) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が不正です" }, { status: 400 });
  }

  if (typeof data !== "object" || data === null) {
    return NextResponse.json({ error: "リクエストの形式が不正です" }, { status: 400 });
  }

  const { type, fields } = data as { type?: unknown; fields?: unknown };

  if (typeof type !== "string" || !VALID_TYPES.includes(type as InquiryType)) {
    return NextResponse.json({ error: "お問い合わせ種別が不正です" }, { status: 400 });
  }
  if (typeof fields !== "object" || fields === null) {
    return NextResponse.json({ error: "入力内容が不正です" }, { status: 400 });
  }

  const inquiryType = type as InquiryType;
  const record = fields as Record<string, unknown>;

  for (const key of REQUIRED_FIELDS[inquiryType]) {
    const value = record[key];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json({ error: "必須項目が入力されていません" }, { status: 400 });
    }
  }
  if (typeof record.email === "string" && !EMAIL_RE.test(record.email.trim())) {
    return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
  }

  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string") sanitized[key] = value.trim().slice(0, 4000);
  }

  const inquiry = await addInquiry(inquiryType, sanitized);

  const settings = await getSettings();
  const recipient = settings.recipients[inquiryType];
  if (recipient) {
    const summary = Object.entries(sanitized)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    try {
      // Awaited deliberately: on serverless, work left running after the
      // response is sent can be frozen before it completes.
      await sendMail({
        to: recipient,
        subject: `【S-Style】${TYPE_LABEL[inquiryType]}が届きました`,
        text: `サイトから新しいお問い合わせがありました。\n\n${summary}\n\n管理画面: /admin`,
      });
    } catch (err) {
      console.error("お問い合わせ通知メールの送信に失敗しました", err);
    }
  }

  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}
