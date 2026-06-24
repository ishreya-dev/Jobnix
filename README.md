You're right! Let me add **proper Markdown tables** and **Mermaid diagrams** to the README.

---

## 📝 **Complete README.md with Tables & Mermaid Diagrams**

```markdown
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

## 📸 Screenshots

<!-- Add your screenshots here -->
<!-- 
![Dashboard](screenshots/dashboard.png)
![Stats](screenshots/stats.png)
![Sign In](screenshots/signin.png)
-->

---

## 📚 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Data Flow](#data-flow)
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

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 16.x | React framework with App Router |
| **UI Library** | React | 19.x | UI components |
| **Language** | TypeScript | 5.8.x | Type safety |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first CSS |
| **UI Components** | shadcn/ui | Latest | Accessible components |
| **Authentication** | Clerk | 6.x | Auth + user management |
| **ORM** | Prisma | 6.19.x | Type-safe database access |
| **Database** | PostgreSQL | Latest | Primary database |
| **Server State** | TanStack Query | 5.x | Caching + data fetching |
| **Forms** | React Hook Form | 7.x | Form state management |
| **Validation** | Zod | 3.x | Schema validation |
| **Charts** | Recharts | 2.x | Data visualization |
| **Testing** | Vitest | 4.x | Unit testing |
| **Error Tracking** | Sentry | Latest | Production monitoring |
| **Logging** | Pino | Latest | Structured logging |

---

## 🏗️ Architecture

### Layer Architecture

```mermaid
flowchart TD
    A[Controller Layer<br/>utils/actions.ts<br/><br/>• Authentication<br/>• Validation<br/>• Error Handling<br/>• Logging]
    
    B[Service Layer<br/>lib/services/job-service.ts<br/><br/>• Business Logic<br/>• Orchestration<br/>• Cache Invalidation]
    
    C[Repository Layer<br/>lib/repositories/job-repository.ts<br/><br/>• Database Queries<br/>• Data Access Only]
    
    D[Cache Layer<br/>lib/jobs/queries.ts<br/><br/>• Next.js unstable_cache<br/>• Redis (optional)<br/>• Tag-based invalidation]
    
    E[Data Layer<br/>prisma/<br/><br/>PostgreSQL + Prisma ORM]
    
    F[DTO Layer<br/>lib/dto/job.dto.ts<br/><br/>• Transform DB Models<br/>• API Response Shaping]
    
    A --> B
    B --> C
    B --> F
    C --> D
    D --> E
    F --> A
```

### Component Architecture

```mermaid
flowchart LR
    subgraph Frontend
        P[Pages /app/]
        C[Components /components/]
        H[Hooks /hooks/]
        PR[Providers /providers/]
    end
    
    subgraph Backend
        A[Server Actions /utils/actions.ts]
        S[Services /lib/services/]
        R[Repositories /lib/repositories/]
        DTO[DTOs /lib/dto/]
        DB[(Database)]
    end
    
    P --> A
    C --> H
    C --> PR
    A --> S
    S --> R
    S --> DTO
    R --> DB
    DTO --> A
```

### Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Controller (actions.ts)
    participant S as Service (job-service.ts)
    participant R as Repository (job-repository.ts)
    participant D as Database (PostgreSQL)
    
    U->>C: Create Job Request
    C->>C: Authenticate & Validate
    C->>S: createJob(data)
    S->>R: create(data)
    R->>D: INSERT INTO Job
    D-->>R: Job Record
    R-->>S: Job
    S->>S: Invalidate Cache
    S-->>C: Job
    C-->>U: Job Created
```

---

## 📁 Project Structure

```
jobnix/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── sign-in/            # Sign in page
│   │   ├── sign-up/            # Sign up page
│   │   └── sso-callback/       # OAuth callback
│   ├── (dashboard)/             # Dashboard routes
│   │   ├── dashboard/          # Dashboard page
│   │   ├── stats/              # Stats page
│   │   └── layout.tsx          # Dashboard layout
│   ├── api/                     # API routes
│   │   ├── jobs/events/        # SSE invalidation
│   │   └── monitoring/         # Sentry tunnel
│   ├── layout.tsx               # Root layout
│   └── providers.tsx            # App providers
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── nav-shell.tsx
│   │   ├── landing-nav.tsx
│   │   └── dashboard-nav.tsx
│   ├── jobs/                    # Job components
│   │   ├── job-card.tsx
│   │   ├── jobs-grid.tsx
│   │   └── jobs-filter-bar.tsx
│   ├── forms/                   # Form components
│   │   ├── create-job-form.tsx
│   │   └── edit-job-form.tsx
│   ├── stats/                   # Stats components
│   │   ├── stats-container.tsx
│   │   └── charts-container.tsx
│   └── ui/                      # shadcn/ui components
│
├── lib/                          # Application logic
│   ├── services/                # Business logic
│   │   └── job-service.ts
│   ├── repositories/            # Database access
│   │   └── job-repository.ts
│   ├── dto/                     # Data Transfer Objects
│   │   └── job.dto.ts
│   ├── types/                   # TypeScript types
│   │   └── api.ts
│   ├── auth/                    # Authentication utilities
│   │   └── auth-utils.ts
│   ├── jobs/                    # Job utilities
│   │   ├── queries.ts
│   │   ├── filter-params.ts
│   │   └── chart-optimistic.ts
│   ├── cache/                   # Caching
│   │   ├── cache-tags.ts
│   │   └── redis.ts
│   ├── logger.ts                # Structured logging
│   └── errors.ts                # Error handling
│
├── hooks/                        # Custom React hooks
│   ├── use-jobs-mutation.ts
│   ├── use-jobs-cache-sync.ts
│   └── use-guest-sign-in.ts
│
├── providers/                    # React providers
│   └── query-provider.tsx
│
├── utils/                        # Server utilities
│   ├── actions.ts               # Server Actions (Controllers)
│   ├── db.ts                    # Prisma client
│   └── types.ts                 # Validation schemas
│
├── prisma/                       # Database
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── __tests__/                    # Tests
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── scripts/                      # Utility scripts
├── public/                       # Static assets
├── .github/                      # GitHub Actions CI/CD
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | 20+ | [Download](https://nodejs.org/) |
| PostgreSQL | Latest | [Download](https://www.postgresql.org/download/) |
| npm or yarn | Latest | Included with Node.js |
| Clerk Account | - | [Sign up](https://dashboard.clerk.com) |

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ishreya-dev/jobnix.git
cd jobnix
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/jobnix"
DIRECT_URL="postgresql://postgres:password@localhost:5432/jobnix"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Jobnix
```

**4. Set up the database**

```bash
# Create the database (if not exists)
psql -U postgres -c "CREATE DATABASE jobnix;"

# Push Prisma schema
npx prisma db push

# Seed sample data (optional)
npm run db:seed-test-user -- YOUR_CLERK_ID
```

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔧 Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk public key | - |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key | - |
| `DATABASE_URL` | ✅ | PostgreSQL connection string | - |
| `DIRECT_URL` | ✅ | Direct database URL | - |
| `NEXT_PUBLIC_APP_URL` | ❌ | App URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_NAME` | ❌ | App name | `Jobnix` |
| `NEXT_PUBLIC_SENTRY_DSN` | ❌ | Sentry DSN | - |
| `UPSTASH_REDIS_REST_URL` | ❌ | Redis cache URL | - |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ | Redis token | - |
| `LOG_LEVEL` | ❌ | Logging level | `info` |

---

## 🗄️ Database Setup

### Schema

```prisma
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
```

### Commands

| Command | Description |
|---------|-------------|
| `npx prisma db push` | Push schema to database |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma studio` | Open Prisma Studio (GUI) |
| `npm run db:seed` | Seed sample data |
| `npm run db:inspect` | Inspect database contents |
| `npm run db:fix-status` | Fix malformed status values |

---

## 🧪 Testing

### Commands

```bash
# Run all tests
npm test

# Run TypeScript check
npm run typecheck

# Run linter
npm run lint

# Full verification
npm run lint && npm run typecheck && npm test
```

### Test Coverage

| Metric | Value |
|--------|-------|
| Total Tests | 49 |
| Test Files | 12 |
| Framework | Vitest |
| Component Testing | React Testing Library |

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Production Checklist

| Item | Status |
|------|--------|
| Clerk production keys (`pk_live_*` / `sk_live_*`) | ⬜ |
| PostgreSQL production database (Neon/Supabase) | ⬜ |
| `DATABASE_URL` and `DIRECT_URL` in Vercel | ⬜ |
| Clerk redirect URLs include production domain | ⬜ |
| Optional: Upstash Redis for caching | ⬜ |
| Optional: Sentry for error tracking | ⬜ |

---

## 📊 Database Inspection Scripts

| Script | Description |
|--------|-------------|
| `npm run db:inspect` | Inspect database contents |
| `npm run db:fix-status` | Fix malformed status values |
| `npm run db:seed-test-user -- <CLERK_ID>` | Seed test user jobs |
| `npm run db:migrate-clerkid -- <OLD> <NEW>` | Migrate jobs to new Clerk user |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)

---

## 📧 Contact

**Author:** Shreya Kumari

| Platform | Link |
|----------|------|
| GitHub | [@ishreya-dev](https://github.com/ishreya-dev) |
| Project | [github.com/ishreya-dev/jobnix](https://github.com/ishreya-dev/jobnix) |

---

**Happy Coding! 🚀**
```

---

## ✅ **Save and close**

1. **Save the file** (Ctrl+S)
2. **Close Notepad**

---

## 📊 **What's New**

| Feature | Description |
|---------|-------------|
| **Mermaid Diagrams** | Architecture flowcharts (visual) |
| **Tables** | Technology stack, environment variables, commands |
| **Better Structure** | Cleaner sections with visual elements |
| **Status Tables** | Production checklist with checkboxes |

---
