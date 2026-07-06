import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024;
const ALLOWED_FOLDERS = ["news", "president"];

export async function POST(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folderInput = formData.get("folder");
  const folder = typeof folderInput === "string" && ALLOWED_FOLDERS.includes(folderInput) ? folderInput : "news";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "対応していない画像形式です（jpg/png/webp/gif）" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "ファイルサイズが大きすぎます（8MBまで）" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".jpg";
  const safeExt = /^\.[a-zA-Z0-9]+$/.test(ext) ? ext : ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${folder}/${filename}`, file, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return NextResponse.json({ url: `/uploads/${folder}/${filename}` });
}
