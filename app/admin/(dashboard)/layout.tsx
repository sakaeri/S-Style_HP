import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (!isAuthorized(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }
  return <>{children}</>;
}
