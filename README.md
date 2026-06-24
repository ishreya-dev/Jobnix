# Jobnix - Job Application Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18)](https://vitest.dev/)

A production-ready job application tracker built with Next.js 16, TypeScript, Clerk authentication, Prisma ORM, and PostgreSQL. Track applications, visualize trends, and export reports.

**Live Demo:** [https://jobnix.vercel.app](https://jobnix.vercel.app)

---

## 📚 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- **CRUD Operations** - Create, read, update, delete job applications
- **Search & Filter** - Filter by position, company, status, and date
- **Pagination** - Paginated job list for large datasets
- **Statistics Dashboard** - Count cards + 6-month trend charts
- **Export Data** - Download as CSV or Excel

### User Experience
- **Authentication** - Clerk auth with email/password and OAuth
- **Dark/Light Mode** - System-aware theme switching
- **Responsive Design** - Mobile-first with hamburger navigation
- **Toast Notifications** - Success/error feedback
- **Form Validation** - React Hook Form + Zod

### Technical Highlights
- **SSR + Hydration** - Data ready on first paint
- **Optimistic UI** - Instant updates before server response
- **Multi-layer Cache** - `unstable_cache` with tags
- **Cross-tab Sync** - BroadcastChannel invalidation
- **Error Tracking** - Sentry integration
- **Type-safe** - Full TypeScript + Zod validation

---

## 🏗️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.8.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | shadcn/ui | Latest |
| Authentication | Clerk | 6.x |
| ORM | Prisma | 6.19.x |
| Database | PostgreSQL | Latest |
| Server State | TanStack Query | 5.x |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 3.x |
| Charts | Recharts | 2.x |
| Testing | Vitest | 4.x |
| Error Tracking | Sentry | Latest |

---

## 🏗️ Architecture

Jobnix follows a clean 4-layer architecture:

flowchart TD

A[Controller Layer<br/>utils/actions.ts<br/><br/>• Authentication<br/>• Validation<br/>• Error Handling<br/>• Logging]

B[Service Layer<br/>lib/services/job-service.ts<br/><br/>• Business Logic<br/>• Orchestration]

C[Repository Layer<br/>lib/repositories/job-repository.ts<br/><br/>• Prisma Queries<br/>• Data Access Only]

D[Data Layer<br/>prisma/<br/><br/>PostgreSQL + Prisma ORM]

A --> B
B --> C
C --> D


### Project Structure

jobnix/
├── app/                # Next.js App Router (routes + pages)
├── components/        # UI & reusable components
├── lib/               # Core business logic layer
├── hooks/             # Custom React hooks
├── providers/         # Context providers
├── utils/             # Server utilities & controllers
├── prisma/            # Database schema & seed
├── tests/             # Unit & integration tests
├── public/            # Static assets
└── .github/           # CI/CD workflows

🧭 Architecture Visualization

flowchart TD

A[app/<br/>Next.js App Router<br/><br/>Routes & Pages]
B[components/<br/>UI Layer<br/><br/>Reusable React Components]
C[lib/<br/>Core Logic Layer<br/><br/>Services, Repositories, DTOs]
D[hooks/<br/>Custom Hooks]
E[providers/<br/>Context Providers]
F[utils/<br/>Controllers + DB + Schemas]
G[prisma/<br/>Database Layer]
H[tests/<br/>Testing Layer]
I[public/<br/>Static Assets]

A --> F
F --> C
C --> G

A --> B
B --> D
A --> E
A --> I


---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- PostgreSQL ([Download](https://www.postgresql.org/download/))
- npm or yarn
- Clerk account ([Sign up](https://dashboard.clerk.com))

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ishreya-dev/jobnix.git
cd jobnix

2. Install dependencies

bash
npm install
3. Set up environment variables

bash
cp .env.example .env.local
Edit .env.local with your credentials:

env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/jobnix"
DIRECT_URL="postgresql://postgres:password@localhost:5432/jobnix"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Jobnix
4. Set up the database

bash
# Create the database (if not exists)
psql -U postgres -c "CREATE DATABASE jobnix;"

# Push Prisma schema
npx prisma db push

# Seed sample data (optional)
npm run db:seed-test-user -- YOUR_CLERK_ID
5. Start the development server

bash
npm run dev
Open http://localhost:3000

🔧 Environment Variables
Variable	Required	Description
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY	✅	Clerk public key
CLERK_SECRET_KEY	✅	Clerk secret key
DATABASE_URL	✅	PostgreSQL connection string
DIRECT_URL	✅	Direct database URL
NEXT_PUBLIC_APP_URL	❌	App URL (default: localhost)
NEXT_PUBLIC_APP_NAME	❌	App name (default: Jobnix)
NEXT_PUBLIC_SENTRY_DSN	❌	Sentry DSN
UPSTASH_REDIS_REST_URL	❌	Redis cache URL
UPSTASH_REDIS_REST_TOKEN	❌	Redis token
🗄️ Database Setup
Schema
prisma
model Job {
  id        String   @id @default(uuid())
  clerkId   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  position  String
  company   String
  location  String
  status    String   // pending | interview | declined
  mode      String   // full-time | part-time | internship

  @@index([clerkId])
  @@index([clerkId, status])
  @@index([clerkId, createdAt])
}
Commands
bash
# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (GUI)
npx prisma studio

# Seed sample data
npm run db:seed
🧪 Testing
bash
# Run all tests
npm test

# Run TypeScript check
npm run typecheck

# Run linter
npm run lint

# Full verification
npm run lint && npm run typecheck && npm test
Test Coverage
49 tests across 12 test files

Vitest for unit testing

React Testing Library for component tests

🚀 Deployment
Deploy to Vercel
Push code to GitHub

Import project in Vercel

Add environment variables

Deploy

Production Checklist
Clerk production keys (pk_live_* / sk_live_*)

PostgreSQL production database (Neon/Supabase)

DATABASE_URL and DIRECT_URL in Vercel

Clerk redirect URLs include production domain

Optional: Upstash Redis for caching

Optional: Sentry for error tracking

📊 Database Inspection
bash
# Inspect database contents
npm run db:inspect

# Fix malformed status values
npm run db:fix-status

# Seed test user jobs
npm run db:seed-test-user -- YOUR_CLERK_ID

# Migrate jobs to new Clerk user
npm run db:migrate-clerkid -- <OLD_CLERK_ID> <NEW_CLERK_ID>
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Next.js

Clerk

Prisma

shadcn/ui

TanStack Query

📧 Contact
Author: Shreya Kumari

GitHub: @ishreya-dev

Project Link: https://github.com/ishreya-dev/jobnix

Happy Coding! 🚀

text

---

## ✅ **Save and test**

1. **Save the file** (Ctrl+S)
2. **Close Notepad**
3. **Check your README** - it should look professional!

---

## 📋 **What's in the README**

| Section | Content |
|---------|---------|
| Badges | Tech stack badges |
| Features | Full feature list |
| Architecture | 4-layer diagram + folder structure |
| Setup | Step-by-step instructions |
| Environment | All variables explained |
| Database | Schema + commands |
| Testing | Test commands |
| Deployment | Vercel guide |

---

