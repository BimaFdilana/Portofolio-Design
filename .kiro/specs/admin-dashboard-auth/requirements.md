# Requirements Document

## Introduction

Fitur ini menambahkan sistem autentikasi dan manajemen konten berbasis Appwrite pada Admin Dashboard portfolio. Saat ini, halaman admin (`/admin`) tidak memiliki perlindungan akses dan menyimpan data ke `localStorage`. Fitur ini akan:

1. Menambahkan halaman login (`/admin/login`) dengan form email dan password menggunakan Appwrite Authentication.
2. Melindungi halaman `/admin` sehingga hanya dapat diakses oleh pengguna yang sudah login.
3. Memindahkan penyimpanan data portfolio dari `localStorage` ke Appwrite Database.
4. Menambahkan fungsi logout dari dashboard.
5. Menonaktifkan fitur registrasi (admin dibuat manual via Appwrite Console).
6. Mempertahankan design system yang sudah ada: glass morphism, gradient colorful, dark/light mode.

## Glossary

- **Admin**: Pengguna yang memiliki akses ke dashboard pengelolaan konten portfolio.
- **Appwrite**: Backend-as-a-Service yang digunakan untuk autentikasi dan penyimpanan data.
- **Appwrite_Auth**: Modul autentikasi Appwrite yang mengelola sesi pengguna berbasis cookie.
- **Appwrite_DB**: Modul database Appwrite yang menyimpan dokumen data portfolio.
- **Auth_Guard**: Komponen atau mekanisme yang memeriksa status sesi sebelum mengizinkan akses ke halaman terproteksi.
- **Dashboard**: Halaman admin di `/admin` untuk mengelola konten landing page portfolio.
- **Login_Page**: Halaman di `/admin/login` yang menampilkan form autentikasi.
- **Session**: Sesi login yang dikelola oleh Appwrite, disimpan sebagai cookie di browser.
- **Portfolio_Data**: Kumpulan data konten landing page yang terdiri dari Hero, About, Skills, Projects, dan Contact.
- **Glass_Card**: Komponen UI dengan efek glassmorphism sesuai design system yang sudah ada.

---

## Requirements

### Requirement 1: Halaman Login Admin

**User Story:** Sebagai admin, saya ingin dapat login ke dashboard melalui halaman login yang aman, sehingga hanya saya yang dapat mengakses dan mengelola konten portfolio.

#### Acceptance Criteria

1. THE Login_Page SHALL menampilkan form dengan field input email dan field input password.
2. THE Login_Page SHALL menampilkan tombol "Login" untuk mengirimkan form autentikasi.
3. THE Login_Page SHALL menampilkan tombol "Register" dalam kondisi dinonaktifkan (disabled) dengan tampilan visual yang berbeda (grayed out).
4. WHEN tombol "Register" yang dinonaktifkan dihover oleh pengguna, THE Login_Page SHALL menampilkan tooltip dengan teks "Registrasi saat ini dinonaktifkan".
5. WHEN admin mengisi email dan password yang valid lalu menekan tombol "Login", THE Appwrite_Auth SHALL membuat sesi baru dan menyimpannya sebagai cookie.
6. WHEN login berhasil, THE Login_Page SHALL mengarahkan admin ke halaman `/admin`.
7. IF email atau password yang dimasukkan tidak valid, THEN THE Login_Page SHALL menampilkan pesan kesalahan yang deskriptif tanpa mereset field password.
8. IF terjadi kesalahan koneksi ke Appwrite saat proses login, THEN THE Login_Page SHALL menampilkan pesan kesalahan jaringan kepada admin.
9. WHILE proses login sedang berlangsung, THE Login_Page SHALL menampilkan indikator loading pada tombol "Login" dan menonaktifkan semua input form.
10. THE Login_Page SHALL mengikuti design system yang ada: glass card, gradient colorful, dan mendukung dark/light mode.

---

### Requirement 2: Perlindungan Akses Dashboard (Auth Guard)

**User Story:** Sebagai admin, saya ingin dashboard admin hanya dapat diakses setelah login, sehingga konten portfolio tidak dapat diubah oleh pihak yang tidak berwenang.

#### Acceptance Criteria

1. WHEN pengguna yang belum memiliki sesi aktif mengakses halaman `/admin`, THE Auth_Guard SHALL mengarahkan pengguna tersebut ke halaman `/admin/login`.
2. WHEN pengguna yang sudah memiliki sesi aktif mengakses halaman `/admin/login`, THE Auth_Guard SHALL mengarahkan pengguna tersebut ke halaman `/admin`.
3. WHILE sesi admin sedang diverifikasi saat pertama kali memuat halaman `/admin`, THE Auth_Guard SHALL menampilkan indikator loading dan tidak menampilkan konten dashboard.
4. IF sesi yang tersimpan sudah kedaluwarsa atau tidak valid, THEN THE Auth_Guard SHALL menghapus sesi tersebut dan mengarahkan pengguna ke halaman `/admin/login`.
5. THE Auth_Guard SHALL memeriksa validitas sesi menggunakan Appwrite_Auth setiap kali halaman `/admin` dimuat.

---

### Requirement 3: Fungsi Logout

**User Story:** Sebagai admin, saya ingin dapat logout dari dashboard, sehingga sesi saya berakhir dengan aman dan orang lain tidak dapat mengakses dashboard dari perangkat yang sama.

#### Acceptance Criteria

1. THE Dashboard SHALL menampilkan tombol "Logout" yang dapat diakses dari header dashboard.
2. WHEN admin menekan tombol "Logout", THE Appwrite_Auth SHALL menghapus sesi aktif dari Appwrite.
3. WHEN proses logout berhasil, THE Dashboard SHALL mengarahkan admin ke halaman `/admin/login`.
4. WHILE proses logout sedang berlangsung, THE Dashboard SHALL menampilkan indikator loading pada tombol "Logout" dan menonaktifkan tombol tersebut.
5. IF terjadi kesalahan saat proses logout, THEN THE Dashboard SHALL menampilkan pesan kesalahan dan tetap berada di halaman `/admin`.

---

### Requirement 4: Pengambilan Data Portfolio dari Appwrite Database

**User Story:** Sebagai admin, saya ingin data portfolio dimuat dari Appwrite Database saat dashboard dibuka, sehingga perubahan yang tersimpan sebelumnya selalu ditampilkan dengan benar.

#### Acceptance Criteria

1. WHEN dashboard berhasil dimuat setelah autentikasi, THE Appwrite_DB SHALL mengambil dokumen data portfolio yang mencakup Hero, About, Skills, Projects, dan Contact.
2. WHILE data portfolio sedang diambil dari Appwrite_DB, THE Dashboard SHALL menampilkan indikator loading pada area konten.
3. IF dokumen data portfolio belum ada di Appwrite_DB, THEN THE Dashboard SHALL menggunakan data default bawaan sebagai nilai awal.
4. IF terjadi kesalahan saat mengambil data dari Appwrite_DB, THEN THE Dashboard SHALL menampilkan pesan kesalahan dan menawarkan opsi untuk mencoba ulang.
5. THE Dashboard SHALL menampilkan data yang berhasil diambil dari Appwrite_DB pada form editor yang sesuai (Hero, About, Skills, Projects, Contact).

---

### Requirement 5: Penyimpanan Data Portfolio ke Appwrite Database

**User Story:** Sebagai admin, saya ingin perubahan konten portfolio yang saya simpan tersimpan ke Appwrite Database, sehingga data persisten dan tidak hilang saat browser ditutup.

#### Acceptance Criteria

1. WHEN admin menekan tombol "Simpan" di dashboard, THE Appwrite_DB SHALL menyimpan seluruh data portfolio yang telah diubah ke dokumen yang sesuai.
2. WHILE proses penyimpanan ke Appwrite_DB sedang berlangsung, THE Dashboard SHALL menampilkan indikator loading pada tombol "Simpan" dan menonaktifkan tombol tersebut.
3. WHEN penyimpanan berhasil, THE Dashboard SHALL menampilkan notifikasi sukses selama minimal 2 detik.
4. IF terjadi kesalahan saat menyimpan ke Appwrite_DB, THEN THE Dashboard SHALL menampilkan pesan kesalahan yang deskriptif tanpa menghapus perubahan yang belum tersimpan.
5. THE Appwrite_DB SHALL menggunakan operasi `upsert` (buat jika belum ada, perbarui jika sudah ada) saat menyimpan data portfolio.

---

### Requirement 6: Pengelolaan Konten Hero

**User Story:** Sebagai admin, saya ingin dapat mengedit konten bagian Hero di landing page, sehingga informasi utama seperti nama, judul, dan tautan sosial selalu terkini.

#### Acceptance Criteria

1. THE Dashboard SHALL menampilkan form editor untuk bagian Hero yang berisi field: Nama, Judul Profesional, Subtitle/Headline, URL Resume, URL GitHub, dan URL LinkedIn.
2. WHEN admin mengubah nilai pada field Hero dan menekan tombol "Simpan", THE Appwrite_DB SHALL memperbarui dokumen Hero dengan nilai yang baru.
3. IF admin mengosongkan field Nama atau Judul Profesional, THEN THE Dashboard SHALL menampilkan pesan validasi dan mencegah penyimpanan.

---

### Requirement 7: Pengelolaan Konten About

**User Story:** Sebagai admin, saya ingin dapat mengedit konten bagian About di landing page, sehingga biografi dan foto profil selalu mencerminkan informasi terkini.

#### Acceptance Criteria

1. THE Dashboard SHALL menampilkan form editor untuk bagian About yang berisi field: Biografi dan URL Gambar Profil.
2. WHEN admin mengubah nilai pada field About dan menekan tombol "Simpan", THE Appwrite_DB SHALL memperbarui dokumen About dengan nilai yang baru.
3. IF admin mengosongkan field Biografi, THEN THE Dashboard SHALL menampilkan pesan validasi dan mencegah penyimpanan.

---

### Requirement 8: Pengelolaan Konten Skills

**User Story:** Sebagai admin, saya ingin dapat menambah, mengedit, dan menghapus skill di landing page, sehingga daftar kemampuan teknis selalu relevan.

#### Acceptance Criteria

1. THE Dashboard SHALL menampilkan daftar skill yang dapat diedit, masing-masing dengan field Nama Skill dan Kategori.
2. WHEN admin menekan tombol "Tambah Skill", THE Dashboard SHALL menambahkan baris skill baru dengan nilai kosong ke daftar.
3. WHEN admin menekan tombol hapus pada sebuah skill, THE Dashboard SHALL menghapus skill tersebut dari daftar secara langsung.
4. WHEN admin menekan tombol "Simpan" setelah mengubah daftar skill, THE Appwrite_DB SHALL memperbarui dokumen Skills dengan daftar terbaru.
5. IF admin menyimpan daftar skill dengan nama skill yang kosong, THEN THE Dashboard SHALL menampilkan pesan validasi dan mencegah penyimpanan.

---

### Requirement 9: Pengelolaan Konten Projects

**User Story:** Sebagai admin, saya ingin dapat menambah, mengedit, dan menghapus proyek di landing page, sehingga portofolio proyek selalu diperbarui.

#### Acceptance Criteria

1. THE Dashboard SHALL menampilkan daftar proyek yang dapat diedit, masing-masing dengan field: Judul, Deskripsi, Tags, URL Proyek, dan URL Gambar Cover.
2. WHEN admin menekan tombol "Tambah Proyek", THE Dashboard SHALL menambahkan entri proyek baru dengan nilai default ke daftar.
3. WHEN admin menekan tombol hapus pada sebuah proyek, THE Dashboard SHALL menghapus proyek tersebut dari daftar secara langsung.
4. WHEN admin menekan tombol "Simpan" setelah mengubah daftar proyek, THE Appwrite_DB SHALL memperbarui dokumen Projects dengan daftar terbaru.
5. IF admin menyimpan proyek dengan field Judul yang kosong, THEN THE Dashboard SHALL menampilkan pesan validasi dan mencegah penyimpanan.

---

### Requirement 10: Pengelolaan Konten Contact

**User Story:** Sebagai admin, saya ingin dapat mengedit informasi kontak di landing page, sehingga pengunjung selalu dapat menghubungi saya melalui informasi yang benar.

#### Acceptance Criteria

1. THE Dashboard SHALL menampilkan form editor untuk bagian Contact yang berisi field: Email Publik dan Lokasi.
2. WHEN admin mengubah nilai pada field Contact dan menekan tombol "Simpan", THE Appwrite_DB SHALL memperbarui dokumen Contact dengan nilai yang baru.
3. IF admin mengisi field Email dengan format yang tidak valid, THEN THE Dashboard SHALL menampilkan pesan validasi dan mencegah penyimpanan.

---

### Requirement 11: Konsistensi Design System

**User Story:** Sebagai admin, saya ingin tampilan halaman login dan dashboard mengikuti design system portfolio yang sudah ada, sehingga pengalaman visual terasa konsisten dan profesional.

#### Acceptance Criteria

1. THE Login_Page SHALL menggunakan komponen Glass_Card sebagai container form login.
2. THE Login_Page SHALL menerapkan gradient colorful sesuai dengan variabel CSS yang sudah ada (`--text-gradient`, `--hero-grad-*`).
3. THE Login_Page SHALL mendukung dark mode dan light mode menggunakan variabel CSS yang sudah ada.
4. THE Dashboard SHALL mempertahankan tampilan glass card, gradient colorful, dan dukungan dark/light mode yang sudah ada.
5. THE Login_Page SHALL menggunakan animasi yang konsisten dengan Framer Motion sesuai pola yang sudah digunakan di komponen lain.
