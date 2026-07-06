import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, expectedSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "パスワードが違います" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
