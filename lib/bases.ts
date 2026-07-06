import { readJson, writeJson } from "./store";

export interface Course {
  name: string;
  area: string;
}

export interface Base {
  name: string;
  displayName: string;
  role: "本拠点" | "支店";
  courses: Course[];
}

const FILE = "bases.json";

export async function getBases(): Promise<Base[]> {
  return readJson<Base[]>(FILE, []);
}

export async function saveBases(bases: Base[]): Promise<void> {
  await writeJson(FILE, bases);
}
