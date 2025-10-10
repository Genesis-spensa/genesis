# Organisasi Kita — Situs Statis

Template situs organisasi modern, ringan, dan responsif.

Struktur:
- index.html
- css/styles.css
- js/main.js
- assets/favicon.svg
- assets/ (gambar)
- data/news.json (daftar berita)
- data/articles.json (konten artikel)

Menjalankan:
Buka file `index.html` di peramban Anda, atau jalankan server statis (contoh: `python -m http.server`).

Kustomisasi:
- Ubah teks/tautan di `index.html`
- Ubah warna di `:root` pada `css/styles.css`
- Tambah section baru dengan kelas `.section`

Tutorial: Menambah Berita & Artikel

1) Siapkan gambar
- Simpan gambar ke folder `assets/` (contoh: `assets/foto-event.jpg`).

2) Tambah ke daftar Berita (muncul di halaman berita)
- Edit file `data/news.json` dan tambahkan objek baru:
```
{
  "id": "7",
  "title": "Judul Berita",
  "date": "2025-10-12",
  "author": "Nama Penulis",
  "tags": ["OSIS", "Prestasi"],
  "summary": "Ringkasan singkat 1–2 kalimat.",
  "cover": "assets/foto-event.jpg"
}
```

3) Tambah konten artikel penuh (halaman artikel)
- Edit file `data/articles.json` dan tambahkan objek dengan `contentHtml`:
```
{
  "id": "7",
  "title": "Judul Berita",
  "date": "2025-10-12",
  "author": "Nama Penulis",
  "tags": ["OSIS", "Prestasi"],
  "summary": "Ringkasan singkat 1–2 kalimat.",
  "cover": "assets/foto-event.jpg",
  "contentHtml": "<p>Konten lengkap (boleh HTML sederhana).</p>"
}
```

4) Lihat hasil
- Buka `berita.html` untuk melihat daftar berita.
- Buka `artikel.html?id=7` untuk melihat artikel penuh.

Pencarian & Filter
- Halaman `berita.html` memiliki kolom pencarian dan filter tag.
- Pencarian bekerja pada judul, penulis, dan tag.

Tema & Bahasa
- Tombol Tema (light/dark) ada di header, preferensi tersimpan otomatis.
- Switcher bahasa ID/EN di header. Teks utama di `index.html` mendukung i18n.

RSS & Sitemap
- `rss.xml` untuk feed berita, `sitemap.xml` untuk SEO. Ganti URL `https://example.com` sesuai domain Anda.

Lisensi: MIT
