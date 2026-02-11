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
