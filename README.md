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

## Vercel Deployment (Full Stack)

This repo is configured to deploy on a single Vercel project:
- Frontend (`frontend/dist`) is served as static output.
- Backend (`api/[...all].ts`) runs as a serverless function.
- Requests to `/api/*` are routed to the backend function.

### 1) Import Project

- Import this repository in Vercel.
- Keep the project root at repository root.

### 2) Build Settings

- Install command: `npm install`
- Build command: `npm run build --workspace frontend`
- Output directory: `frontend/dist`

### 3) Environment Variables (Vercel Project Settings)

Set these for Production (and Preview if needed):
- `NODE_ENV=production`
- `DATABASE_URL=<your-managed-postgres-connection-string>`
- `JWT_SECRET=<strong-random-secret>`
- `JWT_EXPIRES_IN=1h` (optional)
- `VITE_API_BASE_URL=/api/v1` (optional; default already uses `/api/v1` in production)

### 4) Database Setup

Run migrations and seed against your production database before first use:
- `npm run db:migrate --workspace backend`
- `npm run db:seed --workspace backend`

## Demo Login

- Email: `admin@meshcore.local`
- Password: `password123`
- Tenant ID: `00000000-0000-0000-0000-000000000001`

## Goal

Demonstrate enterprise backend engineering skills.

