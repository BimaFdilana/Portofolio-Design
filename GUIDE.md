# Panduan Pengembangan (Developer Guide)

Selamat datang di repositori desain portofolio bergaya **Apple Developer Aesthetic**. Repositori ini telah dirapikan dan direstrukturisasi agar modular, bersih, dan mudah dikelola.

---

## 📂 Struktur Proyek (Directory Structure)

```text
src/
├── app/
│   ├── admin/
│   │   └── page.tsx        # Panel Admin (untuk memperbarui konten lokal)
│   ├── globals.css         # Desain sistem inti, warna HSL & CSS Variable
│   ├── layout.tsx          # Wrapper Layout aplikasi
│   └── page.tsx            # Main Landing Page (mengkoordinasi state & sub-komponen)
├── components/             # Sub-komponen modular hasil pemisahan
│   ├── About.tsx           # Bagian deskripsi diri & riwayat pendidikan/bahasa
│   ├── Contact.tsx         # Bagian "Send me coffe" (QR Code, Rekening BCA, & Medsos)
│   ├── Footer.tsx          # Bagian copyright & tautan footer
│   ├── Hero.tsx            # Hero section (Spotlight kursor, floating blobs, parallax)
│   ├── Navbar.tsx          # Navigasi melayang, scroll progress, & Theme Toggle
│   ├── Projects.tsx        # Grid daftar proyek dengan hover effect
│   └── Skills.tsx          # Grid kompetensi/kemampuan teknis
└── types/
    └── portfolio.ts        # Definisi antarmuka TypeScript (TypeScript Interfaces)
```

---

## ⚙️ Komponen & Tanggung Jawab

Setiap bagian visual didefinisikan secara modular untuk menghindari penumpukan kode pada berkas utama `page.tsx`.

1. **`Navbar`**:
   - Mengontrol visual progress bar berdasarkan scroll halaman.
   - Mengatur menu hamburger untuk tampilan seluler (*mobile navigation*).
   - Memanggil fungsi pengubah tema *Light/Dark Mode*.
2. **`Hero`**:
   - Menangani pelacakan kursor mouse (`mouseX`, `mouseY`) secara lokal demi performa animasi spotlight & grid reveal yang optimal menggunakan **Framer Motion** (`useMotionTemplate`).
   - Menyediakan animasi melayang (*floating blobs*) yang diatur melalui CSS Keyframes (`float-slow`, `float-medium`).
3. **`Projects`**:
   - Mengambil array proyek untuk ditampilkan dalam bentuk kartu bento glassmorphism dengan efek naik saat diarahkan kursor (*hover lift*).
4. **`Skills`**:
   - Menyajikan daftar kompetensi teknis berdasarkan klasifikasi kategori.
5. **`About`**:
   - Menampilkan biodata singkat, riwayat formal pendidikan, dan bahasa yang dikuasai secara minimalis.
6. **`Contact`**:
   - Berisi integrasi gambar QR code, nomor rekening BCA/E-Wallet, serta tombol pintas salin teks ke papan klip (*clipboard copy*).
   - Menyediakan tombol ikon media sosial dengan efek transisi warna premium.
7. **`Footer`**:
   - Bagian penutup halaman.

---

## 🎨 Sistem Pewarnaan (Theme System)

Desain ini mendukung **Dark Mode** & **Light Mode** secara mulus dengan memanipulasi CSS Variables pada berkas `globals.css`:

- **Warna Latar Belakang (Background)**:
  - *Light Mode*: Putih abu-abu khas Apple (`#f5f5f7`).
  - *Dark Mode*: Biru gelap solid (`#050814`).
- **Spotlight & Grid**:
  - Intensitas grid (`--grid-color`) dan sorotan kursor (`--spotlight-color`) telah disesuaikan agar tetap terlihat jelas namun tidak mengganggu pembacaan teks di kedua mode.

Penggantian mode menggunakan penambahan kelas `.dark` pada level dokumen HTML (`document.documentElement.classList`).

---

## 🛠️ Cara Kustomisasi Data Portofolio

### 1. Mengubah Data Statis Awal
Jika ingin mengubah konten default portofolio saat pertama kali dimuat (sebelum diedit lewat Admin Panel), silakan edit variabel `DEFAULT_DATA` di dalam berkas [src/app/page.tsx](file:///Users/smc/Desktop/portofolio/porto/src/app/page.tsx).

### 2. Mengubah QR Code Pembayaran
Letakkan berkas gambar QR Code baru Anda di direktori `public/` dengan nama `coffee_qr.png`. Komponen `Contact.tsx` akan otomatis memuat gambar tersebut secara langsung.

### 3. Mengubah Rekening & E-Wallet
Anda dapat mengubah nomor rekening BCA dan Dana/GoPay di dalam berkas [src/components/Contact.tsx](file:///Users/smc/Desktop/portofolio/porto/src/components/Contact.tsx) pada bagian kode penayangan kartu BCA/E-Wallet:
```tsx
onClick={() => onCopy("8720184920", "bca")} // Ganti nomor BCA
onClick={() => onCopy("081234567890", "e-wallet")} // Ganti nomor E-Wallet
```

---

## 🚀 Perintah Berguna

- **Menjalankan Server Lokal (Development)**:
  ```bash
  npm run dev
  ```
- **Melakukan Build Uji Coba**:
  ```bash
  npm run build
  ```
