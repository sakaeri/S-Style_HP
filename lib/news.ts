import { readJson, writeJson } from "./store";

export type NewsCategory = "お知らせ" | "契約情報" | "サービス" | "グッズ" | "イベント";

export interface OverviewRow {
  label: string;
  value: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  eyecatch: string | null;
  body: string[];
  overview: OverviewRow[] | null;
}

export const NEWS_CATEGORIES: NewsCategory[] = ["お知らせ", "契約情報", "サービス", "グッズ", "イベント"];

export const categoryStyle: Record<NewsCategory, { gradient: string; color: string }> = {
  契約情報: { gradient: "linear-gradient(135deg,#3a8f7c,#1e8ca0)", color: "#fff" },
  サービス: { gradient: "linear-gradient(135deg,#7a4f9f,#3a5f9f)", color: "#fff" },
  グッズ: { gradient: "linear-gradient(135deg,#c9a86e,#b24f7a)", color: "#fff" },
  イベント: { gradient: "linear-gradient(135deg,#c9a86e,#b28a52)", color: "#463216" },
  お知らせ: { gradient: "linear-gradient(135deg,#3a8f7c,#1e8ca0)", color: "#fff" },
};

const FILE = "news.json";

function sortByDateDesc(posts: NewsPost[]): NewsPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getAllNews(): Promise<NewsPost[]> {
  const posts = await readJson<NewsPost[]>(FILE, []);
  return sortByDateDesc(posts);
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const posts = await readJson<NewsPost[]>(FILE, []);
  return posts.find((p) => p.slug === slug) ?? null;
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

export async function createNews(post: NewsPost): Promise<void> {
  const posts = await readJson<NewsPost[]>(FILE, []);
  if (posts.some((p) => p.slug === post.slug)) {
    throw new Error("同じスラッグのお知らせが既に存在します");
  }
  posts.push(post);
  await writeJson(FILE, posts);
}

export async function updateNews(slug: string, updates: Partial<NewsPost>): Promise<NewsPost> {
  const posts = await readJson<NewsPost[]>(FILE, []);
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) throw new Error("お知らせが見つかりません");
  posts[idx] = { ...posts[idx], ...updates, slug: posts[idx].slug };
  await writeJson(FILE, posts);
  return posts[idx];
}

export async function deleteNews(slug: string): Promise<void> {
  const posts = await readJson<NewsPost[]>(FILE, []);
  await writeJson(
    FILE,
    posts.filter((p) => p.slug !== slug)
  );
}
