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
- `VITE_API_BASE_URL` (frontend): API base URL for admin UI

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

## Backend Deployment on Vercel

1. Import this repository into Vercel and set **Root Directory** to `backend`.
2. Keep default Vercel build behavior (serverless function from `backend/api/index.ts`).
3. Add environment variables in Vercel project settings:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `NODE_ENV=production`
4. Deploy. All routes are handled by the Express app through Vercel routing.
5. Your API base URL becomes:
   - `https://<your-backend-project>.vercel.app/api/v1`

## Frontend Deployment on Vercel (Same Repository)

Use the same Git repository and create a second Vercel project for frontend.

1. Import the same repository into Vercel again (new project).
2. Set **Root Directory** to `frontend`.
3. Set environment variable:
   - `VITE_API_BASE_URL=https://<your-backend-project>.vercel.app/api/v1`
4. Deploy.

## Monorepo Setup (Backend + Frontend)

- Project 1 (API):
  - Root Directory: `backend`
  - Runtime entry: `backend/api/index.ts`
- Project 2 (Admin UI):
  - Root Directory: `frontend`
  - Uses `VITE_API_BASE_URL` to call backend project

## Goal

Demonstrate enterprise backend engineering skills.

