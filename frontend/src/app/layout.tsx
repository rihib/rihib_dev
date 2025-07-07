import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'rihib.dev',
  description: 'rihib - Personal Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}