# ContentBay Frontend — Modern Headless CMS Dashboard

The frontend for **ContentBay** is a sleek, responsive Single Page Application (SPA) dashboard built with React, Vite, TypeScript, Ant Design, and Tailwind CSS. It is structured using the **Feature-Sliced Design (FSD)** architectural methodology.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Bundler & Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Ant Design (v6) + Tailwind CSS (v4)
- **API Communication**: Apollo Client (for GraphQL queries/mutations) and `@react-oauth/google` (for Google authentication)
- **State & Routing**: `react-router-dom` (v7)

---

## 📂 Feature-Sliced Design (FSD) Structure

The application source code under `src/` is organized into FSD slices to promote modularity and scalability:

- **`app/`**: Global application configuration. Defines styling overrides, context providers (Auth, Apollo client), and routing mappings (`router.tsx`).
- **`pages/`**: High-level page views (e.g., Workspace list, Workspace details, Schema Modeler, Content Manager, Landing page).
- **`widgets/`**: Compound UI layouts assembled from multiple features (e.g., global Navbar, Sidebar, Fields tables, Workspace credentials widget).
- **`features/`**: Specific user actions that output side effects (e.g., Login/Register, Create Workspace, Field Builder configurations, Invite Member).
- **`entities/`**: Core business domain logic and structures (e.g., API Token queries, Content Model types, User data structures).
- **`shared/`**: Generic, context-agnostic modules (e.g., custom button/icon components, color themes, error handlers, route constants).

---

## ⚙️ Path Aliases

Vite and TypeScript are configured with the following path aliases:
- `@/*` -> `/src/*`
- `@components/*` -> `/src/shared/components/*`
- `@icons/*` -> `/src/shared/components/icons/*`
- `@assets/*` -> `/src/shared/assets/*`
- `@layout/*` -> `/src/app/layout/*`
- `@pages/*` -> `/src/pages/*`
- `@features/*` -> `/src/features/*`
- `@entities/*` -> `/src/entities/*`
- `@widgets/*` -> `/src/widgets/*`

---

## 🚀 Getting Started

### 1. Install Dependencies
Run the following from the root directory or frontend directory:
```bash
pnpm install
```

### 2. Environment Variables
Create `apps/frontend/.env` based on `apps/frontend/.env.example`:
```ini
# Core GraphQL Endpoint URL
VITE_GRAPHQL_API_URL="http://localhost:4000/graphql"

# Google Auth Client ID (matches Backend settings)
VITE_GOOGLE_CLIENT_ID="your-google-client-id"
```

### 3. Run Development Server
```bash
npm run dev
```
The application will boot locally on `http://localhost:5173`.

### 4. Build for Production
To compile and package the app for production:
```bash
npm run build
```
The static files will be generated in `apps/frontend/dist/`.
