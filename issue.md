# Rencana Implementasi: Integrasi Appwrite Database & Admin Panel Autentikasi

Dokumen ini berisi panduan teknis langkah demi langkah untuk junior programmer atau model AI murah dalam mengimplementasikan integrasi database Appwrite dan autentikasi admin pada website portofolio developer ini.

---

## 📌 Deskripsi Tugas & Target Akhir

Menghubungkan frontend portofolio yang sudah dibuat (Next.js, Tailwind CSS, Framer Motion) dengan **Appwrite Cloud** sebagai database dan backend autentikasi. Admin panel (`/admin`) harus diamankan menggunakan sistem login Appwrite, dan data halaman landing page harus diambil secara dinamis dari database.

### Target Warna & Estetika (Tetap Dipertahankan)
- Gaya desain: **Apple-like**, minimalis, elegan, interaktif, transisi halus (glassmorphic).
- Palet warna utama: **Hitam (#000000), Putih (#ffffff), dan Biru Tua / Deep Navy (#0a1128 / #050814)**.

---

## 🛠️ Langkah 1: Persiapan Appwrite Cloud (Database & Collections)

Junior programmer/AI harus menyiapkan akun Appwrite Cloud gratis dan membuat project baru. Di dalam project tersebut, buat Database bernama `portfolio_db` dengan collection berikut:

### 1. Collection: `portfolio_data` (Menampung konten utama)
- **Permissions**:
  - `Any` (Public) -> **Read**
  - `Admin Users` / User tertentu -> **Create, Read, Update, Delete**
- **Attributes**:
  - `key` (String, size 50, Required) -> Nilai indeks (contoh: `hero`, `about`, `contact`)
  - `content` (String, size 5000, Required) -> Menyimpan payload JSON stringified dari data bagian tersebut.

### 2. Collection: `skills` (Menampung daftar skill)
- **Permissions**: `Any` (Read), `Admin` (All)
- **Attributes**:
  - `name` (String, size 100, Required)
  - `category` (String, size 50, Required) -> Contoh: `Frontend`, `Backend`, `Languages`, `Other`

### 3. Collection: `projects` (Menampung daftar project)
- **Permissions**: `Any` (Read), `Admin` (All)
- **Attributes**:
  - `title` (String, size 150, Required)
  - `description` (String, size 1000, Required)
  - `tags` (String Array, Required)
  - `link` (String, size 500, Required)
  - `image` (String, size 500, Required)

### 4. Collection: `messages` (Menyimpan pesan dari form kontak)
- **Permissions**: `Any` (Create), `Admin` (Read, Delete)
- **Attributes**:
  - `name` (String, size 100, Required)
  - `email` (String, size 150, Required)
  - `message` (String, size 2000, Required)
  - `createdAt` (String, size 50, Required)

---

## ⚙️ Langkah 2: Konfigurasi Environment & SDK Client

1. Buat file `.env.local` di root project dengan variabel berikut:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=ID_PROJECT_ANDA
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=portfolio_db
   NEXT_PUBLIC_APPWRITE_COLL_PORTFOLIO=portfolio_data
   NEXT_PUBLIC_APPWRITE_COLL_SKILLS=skills
   NEXT_PUBLIC_APPWRITE_COLL_PROJECTS=projects
   NEXT_PUBLIC_APPWRITE_COLL_MESSAGES=messages
   ```

2. Buat file inisialisasi SDK Appwrite di `src/lib/appwrite.ts`:
   ```typescript
   import { Client, Account, Databases } from "appwrite";

   const client = new Client()
       .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

   export const account = new Account(client);
   export const databases = new Databases(client);
   export { client };
   ```

---

## 🔓 Langkah 3: Proteksi Admin Panel (Autentikasi Admin)

Halaman `/admin` saat ini tidak terlindungi dan menggunakan data `localStorage` lokal. Ikuti instruksi ini untuk menambahkan keamanan:

1. **Buat Halaman Login (`/admin/login/page.tsx`)**:
   - Buat formulir minimalis bertema gelap (Navy & Hitam) dengan input Email dan Password.
   - Panggil `account.createEmailPasswordSession(email, password)` dari Appwrite SDK saat disubmit.
   - Jika berhasil, redirect ke `/admin`.
   - Gunakan layout minimalis Apple-style dengan feedback pesan error jika login gagal.

2. **Proteksi Middleware / Halaman Admin (`/admin/page.tsx`)**:
   - Di dalam `useEffect` halaman admin, panggil `account.get()` untuk memeriksa sesi user aktif.
   - Jika tidak ada sesi (error 401), redirect ke `/admin/login`.
   - Sediakan tombol **Logout** di navbar admin yang memanggil `account.deleteSession('current')` kemudian redirect ke homepage.

---

## 🔄 Langkah 4: Integrasi Data Dinamis Halaman Utama (`/src/app/page.tsx`)

Ubah cara data dimuat pada halaman utama agar membaca langsung dari Appwrite Database:

1. **Load Data**:
   - Panggil `databases.listDocuments` pada mount komponen untuk collection `portfolio_data`, `skills`, dan `projects`.
   - Susun data hero, about, dan contact dari document yang berkey sama di `portfolio_data`.
   - Update state halaman dengan data yang berhasil didapatkan dari database.
   - *Tampilkan loader minimalis (skeleton blur/spinner smooth) saat data sedang dimuat.*

2. **Form Kontak**:
   - Pada form submit di section Contact, simpan pesan ke database menggunakan `databases.createDocument` ke collection `messages`.
   - Berikan notifikasi keberhasilan atau kegagalan yang halus dan transisi yang responsif menggunakan Framer Motion.

---

## ✍️ Langkah 5: Hubungkan Form Admin ke Database (`/src/app/admin/page.tsx`)

Ubah tombol "Save Updates" agar tidak menyimpan ke `localStorage` lagi, melainkan ke Appwrite Cloud Database:

1. **Update Data Hero / About / Contact**:
   - Cari document yang bersesuaian di collection `portfolio_data` berdasarkan `key`.
   - Lakukan `databases.updateDocument` dengan payload data terbaru (JSON stringified).
2. **Kelola Skills**:
   - Modifikasi tombol tambah, ubah, dan hapus agar memicu query Appwrite:
     - Tambah: `databases.createDocument`
     - Update: `databases.updateDocument`
     - Hapus: `databases.deleteDocument`
3. **Kelola Projects**:
   - Sama seperti skills, buat operasi CRUD yang langsung terhubung ke database `projects` di Appwrite.

---

## 📈 Langkah 6: Optimasi & Animasi

Pastikan visual website tetap premium setelah diintegrasikan:
- Gunakan transisi loading yang halus menggunakan komponen `framer-motion` (misal `<motion.div layout>`).
- Pastikan gambar project di-load dengan optimasi Next.js (`<img className="object-cover" />` atau `<Image />`).
- Indikator navigasi scroll di navbar harus tetap akurat saat section bertambah tinggi secara dinamis.
- Gunakan debounce atau loading indicator saat admin menekan tombol "Save Updates" agar user tidak melakukan double-click.

---

## 🧪 Rencana Verifikasi (Testing Plan)
1. **Uji Coba Autentikasi**: Buka `/admin` secara langsung. Sistem harus me-redirect ke `/admin/login`. Masukkan password salah, verifikasi muncul alert error. Masukkan detail yang benar, verifikasi redirect kembali ke `/admin`.
2. **Uji Coba Sinkronisasi**: Ubah nama di panel Admin, tekan "Save Updates". Buka tab baru halaman portofolio (`/`), verifikasi nama baru muncul seketika di bagian Hero.
3. **Uji Coba Kontak**: Tulis pesan di form kontak pada halaman utama. Cek dashboard Appwrite Cloud, pastikan data pesan tersimpan sempurna di collection `messages`.
