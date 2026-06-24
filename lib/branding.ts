export const branding = {
  name: 'Jobnix',
  tagline: 'Track your job applications with ease',
  description: 'Jobnix helps you organize, track, and analyze your job search in one place.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://jobnix.vercel.app',
  github: 'https://github.com/your-username/jobnix',
  author: 'Your Name',
  year: new Date().getFullYear(),
};

export type Branding = typeof branding;