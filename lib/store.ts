import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const CONTENT_DIR = path.join(process.cwd(), "content");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = REDIS_URL && REDIS_TOKEN ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN }) : null;

function keyFor(filename: string): string {
  return `sstyle:${filename}`;
}

async function ensureDir() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

async function readBundledSeed<T>(filename: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function readJson<T>(filename: string, fallback: T): Promise<T> {
  if (redis) {
    const value = await redis.get<T>(keyFor(filename));
    if (value !== null && value !== undefined) return value;

    // First read on a fresh KV store: seed it from the bundled starter
    // content shipped with the deployment, so existing news/settings
    // aren't lost the first time this runs against an empty database.
    const seed = await readBundledSeed<T>(filename);
    if (seed !== null) {
      await redis.set(keyFor(filename), seed);
      return seed;
    }
    return fallback;
  }
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(filename: string, data: T): Promise<void> {
  if (redis) {
    await redis.set(keyFor(filename), data);
    return;
  }
  await ensureDir();
  await fs.writeFile(path.join(CONTENT_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}
