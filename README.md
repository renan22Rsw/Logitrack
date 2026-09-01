# LogiTrack

LogiTrack is a full-stack inventory and stock movement management system built to handle the day-to-day operations of a small-to-medium warehouse or store: tracking products, recording stock in/out movements, managing users with role-based permissions, and keeping a full audit trail of who did what.

**Live demo:** [https://logitrack.dpdns.org](https://logitrack.dpdns.org)

> Screenshots coming soon.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Project Status](#project-status)

---

## Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- TypeScript
- Tailwind CSS
- Radix UI / shadcn-style components
- Valibot (schema validation)

**Backend**
- [NestJS](https://nestjs.com/) on the Fastify adapter
- TypeScript
- [Prisma ORM](https://www.prisma.io/) (v7, driver adapters) with PostgreSQL
- JWT authentication with HTTP-only cookies
- [Resend](https://resend.com/) for transactional emails
- Jest for unit and e2e testing

**Infrastructure**
- **Frontend hosting:** Vercel
- **Backend hosting:** Render
- **Database:** Neon (serverless PostgreSQL)
- **DNS:** Cloudflare
- **Uptime monitoring:** UptimeRobot (keeps the free-tier backend instance warm via periodic health checks)

---

## Features

### Authentication & Authorization
- JWT-based authentication with refresh token rotation, stored in HTTP-only cookies for security.
- Role-based access control with three roles: `ADMIN`, `MANAGER`, and `OPERATOR`, each with different permission levels across the app.
- Forgot-password / reset-password flow via email (Resend).
- Forced password change flow (`mustChangePassword`) for newly created accounts.
- Soft-delete-aware auth: deleted accounts are blocked at login, password reset, and token refresh.

### Product Management
- Full CRUD for products (SKU, name, description, price, current stock).
- Soft delete instead of hard delete, preserving historical data integrity.

### Stock Movements
- Record stock **IN** and **OUT** movements per product, with quantity, reason, and reference fields.
- Consolidated, parameterized query endpoint for listing/filtering movements (by product, user, type, date range, etc.) instead of multiple ad-hoc endpoints.
- Movement history tied to both the product and the user who performed it.

### Audit Logging
- Every significant action (create, update, delete, login, logout, stock in/out) is recorded in an `AuditLog` table.
- Tracks the acting user, the entity affected, and a human-readable description — including actor-aware logging for admin-performed actions on behalf of other users.

### Account Management
- Self-service account deletion (soft delete) that also:
  - Clears authentication cookies.
  - Revokes all refresh tokens for that user.
  - Is safely callable by both the user themselves and an admin, through a single unified, actor-aware method.

### Reliability
- Dedicated `/health` endpoint for uptime monitoring, used by UptimeRobot to prevent the Render free-tier instance from spinning down after 15 minutes of inactivity.

---

## Architecture

```
logitrack/
├── frontend/          # Next.js application (App Router)
│   └── src/
│       └── app/
│           ├── (auth)/        # sign-in, sign-up (statically rendered)
│           └── (dashboard)/   # authenticated routes (dynamically rendered)
├── backend/           # NestJS application
│   └── src/
│       ├── health/    # health check controller
│       ├── auth/
│       ├── users/
│       ├── products/
│       ├── stock-movements/
│       └── audit-log/
```

The frontend and backend are deployed as two independent services (Vercel and Render respectively) that communicate over HTTPS, with CORS restricted to the production frontend origin.

---

## Getting Started

### Prerequisites
- Node.js (LTS)
- npm
- A PostgreSQL database (local instance, or a free [Neon](https://neon.tech/) project)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/logitrack.git
cd logitrack
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see [Environment Variables](#environment-variables)).

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the backend in watch mode:

```bash
npm run start:dev
```

The API will be available at `http://localhost:8000` (or whatever `PORT` you set), with a health check at `http://localhost:8000/health`.

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `frontend/` with the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (pooled, used at runtime via the Prisma driver adapter) |
| `DIRECT_URL` | PostgreSQL connection string (direct, used by the Prisma CLI for migrations) |
| `COOKIE_SECRET` | Secret used to sign cookies |
| `ORIGIN_URL` | Allowed CORS origin — the frontend's URL |
| `RESEND_API_KEY` | API key for sending transactional emails via Resend |
| `PORT` | Port the server listens on (defaults to `8000` locally; set automatically by Render in production) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |

---

## Running Tests

From the `backend/` directory:

```bash
npm run test        # unit tests
npm run test:e2e    # end-to-end tests
npm run test:cov    # test coverage report
```

---

## Deployment

- **Backend** is deployed on Render as a Web Service, building with `npm install && npx prisma generate && npx prisma migrate deploy && npm run build` and starting with `npm run start:prod`.
- **Frontend** is deployed on Vercel, auto-detected as a Next.js project.
- **DNS** for the custom domain (`logitrack.dpdns.org`) is managed through Cloudflare (in DNS-only mode, to avoid conflicts with Vercel's automatic SSL provisioning).
- **Uptime** is maintained via an [UptimeRobot](https://uptimerobot.com/) monitor pinging the backend's `/health` endpoint every 5 minutes, preventing Render's free-tier instance from spinning down.

---

## Project Status

LogiTrack is under active development as a portfolio project, built to demonstrate full-stack development practices: authentication and authorization, role-based access control, audit logging, soft deletes, automated testing, and a complete CI-free deployment pipeline across multiple free-tier services.
