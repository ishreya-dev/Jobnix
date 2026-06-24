# 🚀 Jobnix - Smart Job Application Tracker

> 📌 A modern, production-ready job tracking system that helps you organize applications, track progress, and visualize your career journey.

🔗 Live Demo: https://jobnix.vercel.app  
📊 Track • Analyze • Grow

---

## 🛡️ Tech Stack Badges

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18)

---

## 📸 Screenshots

### 🧭 Dashboard View

<img width="1918" height="802" alt="image" src="https://github.com/user-attachments/assets/f2da6902-e98a-4298-a97e-75a5fbc36142" />
<img width="1915" height="876" alt="image" src="https://github.com/user-attachments/assets/f7803d5b-fb3d-4757-903c-2f483e2a56fd" />
<img width="1918" height="787" alt="image" src="https://github.com/user-attachments/assets/0fd0205b-d673-4204-ab17-e345e417c053" />
<img width="1918" height="802" alt="image" src="https://github.com/user-attachments/assets/98911543-9d72-4072-8ba7-e106446b1e30" />

---

### 🔐 Authentication
<img width="1917" height="873" alt="image" src="https://github.com/user-attachments/assets/4ea0f28f-4e91-4fe9-bb1e-d2eacba3e09d" />

---

## ✨ Features

### 📌 Core
- CRUD job applications
- Search & filter system
- Pagination support
- Status tracking (Pending / Interview / Rejected)

### 📊 Analytics
- Job trends over time
- Status distribution charts
- Visual insights dashboard

### ⚡ Performance
- Server-side rendering (SSR)
- Optimistic UI updates
- Multi-layer caching system
- Cross-tab sync

### 🔐 Security
- Clerk authentication
- Protected routes
- Secure server actions

---

## 🏗️ Architecture

```mermaid
flowchart TD
User --> UI
UI --> Actions
Actions --> Service
Service --> Repository
Repository --> Database
Service --> Cache

## 📁 Project Structure

```bash
jobnix/
├── app/                 # Next.js App Router
├── components/         # UI Components
├── lib/                # Core business logic
├── hooks/              # Custom React hooks
├── utils/              # Server utilities & actions
├── prisma/             # Database schema & migrations
├── public/             # Static assets
├── tests/              # Unit & integration tests
└── scripts/            # Utility scripts
```

## 🚀 Getting Started

```bash
git clone https://github.com/ishreya-dev/jobnix.git
cd jobnix
npm install
npm run dev

## ⚙️ Environment Variables

```env
DATABASE_URL=""
DIRECT_URL=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"

## 🧪 Testing

```bash
npm run test
npm run lint
npm run typecheck

## 🚀 Deployment

- Push code to GitHub
- Import project in Vercel
- Add environment variables
- Deploy 🚀

## 📦 Tech Stack (Detailed)

| Layer | Technology |
|------|------------|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Clerk |
| Styling | Tailwind CSS |
| Testing | Vitest |

## 🛡️ Tech Stack Badges (Bottom Mirror)

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

## 🙌 Author

Made with ❤️ by **Shreya Kumari**

- GitHub: https://github.com/ishreya-dev
- Project: https://github.com/ishreya-dev/jobnix

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it 🚀
