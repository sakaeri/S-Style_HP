import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";
import { deleteNews, NEWS_CATEGORIES, updateNews } from "@/lib/news";

function unauthorized() {
  return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  const { slug } = await params;
  const data = await req.json();
  const { title, category, date, eyecatch, body } = data;

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

  try {
    const updated = await updateNews(slug, {
      title: title.trim(),
      category,
      date: date.trim(),
      eyecatch: typeof eyecatch === "string" && eyecatch ? eyecatch : null,
      body,
    });
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "更新に失敗しました" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthorized(req.cookies.get(ADMIN_COOKIE)?.value)) return unauthorized();
  const { slug } = await params;
  await deleteNews(slug);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ ok: true });
}
