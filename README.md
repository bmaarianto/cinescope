# Cinescope

Aplikasi pencarian film yang memungkinkan pengguna menemukan film dengan mudah dan cepat.

## Fitur

- Pencarian film secara real-time
- Daftar film trending
- Tampilan kartu film dengan detail
- Antarmuka responsif
- Optimasi pencarian dengan debouncing

## Teknologi

- React 19.1.0
- React DOM 19.1.0
- Vite 6.3.5
- ESLint 9.25.0
- TMDB API
- Appwrite

## Instalasi

1. Clone repositori:

```
git clone https://github.com/bmaarianto/cinescope.git
```

2. Instal dependensi:

```
npm install
```

3. Buat file `.env`:

```
env
VITE_TMDB_API_KEY =
VITE_APPWRITE_PROJECT_ID = ""
VITE_APPWRITE_DATABASE_ID = ""
VITE_APPWRITE_COLLECTION_ID = ""
VITE_APPWRITE_ENDPOINT = ""
```

4. Jalankan aplikasi:

```
npm run dev
```

## Cara Penggunaan

- Buka aplikasi di browser
- Gunakan kotak pencarian untuk mencari film
- Lihat daftar film trending
- Klik kartu film untuk detail lebih lanjut

