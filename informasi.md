# Panduan Deploy Website Portofolio Developer (Next.js + Appwrite)

Dokumen ini berisi informasi mengenai platform deployment, persiapan yang dibutuhkan, serta panduan langkah demi langkah cara men-deploy website portofolio Anda secara gratis, cepat, dan dengan performa tinggi.

---

## 🚀 Platform Rekomendasi
Untuk website Next.js, platform terbaik, tercepat, dan gratis adalah **Vercel**. 
Sedangkan untuk backend (database & auth) menggunakan **Appwrite Cloud (Free Tier)**. Kombinasi ini sangat ringan, memiliki loading speed di bawah 1 detik, dan tidak membutuhkan pengelolaan server (Serverless).

---

## 📋 Yang Perlu Disiapkan Sebelum Deploy
Sebelum melakukan deployment, pastikan Anda telah menyiapkan hal-hal berikut:

1. **Akun GitHub**: Untuk menyimpan repository kode project Anda.
2. **Akun Vercel**: Daftar gratis di [vercel.com](https://vercel.com) (bisa menggunakan akun GitHub).
3. **Akun Appwrite Cloud**: Daftar gratis di [cloud.appwrite.io](https://cloud.appwrite.io).
4. **Project Appwrite Cloud**:
   - Buat satu project baru (contoh: `my-portfolio`).
   - Buat API Database di menu database (nama: `portfolio_db`).
   - Buat 4 collections seperti yang dijelaskan di `issue.md`: `portfolio_data`, `skills`, `projects`, dan `messages`.
   - Di tab **Settings** project Appwrite Anda, dapatkan **Project ID** dan **Endpoint**.

---

## 🛠️ Langkah-Langkah Deploy

### Langkah 1: Push Kode ke GitHub
1. Pastikan project lokal Anda sudah diinisialisasi sebagai repository git.
2. Buat repository baru di akun GitHub Anda (bisa private atau public).
3. Push kode project Anda ke GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - Portfolio & Admin Panel"
   git remote add origin git@github.com:USERNAME/NAMA_REPO.git
   git branch -M main
   git push -u origin main
   ```

### Langkah 2: Hubungkan Project ke Vercel
1. Masuk ke dashboard Vercel Anda.
2. Klik tombol **"Add New"** lalu pilih **"Project"**.
3. Hubungkan akun GitHub Anda jika belum, lalu cari repository portofolio yang baru saja di-push. Klik **"Import"**.
4. Di bagian **Configure Project**, Anda akan melihat kolom **Environment Variables**. Masukkan variabel dari Appwrite Anda di sini:
   
   | Key | Value (Contoh) |
   | --- | --- |
   | `NEXT_PUBLIC_APPWRITE_ENDPOINT` | `https://cloud.appwrite.io/v1` |
   | `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | *ID Project Appwrite Anda* |
   | `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | `portfolio_db` |
   | `NEXT_PUBLIC_APPWRITE_COLL_PORTFOLIO` | `portfolio_data` |
   | `NEXT_PUBLIC_APPWRITE_COLL_SKILLS` | `skills` |
   | `NEXT_PUBLIC_APPWRITE_COLL_PROJECTS` | `projects` |
   | `NEXT_PUBLIC_APPWRITE_COLL_MESSAGES` | `messages` |

5. Klik tombol **"Deploy"**. Vercel akan otomatis melakukan proses build dan deploy website Anda dalam waktu kurang dari 2 menit.
6. Setelah selesai, Anda akan mendapatkan URL domain default dari Vercel (contoh: `portfolio-anda.vercel.app`).

### Langkah 3: Konfigurasi Domain Utama di Appwrite (CRITICAL)
Agar autentikasi dan database Appwrite dapat diakses dengan aman dari domain Vercel Anda, Anda harus menambahkan domain tersebut ke daftar whitelist Web App di Appwrite:
1. Buka dashboard Appwrite Cloud Anda.
2. Masuk ke project Anda, lalu klik menu **Overview** / **Settings**.
3. Di bagian bawah, cari opsi **Platforms** -> **Add Platform**.
4. Pilih **Web App**.
5. Masukkan **Hostname** dengan domain Vercel Anda (contoh: `portfolio-anda.vercel.app` atau domain kustom Anda). Klik **Save**.
6. Ini mencegah error CORS (Cross-Origin Resource Sharing) saat website mencoba mengakses data Appwrite.

---

## 💡 Tips Agar Performa Portofolio Tetap Ringan & Cepat (Apple-like Speed)
1. **Optimasi Gambar**: Jangan gunakan gambar berukuran sangat besar (misal 5MB+). Kompres gambar ke format **WebP** menggunakan alat online (seperti TinyPNG) sebelum menguploadnya sebagai URL di database projects/about.
2. **Next.js Image Component**: Gunakan modul `next/image` bawaan Next.js untuk merender gambar agar otomatis dioptimasi oleh server CDN Vercel.
3. **Framer Motion Bundle Size**: Hindari animasi berlebihan. Kombinasi transisi CSS standard dan Framer Motion secukupnya akan menjaga performa scrolling web tetap 60 FPS pada perangkat mobile maupun desktop.
4. **Pembersihan Metadata**: Hapus file boilerplate bawaan Next.js yang tidak terpakai agar ukuran bundle saat dideploy menjadi seminimal mungkin.
