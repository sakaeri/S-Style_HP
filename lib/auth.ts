import { createHash } from "crypto";

export const ADMIN_COOKIE = "sstyle_admin_session";
const DEFAULT_PASSWORD = "sstyle2020";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function isUsingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

export function expectedSessionToken(): string {
  return createHash("sha256").update(adminPassword()).digest("hex");
}

export function checkPassword(input: string): boolean {
  return input === adminPassword();
}

export function isAuthorized(cookieValue: string | undefined): boolean {
  return !!cookieValue && cookieValue === expectedSessionToken();
}
