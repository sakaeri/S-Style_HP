import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/settings";

function unauthorized() {
  return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  return NextResponse.json(await getSettings());
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  const data = await req.json();
  const { course, event, recruit } = data;
  const isStr = (v: unknown) => typeof v === "string";
  if (!isStr(course) || !isStr(event) || !isStr(recruit)) {
    return NextResponse.json({ error: "入力値が不正です" }, { status: 400 });
  }
  const updated = await updateSettings({ course, event, recruit });
  return NextResponse.json(updated);
}
