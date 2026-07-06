import { promises as fs } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function ensureDir() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

export async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  await fs.writeFile(path.join(CONTENT_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}
