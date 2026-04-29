# ContentBay — Headless CMS for Modern Content Management

**ContentBay** adalah platform Headless CMS berbasis *API-first* yang dirancang untuk membantu developer, startup, dan pelaku UMKM dalam mengelola konten secara terpusat tanpa perlu membangun backend dari nol. Dengan pendekatan *"Build your backend without coding"*, ContentBay memisahkan manajemen konten (backend) dari penyajian tampilan (frontend).

---

## 🎯 Tujuan Proyek
- **Backend Tanpa Coding:** Memungkinkan pengguna membangun infrastruktur backend fungsional melalui antarmuka visual.
- **Sentralisasi Konten:** Menjadi satu sumber data (*Single Source of Truth*) yang bisa digunakan di berbagai platform (Web, Mobile, App).
- **Efisiensi Biaya & Waktu:** Mempercepat peluncuran produk (MVP) dengan mengurangi ketergantungan pada backend developer.
- **Transformasi Digital:** Mendukung UMKM dan developer dalam mengadopsi arsitektur sistem modern.

## ⚠️ Masalah yang Diselesaikan (Issue)
- **Biaya Backend Tinggi:** Mengurangi beban finansial operasional pembuatan dan pemeliharaan backend manual.
- **Pengelolaan Konten Berulang:** Mengatasi risiko inkonsistensi data akibat pembaruan konten yang harus dilakukan manual di banyak platform.
- **Data Tidak Terstruktur:** Memberikan solusi bagi bisnis yang tumbuh agar datanya tetap terorganisir dan memiliki struktur yang jelas.

## ✨ Fitur Utama
- **Workspace Management:** Ruang kerja terpisah untuk memisahkan proyek dan data secara terstruktur.
- **Dynamic Content Model Builder:** Membuat struktur data kustom secara dinamis (Text, Number, RichText, Media) tanpa menyentuh database.
- **Content Management (CRUD):** Antarmuka intuitif untuk mengelola konten dengan fitur *Publish* dan *Unpublish*.
- **Automatic API Delivery:** Endpoint REST dan GraphQL yang tersedia otomatis untuk setiap model data yang dibuat.
- **Role Management:** Sistem autentikasi (JWT/Session) dengan pembagian peran Admin dan Editor.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js / Express
- **Database:** PostgreSQL (via Prisma ORM)
- **API:** REST & GraphQL
- **Authentication:** JWT / Session

## 📂 Project Structure

Proyek ini menggunakan arsitektur **Monorepo** (dikelola dengan Turborepo & pnpm workspaces). Berikut adalah rincian struktur direktori utamanya:

```text
CONTENTBAY/
├── apps/                       # Direktori untuk aplikasi utama
│   │
│   ├── backend/                # Aplikasi Backend (Node.js/API)
│   │   ├── prisma/             # Skema database dan file migrasi Prisma
│   │   ├── src/                # Kode sumber utama (Controllers, Routes, Services)
│   │   ├── .env                # File variabel environment lokal
│   │   ├── package.json        # Dependensi khusus backend
│   │   ├── prisma.config.ts    # Konfigurasi tambahan Prisma
│   │   └── tsconfig.json       # Konfigurasi TypeScript backend
│   │
│   └── frontend/               # Aplikasi Frontend (Next.js / Vite)
│       ├── public/             # Aset statis publik (gambar, favicon, dll)
│       ├── src/                # Kode sumber UI (Components, Pages, Hooks)
│       ├── .env                # File variabel environment lokal
│       ├── index.html          # Entry point HTML aplikasi web
│       ├── package.json        # Dependensi khusus frontend
│       ├── vite.config.ts      # Konfigurasi *bundler* Vite
│       └── tsconfig.*.json     # Konfigurasi TypeScript untuk Vite & React
│
├── packages/                   # Direktori untuk kode yang dipakai bersama (Shared Code)
│   │
│   └── sdk/                    # Internal SDK untuk komunikasi Frontend & Backend
│       ├── src/
│       │   ├── core/           # Logika inti SDK
│       │   ├── models/         # Definisi tipe data & antarmuka (TS Interfaces)
│       │   ├── query/          # Fungsi untuk *fetching* data (REST/GraphQL)
│       │   └── index.ts        # Entry point ekspor SDK
│       ├── package.json        # Dependensi khusus SDK
│       └── tsup.config.ts      # Konfigurasi *bundler* (Tsup) untuk mem-build SDK
│
├── .gitignore                  # File yang diabaikan oleh Git
├── .prettierrc                 # Aturan format penulisan kode (Prettier)
├── .prettierignore             # File yang diabaikan oleh Prettier
├── package.json                # Dependensi dan script utama proyek (Root)
├── pnpm-lock.yaml              # Mengunci versi dependensi
├── pnpm-workspace.yaml         # Konfigurasi workspace pnpm (monorepo setup)
├── README.md                   # Dokumentasi proyek (file ini)
└── turbo.json                  # Konfigurasi task runner Turborepo
```

# Project Setup Guide

## Requirements

Before starting, make sure you have installed:

### 1. Node.js (v18+ recommended)

Download from:

https://nodejs.org

Verify installation:

node -v npm -v

------------------------------------------------------------------------

### 2. pnpm

If you haven't installed pnpm yet:

npm install -g pnpm

Verify:

pnpm -v

------------------------------------------------------------------------

## Quick Start

Follow these steps to run the project locally.

------------------------------------------------------------------------

### 1. Clone Repository

git clone https://github.com/DavinTanaya/ContentBay.git cd ContentBay

------------------------------------------------------------------------

### 2. Install Dependencies (Root)

Install all workspace dependencies:

pnpm install

------------------------------------------------------------------------

### 3. Backend Environment Setup

cd apps/backend cp .env.example .env

Edit `.env` and fill in your credentials.

------------------------------------------------------------------------

### 4. Generate Prisma Client

Still in backend folder:

npx prisma generate npx prisma migrate dev

------------------------------------------------------------------------

### 5. Frontend Environment Setup

cd ../frontend cp .env.example .env

Edit `.env` file.

------------------------------------------------------------------------

### 6. Back to Root

cd ../..

------------------------------------------------------------------------

### 7. Run All Apps

Start backend and frontend together:

pnpm dev

------------------------------------------------------------------------

## 🌐 Application URLs

Backend (GraphQL API):

http://localhost:4000

Frontend:

http://localhost:5173

------------------------------------------------------------------------

Happy Coding 💖


## 👨‍💻 Meet the Team

Proyek **ContentBay** ini dikembangkan oleh tim yang berdedikasi:

| Nama | GitHub |
| :--- | :--- |
| **Dean Febrio Denny-Xie** | [GitHub](https://github.com/DeanFebrio) |
| **Davin Tanaya** | [GitHub](https://github.com/DavinTanaya) |
| **Richelle Marvela** | [GitHub](https://github.com/cherrypellaa) |
| **Hania Nayma Zahra** | [GitHub](https://github.com/naymazahra) |
| **Stevina Dwicahya Budi** | [GitHub](https://github.com/stevinadwicahya) |