import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";
import { getBases, saveBases, type Base } from "@/lib/bases";

function unauthorized() {
  return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
}

function isValidBases(data: unknown): data is Base[] {
  if (!Array.isArray(data)) return false;
  return data.every(
    (b) =>
      b &&
      typeof b.name === "string" &&
      b.name.trim() &&
      typeof b.displayName === "string" &&
      b.displayName.trim() &&
      (b.role === "本拠点" || b.role === "支店") &&
      Array.isArray(b.courses) &&
      b.courses.every(
        (c: unknown) =>
          c !== null &&
          typeof c === "object" &&
          typeof (c as { name?: unknown }).name === "string" &&
          typeof (c as { area?: unknown }).area === "string"
      )
  );
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  return NextResponse.json(await getBases());
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  const data = await req.json();
  if (!isValidBases(data)) {
    return NextResponse.json({ error: "拠点データの形式が不正です" }, { status: 400 });
  }
  await saveBases(data);
  revalidatePath("/about");
  revalidatePath("/recruit");
  return NextResponse.json(data);
}
