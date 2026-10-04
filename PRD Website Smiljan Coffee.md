# PRD — Website Smiljan Coffee

Versi 1.0 · 4 Oktober 2026 · Stack: Next.js

## 1. Ringkasan Produk

**Smiljan** adalah coffee shop dengan karakter *klasik yang berkelas*, bukan klasik ala kafe vintage murahan dengan tekstur kayu dan font tulisan tangan. Website Smiljan harus terasa seperti kafe yang dirancang oleh orang yang paham desain: hangat, penuh warna, modern, dan punya kepribadian sendiri.

Nama "Smiljan" diambil sebagai identitas yang unik dan mudah diingat. Kalau ingin ada cerita brand, nama ini bisa dikaitkan dengan desa kelahiran Nikola Tesla di Kroasia, sehingga narasinya "tempat lahirnya ide-ide besar". Bagian ini opsional dan perlu dikonfirmasi oleh pemilik brand.

**Tujuan utama website:**

- Membangun citra brand premium yang berbeda dari kafe lain.
- Menampilkan menu dengan visual yang menggugah selera.
- Mengarahkan pengunjung ke aksi nyata: datang ke lokasi, reservasi, atau pesan lewat WhatsApp.

## 2. Target Pengguna

| Segmen | Kebutuhan | Perilaku |
| --- | --- | --- |
| Anak muda & mahasiswa (18–27) | Tempat nongkrong dan kerja, estetik, harga jelas | Cek lewat HP, lihat foto dan menu sebelum datang |
| Pekerja kantoran (25–40) | Kopi berkualitas, lokasi dan jam buka jelas | Cari cepat, ingin pesan atau reservasi tanpa ribet |
| Pencinta kopi | Info biji, metode seduh, cerita di balik menu | Membaca detail, suka konten editorial |
| Komunitas / event organizer | Sewa tempat, acara privat | Butuh form kontak dan info kapasitas |

## 3. Tujuan & Metrik Keberhasilan

- Skor Lighthouse minimal 90 untuk Performance, Accessibility, dan SEO di mobile.
- Klik tombol "Pesan via WhatsApp" dan "Reservasi" menjadi konversi utama.
- Rata-rata waktu di halaman Menu lebih dari 1 menit.
- Bounce rate halaman Home di bawah 50%.
- Tampil di hasil pencarian lokal (Google Maps dan pencarian "coffee shop + nama area").

## 4. Arah Desain (Design Direction)

Konsep: **"Classic Modern, Colorful"**. Struktur dan tipografi terasa klasik dan elegan, tetapi warna, layout, dan gerakan terasa segar dan modern.

### 4.1 Prinsip Desain

- **Klasik tapi tidak jadul.** Serif elegan untuk judul, layout editorial seperti majalah.
- **Penuh warna tapi terkontrol.** Satu warna dominan per section, bukan semua warna sekaligus.
- **Anti-pasaran.** Hindari tema cokelat-krem polos, ikon cangkir generik, stock photo biji kopi di kayu, dan font script ala kafe.
- **Foto sebagai bintang.** Foto produk besar, tajam, dengan pencahayaan konsisten.
- **Bergerak halus.** Animasi terasa mahal, bukan ramai.

### 4.2 Palet Warna (usulan)

Palet dibangun dari warna kopi klasik, lalu diberi aksen berani supaya tidak membosankan.

| Peran | Nama | Hex | Penggunaan |
| --- | --- | --- | --- |
| Dasar gelap | Espresso | `#2A1810` | Footer, hero gelap, teks utama |
| Dasar terang | Krim Susu | `#F7EFE2` | Background utama |
| Aksen 1 | Merah Marun | `#8C2F39` | CTA, highlight, section menu |
| Aksen 2 | Kuning Saffron | `#E8A317` | Badge, hover, ilustrasi |
| Aksen 3 | Hijau Zaitun Tua | `#2F5D50` | Section cerita, label "signature" |
| Aksen 4 | Biru Teal Laut | `#1F6F8B` | Section minuman dingin, detail |
| Aksen 5 | Terakota | `#C9663D` | Section makanan, elemen hangat |

Aturan pakai: background halaman tetap Krim Susu atau Espresso. Warna aksen dipakai sebagai blok section penuh, kartu menu, dan tombol, sehingga halaman terasa berwarna tanpa kacau. Pastikan kontras teks memenuhi WCAG AA.

### 4.3 Tipografi (usulan)

- **Judul:** serif dengan karakter kuat, misalnya *Fraunces* atau *Instrument Serif* (hindari Playfair Display karena terlalu umum). Ukuran besar, kadang italic untuk penekanan.
- **Isi:** sans-serif bersih seperti *DM Sans* atau *Inter*.
- **Aksen kecil:** label uppercase dengan letter-spacing lebar untuk kategori dan metadata.
- Semua font dimuat lewat `next/font` agar cepat dan tanpa layout shift.

### 4.4 Gaya Visual

- Layout editorial: grid asimetris, teks besar yang overlap dengan foto.
- Bentuk organik (arch, lingkaran, blob) sebagai frame foto, bukan kotak biasa.
- Pola dekoratif geometris halus (terinspirasi ubin dan tekstil klasik) sebagai pemisah section.
- Marquee teks berjalan (contoh: "Slow Brewed · Freshly Roasted · Smiljan") sebagai pemisah antar section.
- Ilustrasi custom sederhana atau foto beraksen warna, bukan clipart.

### 4.5 Motion

- Reveal on scroll yang halus (fade dan slide kecil).
- Hover pada kartu menu: foto zoom pelan dan warna latar berubah sesuai kategori.
- Transisi antar halaman yang lembut.
- Hormati `prefers-reduced-motion`.

## 5. Struktur Halaman & Fitur

### 5.1 Peta Situs

- `/` Home
- `/menu` Menu
- `/cerita` Tentang / Cerita Smiljan
- `/lokasi` Lokasi & Jam Buka
- `/galeri` Galeri
- `/reservasi` Reservasi & Acara
- `/kontak` Kontak

### 5.2 Home

1. **Hero:** headline besar bergaya editorial, foto utama dalam frame arch, tombol "Lihat Menu" dan "Pesan via WhatsApp".
2. **Marquee** tagline brand.
3. **Menu Signature:** 3–4 kartu minuman unggulan, masing-masing dengan warna aksen berbeda.
4. **Cerita singkat:** blok berwarna hijau zaitun dengan foto dan satu paragraf narasi brand.
5. **Kenapa Smiljan:** 3 poin keunggulan (biji pilihan, seduh manual, ruang nyaman) dengan ikon custom.
6. **Galeri cuplikan:** grid foto asimetris.
7. **Testimoni:** kutipan pelanggan dalam layout editorial.
8. **Lokasi & jam buka:** peta ringkas dan tombol arah.
9. **Footer:** gelap Espresso, navigasi, sosial media, newsletter opsional.

### 5.3 Menu

- Kategori: Kopi Panas, Kopi Dingin, Non-Kopi, Makanan, Pastry/Dessert.
- Tab atau filter kategori dengan animasi transisi.
- Kartu menu: foto, nama, deskripsi singkat, harga, badge (Signature, Baru, Vegan, dll).
- Setiap kategori punya warna aksen sendiri.
- Halaman detail menu (modal atau halaman) berisi deskripsi, catatan rasa, dan ukuran.
- Data menu awal berupa placeholder. Daftar menu dan harga asli diisi oleh pemilik.

### 5.4 Cerita (About)

- Narasi asal-usul nama dan filosofi Smiljan.
- Section proses: dari biji, sangrai, seduh, sampai ke cangkir.
- Profil tim atau barista.
- Nilai-nilai brand.

### 5.5 Lokasi & Jam Buka

- Alamat, peta (embed Google Maps), tombol "Petunjuk Arah".
- Jam operasional dengan indikator status "Buka sekarang / Tutup" secara otomatis.
- Info fasilitas: Wi-Fi, colokan, parkir, area merokok, dll.

### 5.6 Galeri

- Grid masonry dengan lightbox.
- Kategori: Interior, Minuman, Makanan, Event.
- Lazy loading dan gambar dioptimasi dengan `next/image`.

### 5.7 Reservasi & Acara

- Form: nama, nomor WhatsApp, tanggal, jam, jumlah orang, catatan.
- Setelah submit, pengguna diarahkan ke WhatsApp dengan pesan terisi otomatis (tahap awal), atau tersimpan ke database (tahap lanjut).
- Bagian khusus untuk sewa tempat dan acara privat.

### 5.8 Kontak

- Form kontak, email, nomor WhatsApp, Instagram, dan jam respon.

### 5.9 Elemen Global

- Navbar sticky yang berubah gaya saat scroll.
- Tombol WhatsApp mengambang.
- Dark mode opsional (mengikuti tema Espresso).
- Cookie/analytics notice sesuai kebutuhan.

## 6. Kebutuhan Fungsional

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-01 | Menampilkan menu dengan filter kategori | Must |
| F-02 | Tombol pesan via WhatsApp dengan pesan otomatis | Must |
| F-03 | Form reservasi dengan validasi | Must |
| F-04 | Indikator buka/tutup berdasarkan jam operasional | Should |
| F-05 | Galeri dengan lightbox | Should |
| F-06 | Embed peta dan tombol petunjuk arah | Must |
| F-07 | Form kontak | Should |
| F-08 | Newsletter signup | Could |
| F-09 | Keranjang dan pemesanan online penuh | Won't (fase 1) |
| F-10 | Panel admin untuk edit menu | Could (fase 2) |

## 7. Kebutuhan Non-Fungsional

- **Performa:** LCP di bawah 2,5 detik pada jaringan 4G. Gambar memakai `next/image` dengan format WebP/AVIF.
- **Responsif:** mobile-first, diuji di layar 360px sampai 1920px.
- **Aksesibilitas:** kontras warna AA, navigasi keyboard, alt text pada semua gambar, label form yang benar.
- **SEO:** metadata per halaman, Open Graph, sitemap, robots, structured data `CafeOrCoffeeShop` (JSON-LD).
- **Keamanan:** validasi input di server, proteksi spam pada form (honeypot atau reCAPTCHA), HTTPS.
- **Kompatibilitas:** dua versi terbaru Chrome, Safari, Firefox, dan Edge.

## 8. Spesifikasi Teknis

### 8.1 Stack

- **Framework:** Next.js (App Router) dengan TypeScript.
- **Styling:** Tailwind CSS dengan design token warna dan font dari bagian 4.
- **Animasi:** Framer Motion (atau GSAP untuk efek scroll yang kompleks).
- **Ikon:** Lucide atau ikon custom SVG.
- **Konten menu:** tahap awal berupa file JSON/TypeScript lokal. Tahap lanjut memakai CMS (Sanity, Strapi, atau Supabase).
- **Form:** Route Handler / Server Action Next.js, kirim ke WhatsApp atau email (Resend).
- **Deployment:** Vercel.
- **Analytics:** Vercel Analytics atau Google Analytics.

### 8.2 Struktur Folder (usulan)

```
smiljan/
├── app/
│   ├── layout.tsx
│   ├── page.tsx            # Home
│   ├── menu/page.tsx
│   ├── cerita/page.tsx
│   ├── lokasi/page.tsx
│   ├── galeri/page.tsx
│   ├── reservasi/page.tsx
│   └── kontak/page.tsx
├── components/
│   ├── ui/                 # Button, Badge, Card, Marquee
│   ├── sections/           # Hero, SignatureMenu, Story, dst.
│   └── layout/             # Navbar, Footer, WhatsAppFloat
├── data/
│   └── menu.ts
├── lib/
├── public/
│   └── images/
└── tailwind.config.ts
```

### 8.3 Model Data Menu

```ts
type MenuItem = {
  id: string;
  name: string;
  category: "kopi-panas" | "kopi-dingin" | "non-kopi" | "makanan" | "pastry";
  description: string;
  price: number;
  image: string;
  badges?: ("signature" | "baru" | "vegan")[];
  available: boolean;
};
```

## 9. Konten yang Dibutuhkan dari Pemilik

- Logo Smiljan dan panduan brand (jika sudah ada).
- Daftar menu lengkap beserta harga dan deskripsi.
- Foto produk dan interior (atau jadwal sesi foto).
- Alamat, koordinat, jam buka, nomor WhatsApp, akun sosial media.
- Cerita brand dan profil tim.
- Keputusan apakah narasi nama "Smiljan" dikaitkan dengan Tesla atau cerita lain.

## 10. Rencana Pengerjaan

| Fase | Cakupan | Estimasi |
| --- | --- | --- |
| 1. Discovery & desain | Moodboard, palet final, wireframe, desain Home dan Menu | 1 minggu |
| 2. Setup & komponen | Setup Next.js, design token, komponen UI dasar | 3–4 hari |
| 3. Halaman utama | Home, Menu, Cerita, Lokasi | 1–1,5 minggu |
| 4. Halaman pendukung | Galeri, Reservasi, Kontak, integrasi WhatsApp | 1 minggu |
| 5. Polesan & QA | Animasi, SEO, aksesibilitas, optimasi performa, testing | 4–5 hari |
| 6. Peluncuran | Deploy, domain, analytics | 1–2 hari |

Estimasi total sekitar 4–5 minggu untuk satu developer frontend. Angka ini perkiraan dan bergantung pada kesiapan konten.

## 11. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Foto produk belum tersedia atau kualitasnya rendah | Website terlihat murahan | Jadwalkan sesi foto lebih awal, sementara pakai placeholder yang konsisten |
| Terlalu banyak warna sehingga terlihat ramai | Kesan norak | Terapkan aturan satu warna dominan per section dan token warna yang ketat |
| Animasi berat memperlambat halaman | Skor performa turun | Batasi animasi, lazy load, uji di perangkat mid-range |
| Menu sering berubah | Update repot | Siapkan struktur data yang mudah diedit, pertimbangkan CMS di fase 2 |

## 12. Di Luar Cakupan (Fase 1)

- Pemesanan dan pembayaran online penuh.
- Sistem loyalty/member.
- Aplikasi mobile.
- Panel admin (direncanakan fase 2).

## 13. Pertanyaan Terbuka

- Lokasi kafe: satu cabang atau lebih?
- Apakah perlu versi bahasa Inggris selain Bahasa Indonesia?
- Apakah palet warna di bagian 4.2 sudah cocok, atau ada warna brand yang wajib dipakai?
- Apakah reservasi cukup lewat WhatsApp atau perlu tersimpan di database?
- Apakah ada domain yang sudah disiapkan?
