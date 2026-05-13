# ContentBay — Headless CMS for Modern Content Management

**ContentBay** adalah platform Headless CMS berbasis _API-first_ yang dirancang untuk membantu developer, startup, dan pelaku UMKM dalam mengelola konten secara terpusat tanpa perlu membangun backend dari nol. Dengan pendekatan _"Build your backend without coding"_, ContentBay memisahkan manajemen konten (backend) dari penyajian tampilan (frontend).

---

## 🎯 Tujuan Proyek

- **Backend Tanpa Coding:** Memungkinkan pengguna membangun infrastruktur backend fungsional melalui antarmuka visual.
- **Sentralisasi Konten:** Menjadi satu sumber data (_Single Source of Truth_) yang bisa digunakan di berbagai platform (Web, Mobile, App).
- **Efisiensi Biaya & Waktu:** Mempercepat peluncuran produk (MVP) dengan mengurangi ketergantungan pada backend developer.
- **Transformasi Digital:** Mendukung UMKM dan developer dalam mengadopsi arsitektur sistem modern.

## ⚠️ Masalah yang Diselesaikan (Issue)

- **Biaya Backend Tinggi:** Mengurangi beban finansial operasional pembuatan dan pemeliharaan backend manual.
- **Pengelolaan Konten Berulang:** Mengatasi risiko inkonsistensi data akibat pembaruan konten yang harus dilakukan manual di banyak platform.
- **Data Tidak Terstruktur:** Memberikan solusi bagi bisnis yang tumbuh agar datanya tetap terorganisir dan memiliki struktur yang jelas.

## ✨ Fitur Utama

- **Workspace Management:** Ruang kerja terpisah untuk memisahkan proyek dan data secara terstruktur.
- **Dynamic Content Model Builder:** Membuat struktur data kustom secara dinamis (Text, Number, RichText, Media) tanpa menyentuh database.
- **Content Management (CRUD):** Antarmuka intuitif untuk mengelola konten dengan fitur _Publish_ dan _Unpublish_.
- **Automatic API Delivery:** Endpoint REST dan GraphQL yang tersedia otomatis untuk setiap model data yang dibuat.
- **Role Management:** Sistem autentikasi (JWT/Session) dengan pembagian peran Admin dan Editor.

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** Node.js / Express
- **Database:** PostgreSQL (via Prisma ORM)
- **API:** GraphQL
- **Authentication:** JWT / Session

## 📂 Project Structure

Proyek ini menggunakan arsitektur **Monorepo** (dikelola dengan Turborepo & pnpm workspaces). Berikut adalah rincian struktur direktori utamanya:

```text
CONTENTBAY/
├── .github/                     # Konfigurasi otomatisasi GitHub Actions
├── .turbo/                      # Cache sistem Turborepo
├── apps/
│   ├── backend/                 # Aplikasi Backend (Node.js)
│   │   ├── prisma/              # Skema dan migrasi database Prisma
│   │   ├── src/                 # Kode sumber backend
│   │   │   ├── context/         # Logika context untuk request/auth
│   │   │   ├── db/              # Inisialisasi koneksi database
│   │   │   ├── graphql/         # Skema, resolver, dan setup GraphQL
│   │   │   ├── lib/             # Utility library atau fungsi pembantu internal
│   │   │   ├── repositories/    # Layer akses data (Data Access Layer)
│   │   │   ├── services/        # Logika bisnis utama aplikasi
│   │   │   ├── schema.ts        # Definisi skema data (TypeScript/GraphQL)
│   │   │   └── server.ts        # Entry point utama server backend
│   │   ├── .env                 # Variabel lingkungan lokal
│   │   ├── .env.example         # Template variabel lingkungan
│   │   ├── .gitignore           # File yang diabaikan Git di backend
│   │   ├── package.json         # Dependensi backend
│   │   ├── prisma.config.ts     # Konfigurasi tambahan Prisma
│   │   ├── README.md            # Dokumentasi modul backend
│   │   └── tsconfig.json        # Konfigurasi TypeScript backend
│   │
│   └── frontend/                # Aplikasi Frontend (Vite / React)
│       ├── public/              # Aset statis (favicon, logo)
│       ├── src/                 # Kode sumber UI (Feature-Sliced Design)
│       │   ├── app/             # Inisialisasi aplikasi (Providers, Styles)
│       │   ├── assets/          # Gambar, font, dan file aset lainnya
│       │   ├── entities/        # Logika bisnis tingkat entitas (User, Post)
│       │   ├── features/        # Interaksi user yang spesifik (AuthForm)
│       │   ├── graphql/         # Query dan mutasi GraphQL client
│       │   ├── pages/           # Komponen halaman utama aplikasi
│       │   ├── shared/          # Komponen reusable dan utilitas umum
│       │   ├── widgets/         # Komposisi fitur menjadi blok UI besar
│       │   └── main.tsx         # Entry point React ke DOM
│       ├── .env                 # Variabel lingkungan lokal frontend
│       ├── .env.example         # Template variabel lingkungan frontend
│       ├── .gitignore           # File yang diabaikan Git di frontend
│       ├── eslint.config.js     # Aturan linter kode
│       ├── index.html           # Template HTML dasar
│       ├── package.json         # Dependensi frontend
│       ├── README.md            # Dokumentasi modul frontend
│       ├── tsconfig.json        # Konfigurasi TS global frontend
│       └── vite.config.ts       # Konfigurasi build tool Vite
│
├── packages/
│   └── sdk/                     # SDK internal untuk komunikasi frontend-backend
│       ├── dist/                # Hasil build SDK yang siap digunakan
│       ├── node_modules/        # Library pihak ketiga khusus SDK
│       ├── src/                 # Kode sumber SDK
│       │   ├── core/            # Logika inti pemrosesan SDK
│       │   ├── models/          # Definisi tipe data dan interface TypeScript
│       │   ├── query/           # Fungsi fetching data (REST/GraphQL)
│       │   └── index.ts         # Entry point ekspor utama SDK
│       ├── package.json         # Dependensi dan script build SDK
│       └── tsup.config.ts       # Konfigurasi bundler Tsup untuk build SDK
│
├── .gitignore                   # Pengaturan Git global proyek
├── .prettierignore              # File yang diabaikan Prettier global
├── .prettierrc                  # Aturan format kode global
├── package.json                 # Konfigurasi root dan script workspace
├── pnpm-lock.yaml               # Kunci versi dependensi seluruh proyek
├── pnpm-workspace.yaml          # Definisi workspace pnpm
├── README.md                    # Dokumentasi utama ContentBay
└── turbo.json                   # Konfigurasi task runner Turborepo
```

# Project Setup Guide

## Requirements

Before starting, make sure you have installed:

### 1. Node.js (v18+ recommended)

Download from:

https://nodejs.org

Verify installation:

node -v npm -v

---

### 2. pnpm

If you haven't installed pnpm yet:

npm install -g pnpm

Verify:

pnpm -v

---

## Quick Start

Follow these steps to run the project locally.

---

### 1. Clone Repository

git clone https://github.com/DavinTanaya/ContentBay.git cd ContentBay

---

### 2. Install Dependencies (Root)

Install all workspace dependencies:

pnpm install

---

### 3. Backend Environment Setup

cd apps/backend cp .env.example .env

Edit `.env` and fill in your credentials.

---

### 4. Generate Prisma Client

Still in backend folder:

npx prisma generate npx prisma migrate dev

---

### 5. Frontend Environment Setup

cd ../frontend cp .env.example .env

Edit `.env` file.

---

### 6. Back to Root

cd ../..

---

### 7. Run All Apps

Start backend and frontend together:

pnpm dev

---

## 🌐 Application URLs

Backend (GraphQL API):

http://localhost:4000

Frontend:

http://localhost:5173

---

Happy Coding 💖

## 👨‍💻 Meet the Team

Proyek **ContentBay** ini dikembangkan oleh tim yang berdedikasi:

| Nama                      | GitHub                                       |
| :------------------------ | :------------------------------------------- |
| **Dean Febrio Denny-Xie** | [GitHub](https://github.com/DeanFebrio)      |
| **Davin Tanaya**          | [GitHub](https://github.com/DavinTanaya)     |
| **Richelle Marvela**      | [GitHub](https://github.com/cherrypellaa)    |
| **Hania Nayma Zahra**     | [GitHub](https://github.com/naymazahra)      |
| **Stevina Dwicahya Budi** | [GitHub](https://github.com/stevinadwicahya) |
