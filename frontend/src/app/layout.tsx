import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech 16 Personalities - Discover Your Tech Type',
  description:
    'Take the comprehensive 40-question quiz to discover your unique tech personality and get personalized career recommendations.',
  keywords: [
    'tech personalities',
    'career assessment',
    'tech careers',
    'personality test',
    'career quiz',
    'tech roles',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
