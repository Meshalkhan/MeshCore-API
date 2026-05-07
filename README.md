# MeshCore API

Scalable multi-tenant SaaS backend architecture.

## Features

- JWT authentication
- RBAC
- Multi-tenant APIs
- Secure architecture
- Docker support

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- JWT
- Docker
- React + Vite

## Prerequisites

- Node.js `>= 20` (LTS recommended)
- npm `>= 10`
- Docker + Docker Compose (for local PostgreSQL)
- Git

## Environment Variables

Create `backend/.env` from `backend/.env.example`.

### Required

- `JWT_SECRET`: strong secret used to sign JWTs

### Database (choose one approach)

- `DATABASE_URL`: preferred for cloud deployments
- OR local split vars:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`

### Optional

- `NODE_ENV`: defaults to `development`
- `PORT`: defaults to `4000`
- `JWT_EXPIRES_IN`: defaults to `1h`

## Local Deployment

1. `npm install`
2. Configure `backend/.env` from `backend/.env.example`
3. Start PostgreSQL:
  - `docker compose up -d postgres`
4. Create schema:
  - `npm run db:migrate --workspace backend`
5. Seed demo data:
  - `npm run db:seed --workspace backend`
6. Run backend and frontend (separate terminals):
  - `npm run dev`
  - `npm run dev:frontend`

## Demo Login

- Email: `admin@meshcore.local`
- Password: `password123`
- Tenant ID: `00000000-0000-0000-0000-000000000001`
  
## Goal

Demonstrate enterprise backend engineering skills.

