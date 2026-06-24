// lib/site-metadata.ts
import type { Metadata } from "next";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jobnix.vercel.app";
export const SITE_NAME = "Jobnix";

export const AUTHOR = {
  name: "Shreya Kumari",
  url: "https://github.com/ishreya-dev",
  email: "your-email@example.com",
} as const;

export const DEFAULT_TITLE = "Jobnix — Job Application Tracker";

export const TITLE_TEMPLATE = "%s | Jobnix";

export const DEFAULT_DESCRIPTION =
  "Jobnix is a full-featured, production-ready job application tracking app for job seekers. Track applications, analyze progress with charts and statistics, export data as CSV or Excel, and manage your job search with a beautiful, responsive dashboard.";

export const SEO_KEYWORDS = [
  "Jobnix",
  "job tracker",
  "job application tracker",
  "career tracker",
  "job hunt organizer",
  "Next.js",
  "Next.js 16",
  "TypeScript",
  "React",
  "PostgreSQL",
  "Prisma ORM",
  "Clerk authentication",
  "React Query",
  "TanStack Query",
  "shadcn/ui",
  "Tailwind CSS",
  "React Hook Form",
  "Zod validation",
  "Recharts",
  "job dashboard",
  "job analytics",
  "job statistics",
  "CSV export",
  "Excel export",
  "dark mode",
  "responsive design",
  "full stack",
  "open source",
];

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,

  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,

  applicationName: SITE_NAME,
  category: "productivity",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/main.svg",
        width: 1200,
        height: 630,
        alt: "Jobnix — Modern Job Application Tracking Dashboard",
        type: "image/svg+xml",
      },
      {
        url: "/logo.svg",
        width: 164,
        height: 50,
        alt: "Jobnix Logo",
        type: "image/svg+xml",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Jobnix — Job Application Tracker",
    description:
      "Track job applications, analyze your progress, and export your job search data. Built with Next.js, TypeScript, Clerk, Prisma, and PostgreSQL.",
    creator: "@ishreya_dev",
    site: "@ishreya_dev",
    images: [
      {
        url: "/main.svg",
        alt: "Jobnix — Job Application Tracking Dashboard",
      },
    ],
  },

  alternates: {
    canonical: SITE_URL,
  },

  other: {
    author: AUTHOR.name,
    contact: AUTHOR.email,
    designer: AUTHOR.name,
  },
};

/** Page-level metadata helper — merges with root defaults via Next.js metadata cascade */
export function createPageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}