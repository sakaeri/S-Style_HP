import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";
import { getAllInquiries } from "@/lib/inquiries";

export async function GET(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }
  return NextResponse.json(await getAllInquiries());
}
