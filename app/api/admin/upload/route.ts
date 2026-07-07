import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 1.5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `対応していない画像形式です（jpg/png/webp/gif のみ。検出された形式: ${file.type || "不明"}）` },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "ファイルサイズが大きすぎます（1.5MBまで）" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    return NextResponse.json({ url: dataUrl });
  } catch (err) {
    console.error("アップロード処理でエラーが発生しました", err);
    const message = err instanceof Error ? err.message : "不明なエラー";
    return NextResponse.json({ error: `アップロードに失敗しました（${message}）` }, { status: 500 });
  }
}
