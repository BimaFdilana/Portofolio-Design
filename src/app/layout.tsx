import type { Metadata } from "next";
import "./globals.css";
import AppwritePing from "../components/AppwritePing";

export const metadata: Metadata = {
  title: "Developer Portfolio | Modern & Minimalist",
  description: "A premium Apple-style developer portfolio built with Next.js, Tailwind CSS, and Appwrite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-indigo-500/30 selection:text-white">
        {/* AppwritePing: otomatis ping backend Appwrite saat app dibuka untuk verifikasi koneksi */}
        <AppwritePing />
        {children}
      </body>
    </html>
  );
}
