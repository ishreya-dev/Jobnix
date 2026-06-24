// app/providers.tsx
'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { OverlayScrollbar } from '@/components/ui/overlay-scrollbar';
import { QueryProvider } from '@/providers/query-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <OverlayScrollbar />
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default Providers;