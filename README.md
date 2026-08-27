# GhostStyle

Full-stack e-commerce platform for urban and freestyle clothing.

## Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Route Handlers
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT (HTTP-only cookies) + bcrypt

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL credentials and JWT secret.

4. Run migrations:

```bash
npm run db:migrate
```

5. Seed default roles:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Login, Register
│   ├── (store)/         # Home, Catalog, Product detail
│   ├── admin/           # Admin dashboard
│   └── api/             # API route handlers
├── components/          # Reusable UI components
├── lib/                 # Utilities, Prisma client, auth
├── services/            # Business logic
├── hooks/               # Custom React hooks
└── types/               # Shared TypeScript types
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed default roles (ADMIN, USER) |
| `npm run db:generate` | Regenerate Prisma client |

## Environment Variables

See `.env.example` for required variables.

## Development Phases

1. **Phase 1–2:** Project setup ✅
2. **Phase 3:** Database migrations
3. **Phase 4:** Authentication (register, login, relogin, logout)
4. **Phase 5:** Storefront UI (login, register, home, catalog, product detail)
5. **Phase 6:** Product & category APIs
6. **Phase 7:** Admin dashboard & CRUD
