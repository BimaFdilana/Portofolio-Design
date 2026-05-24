import { account } from "./appwrite";
import { AppwriteException } from "appwrite";

export interface AuthUser {
  $id: string;
  email: string;
  name: string;
}

/** Ambil sesi user yang sedang aktif. Return null jika belum login. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await account.get();
    return { $id: user.$id, email: user.email, name: user.name };
  } catch {
    return null;
  }
}

/** Login dengan email + password. */
export async function login(email: string, password: string): Promise<void> {
  await account.createEmailPasswordSession(email, password);
}

/** Logout — hapus sesi aktif. */
export async function logout(): Promise<void> {
  await account.deleteSession("current");
}

/** Cek apakah error dari Appwrite dan ambil pesannya. */
export function getAppwriteErrorMessage(err: unknown): string {
  if (err instanceof AppwriteException) {
    switch (err.code) {
      case 401:
        return "Email atau password salah.";
      case 429:
        return "Terlalu banyak percobaan. Coba lagi nanti.";
      case 503:
        return "Server tidak dapat dijangkau. Periksa koneksi internet.";
      default:
        return err.message || "Terjadi kesalahan. Coba lagi.";
    }
  }
  return "Terjadi kesalahan tidak terduga.";
}
