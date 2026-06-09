# ContentBay Backend — GraphQL API Server

The backend for **ContentBay** is a robust, type-safe GraphQL API built with Node.js, GraphQL Yoga, and Prisma ORM connecting to PostgreSQL. It exposes schema structures and resolver layers to manage workspaces, dynamic content models, user permissions, API tokens, and delivery endpoints.

---

## 🛠️ Technology Stack

- **Runtime & Language**: Node.js & TypeScript
- **GraphQL Engine**: [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) & `graphql-scalars`
- **Database Access (ORM)**: [Prisma Client](https://www.prisma.io/)
- **Database Engine**: PostgreSQL
- **Security & Authentication**: `jsonwebtoken` (JWT), `bcryptjs`, and Google OAuth verification
- **Transactional Emails**: `nodemailer`

---

## 📂 Backend Directory Structure

```text
apps/backend/
├── prisma/
│   ├── generated/          # Generated Prisma Client types
│   └── schema.prisma       # Database design and relations
├── src/
│   ├── context/            # GraphQL context building (auth headers)
│   ├── db/                 # DB connections and Prisma Client initialization
│   ├── graphql/            # GraphQL typeDefs and resolver modules
│   │   ├── resolvers/      # Resolvers for Workspace, Content, User, API Token, etc.
│   │   └── schema/         # GraphQL SDL schema definitions (.graphql)
│   ├── repositories/       # Data Access Layer (DAL) interfacing with Prisma
│   ├── services/           # Core business logic (invitations, mailers)
│   ├── schema.ts           # Schema aggregation helper
│   └── server.ts           # API entry point & GraphQL server setup
├── .env.example            # Environment variables template
├── prisma.config.ts        # Prisma v6 CLI configuration
├── tsconfig.json           # Compiler setup
└── eslint.config.mjs       # ESLint flat configuration
```

---

## 🏗️ Core Database Schema

Our database schema defined in `prisma/schema.prisma` models a multi-tenant CMS structure:

1. **User**: Credentials, OAuth providers, profile picture, and workspace relations.
2. **Workspace**: A namespace/tenant. Groups dynamic content models, contents, invitations, and API tokens.
3. **WorkspaceMember**: Maps users to workspaces with roles (e.g., Owner, Developer, Editor).
4. **WorkspaceInvitation**: Workspace invites sent to external users via email tokens.
5. **ContentModel**: Dynamic schema definitions representing content structures.
6. **ContentField**: Field properties (name, type, validations, settings, default value, appearance) belonging to a model.
7. **Content**: Raw JSON data storing content records.
8. **ApiToken**: Long-lived API keys hashed with salt prefixes to authenticate SDK client requests.

---

## ⚙️ Environment Variables Setup

Create `apps/backend/.env` based on `apps/backend/.env.example`:

```ini
# PostgreSQL Connection URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# JWT Secret for session authentication
JWT_SECRET="your-super-secret-key"

# Google Auth Credentials (for OAuth Login)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Transactional Mail Setup (for invitation emails)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
```

---

## 🚀 Getting Started

### 1. Install Dependencies & Build
Run the following from the backend directory:
```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations to database
npx prisma migrate dev

# Build the project
npm run build
```

### 2. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:4000`. You can visit this URL in your browser to interact with the GraphQL Playground.
