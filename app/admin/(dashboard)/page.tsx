import type { Metadata } from "next";
import { getAllNews } from "@/lib/news";
import { getAllInquiries } from "@/lib/inquiries";
import { getSettings } from "@/lib/settings";
import { getBases } from "@/lib/bases";
import { isUsingDefaultPassword } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "管理ダッシュボード ｜ 株式会社S-Style",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [news, inquiries, settings, bases] = await Promise.all([
    getAllNews(),
    getAllInquiries(),
    getSettings(),
    getBases(),
  ]);

  return (
    <AdminDashboard
      initialNews={news}
      initialInquiries={inquiries}
      initialSettings={settings}
      initialBases={bases}
      usingDefaultPassword={isUsingDefaultPassword()}
    />
  );
}
