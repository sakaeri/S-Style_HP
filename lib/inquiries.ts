import { readJson, writeJson } from "./store";

export type InquiryType = "course" | "event" | "recruit";

export interface Inquiry {
  id: string;
  type: InquiryType;
  createdAt: string;
  fields: Record<string, string>;
}

const FILE = "inquiries.json";

export async function getAllInquiries(): Promise<Inquiry[]> {
  const list = await readJson<Inquiry[]>(FILE, []);
  return [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addInquiry(type: InquiryType, fields: Record<string, string>): Promise<Inquiry> {
  const list = await readJson<Inquiry[]>(FILE, []);
  const inquiry: Inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    createdAt: new Date().toISOString(),
    fields,
  };
  list.push(inquiry);
  await writeJson(FILE, list);
  return inquiry;
}
