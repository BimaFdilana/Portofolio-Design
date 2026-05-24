import { databases } from "./appwrite";
import { ID, Query, AppwriteException } from "appwrite";
import type { PortfolioData } from "../types/portfolio";

const DB_ID  = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COL_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

// Section keys yang disimpan sebagai dokumen terpisah
type SectionKey = "hero" | "about" | "skills" | "projects" | "contact";
const SECTIONS: SectionKey[] = ["hero", "about", "skills", "projects", "contact"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Ambil satu dokumen berdasarkan section key. Return null jika belum ada. */
async function getDocument(section: SectionKey): Promise<{ $id: string; payload: string } | null> {
  try {
    const res = await databases.listDocuments(DB_ID, COL_ID, [
      Query.equal("section", section),
      Query.limit(1),
    ]);
    if (res.documents.length === 0) return null;
    return res.documents[0] as unknown as { $id: string; payload: string };
  } catch {
    return null;
  }
}

/** Simpan satu section — upsert (create jika belum ada, update jika sudah ada). */
async function upsertSection(section: SectionKey, data: unknown): Promise<void> {
  const payload = JSON.stringify(data);
  const existing = await getDocument(section);

  if (existing) {
    await databases.updateDocument(DB_ID, COL_ID, existing.$id, { section, payload });
  } else {
    await databases.createDocument(DB_ID, COL_ID, ID.unique(), { section, payload });
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Ambil semua data portfolio dari Appwrite.
 * Section yang belum ada di DB akan menggunakan fallback dari DEFAULT_DATA.
 */
export async function fetchPortfolioData(fallback: PortfolioData): Promise<PortfolioData> {
  const result: PortfolioData = { ...fallback };

  await Promise.all(
    SECTIONS.map(async (section) => {
      const doc = await getDocument(section);
      if (doc) {
        try {
          (result as unknown as Record<string, unknown>)[section] = JSON.parse(doc.payload);
        } catch {
          // payload corrupt — pakai fallback
        }
      }
    })
  );

  return result;
}

/**
 * Simpan semua section portfolio ke Appwrite sekaligus.
 * Setiap section disimpan sebagai dokumen terpisah dengan field `section` + `payload`.
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await Promise.all(
    SECTIONS.map((section) =>
      upsertSection(section, (data as unknown as Record<string, unknown>)[section])
    )
  );
}

/**
 * Simpan satu section saja (untuk partial save).
 */
export async function saveSection(section: SectionKey, data: unknown): Promise<void> {
  await upsertSection(section, data);
}

/** Terjemahkan AppwriteException ke pesan yang readable. */
export function dbErrorMessage(err: unknown): string {
  if (err instanceof AppwriteException) {
    // Log detail lengkap ke console untuk debugging
    console.error("[Appwrite DB Error]", {
      code: err.code,
      message: err.message,
      type: err.type,
      DB_ID,
      COL_ID,
    });

    if (err.code === 401) return "Tidak punya izin. Pastikan permissions collection sudah diset untuk role 'Users'.";
    if (err.code === 404) return `Database/Collection tidak ditemukan. DB_ID="${DB_ID}" COL_ID="${COL_ID}" — pastikan ID ini sesuai dengan Appwrite Console.`;
    return err.message || "Terjadi kesalahan database.";
  }
  console.error("[DB Error]", err);
  return "Terjadi kesalahan tidak terduga.";
}
