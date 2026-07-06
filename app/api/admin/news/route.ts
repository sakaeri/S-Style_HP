import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";
import { createNews, getAllNews, isValidSlug, NEWS_CATEGORIES, type NewsPost } from "@/lib/news";

function unauthorized() {
  return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  return NextResponse.json(await getAllNews());
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();

  const data = await req.json();
  const { slug, title, category, date, eyecatch, body } = data;

  if (typeof slug !== "string" || !isValidSlug(slug)) {
    return NextResponse.json({ error: "スラッグは半角英数字とハイフンのみ使用できます" }, { status: 400 });
  }
  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "タイトルは必須です" }, { status: 400 });
  }
  if (!NEWS_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "カテゴリが不正です" }, { status: 400 });
  }
  if (typeof date !== "string" || !date.trim()) {
    return NextResponse.json({ error: "日付は必須です" }, { status: 400 });
  }
  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json({ error: "本文は必須です" }, { status: 400 });
  }

  const post: NewsPost = {
    slug,
    title: title.trim(),
    category,
    date: date.trim(),
    eyecatch: typeof eyecatch === "string" && eyecatch ? eyecatch : null,
    body,
    overview: null,
  };

  try {
    await createNews(post);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "作成に失敗しました" }, { status: 400 });
  }

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json(post, { status: 201 });
}
