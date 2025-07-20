import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';
import { PageErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'rihib.dev',
  description: 'rihib - Personal Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background text-foreground">
        <PageErrorBoundary>
          <ClientLayout>{children}</ClientLayout>
        </PageErrorBoundary>
      </body>
    </html>
  );
}
