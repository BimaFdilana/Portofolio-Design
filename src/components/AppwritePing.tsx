"use client";

import { useEffect } from "react";
import { account } from "../lib/appwrite";

/**
 * AppwritePing — dipanggil otomatis saat app dibuka.
 * Melakukan health check ke Appwrite backend untuk memverifikasi koneksi.
 * Menggunakan account.get() — jika Appwrite dapat dijangkau, request akan
 * berhasil (401 = server aktif tapi belum login, yang memang diharapkan).
 * Tidak merender apapun ke UI.
 */
export default function AppwritePing() {
  useEffect(() => {
    account.get().then(() => {
      console.log("[Appwrite] ✅ Koneksi ke backend aktif — sesi ditemukan.");
    }).catch((err: { code?: number; message?: string }) => {
      if (err?.code === 401) {
        // 401 = server aktif, hanya belum ada sesi — ini normal
        console.log("[Appwrite] ✅ Koneksi ke backend aktif (endpoint: https://nyc.cloud.appwrite.io/v1)");
      } else {
        console.warn("[Appwrite] ⚠️ Tidak dapat terhubung ke backend:", err?.message ?? err);
      }
    });
  }, []);

  return null;
}
