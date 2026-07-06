import { readJson, writeJson } from "./store";

export interface SiteSettings {
  recipients: {
    course: string;
    event: string;
    recruit: string;
  };
  presidentPhoto: string | null;
}

const FILE = "settings.json";
const DEFAULT_SETTINGS: SiteSettings = {
  recipients: { course: "", event: "", recruit: "" },
  presidentPhoto: null,
};

export async function getSettings(): Promise<SiteSettings> {
  const settings = await readJson<SiteSettings>(FILE, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...settings };
}

export async function updateSettings(
  updates: Partial<SiteSettings["recipients"]>
): Promise<SiteSettings> {
  const current = await getSettings();
  const next: SiteSettings = { ...current, recipients: { ...current.recipients, ...updates } };
  await writeJson(FILE, next);
  return next;
}

export async function updatePresidentPhoto(url: string | null): Promise<SiteSettings> {
  const current = await getSettings();
  const next: SiteSettings = { ...current, presidentPhoto: url };
  await writeJson(FILE, next);
  return next;
}
