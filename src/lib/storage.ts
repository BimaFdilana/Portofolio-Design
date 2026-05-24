import { storage } from "./appwrite";
import { ID, AppwriteException } from "appwrite";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
const ENDPOINT  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT   = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

/**
 * Upload file gambar ke Appwrite Storage.
 * Return URL publik file yang bisa langsung dipakai di <img src>.
 */
export async function uploadImage(file: File): Promise<string> {
  // Validasi tipe file
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowed.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.");
  }

  // Validasi ukuran (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
  }

  const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file);
  return getFilePreviewUrl(uploaded.$id);
}

/**
 * Hapus file dari Appwrite Storage berdasarkan file ID.
 * File ID diambil dari URL preview yang tersimpan.
 */
export async function deleteImage(fileId: string): Promise<void> {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
  } catch (err) {
    // Abaikan error 404 (file sudah tidak ada)
    if (err instanceof AppwriteException && err.code === 404) return;
    throw err;
  }
}

/**
 * Ambil file ID dari URL preview Appwrite.
 * Format URL: .../storage/buckets/{bucketId}/files/{fileId}/preview
 */
export function extractFileId(url: string): string | null {
  const match = url.match(/\/files\/([^/]+)\//);
  return match ? match[1] : null;
}

/**
 * Generate URL preview publik dari file ID.
 */
export function getFilePreviewUrl(fileId: string, width = 800): string {
  return `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/preview?project=${PROJECT}&width=${width}&output=webp`;
}

/** Terjemahkan error storage ke pesan readable. */
export function storageErrorMessage(err: unknown): string {
  if (err instanceof AppwriteException) {
    if (err.code === 401) return "Tidak punya izin upload. Pastikan permissions bucket sudah diset.";
    if (err.code === 404) return "Storage bucket tidak ditemukan. Cek BUCKET_ID di .env.local.";
    if (err.code === 413) return "File terlalu besar.";
    return err.message || "Gagal upload file.";
  }
  if (err instanceof Error) return err.message;
  return "Terjadi kesalahan tidak terduga.";
}
