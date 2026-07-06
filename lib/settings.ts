import { readJson, writeJson } from "./store";

export interface SiteSettings {
  recipients: {
    course: string;
    event: string;
    recruit: string;
  };
}

const FILE = "settings.json";
const DEFAULT_SETTINGS: SiteSettings = {
  recipients: { course: "", event: "", recruit: "" },
};

export async function getSettings(): Promise<SiteSettings> {
  return readJson<SiteSettings>(FILE, DEFAULT_SETTINGS);
}

export async function updateSettings(updates: Partial<SiteSettings["recipients"]>): Promise<SiteSettings> {
  const current = await getSettings();
  const next: SiteSettings = { recipients: { ...current.recipients, ...updates } };
  await writeJson(FILE, next);
  return next;
}
