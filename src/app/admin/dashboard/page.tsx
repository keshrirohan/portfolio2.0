import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import { Certificate } from "@/lib/models/Certificate";
import { Gallery } from "@/lib/models/Gallery";
import AdminDashboardClient from "./DashboardClient";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function DashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  await connectDB();

  const [totalCerts, totalGallery, recentCerts, recentGallery] = await Promise.all([
    Certificate.countDocuments(),
    Gallery.countDocuments(),
    Certificate.find().sort({ createdAt: -1 }).limit(4).lean(),
    Gallery.find().sort({ createdAt: -1 }).limit(4).lean(),
  ]);

  return (
    <AdminDashboardClient
      stats={{ totalCerts, totalGallery }}
      recentCerts={JSON.parse(JSON.stringify(recentCerts))}
      recentGallery={JSON.parse(JSON.stringify(recentGallery))}
    />
  );
}
