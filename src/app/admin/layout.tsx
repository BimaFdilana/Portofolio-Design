import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard · Portfolio",
  description: "Kelola konten landing page portfolio",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
