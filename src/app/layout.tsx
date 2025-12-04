import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'GrammarPro - AI Writing Assistant',
  description: 'Professional-grade grammar checking, AI paraphrasing, and writing assistance',
  keywords: ['grammar checker', 'writing assistant', 'AI writing', 'grammar tool'],
  authors: [{ name: 'GrammarPro Team' }],
  openGraph: {
    title: 'GrammarPro - AI Writing Assistant',
    description: 'Professional-grade grammar checking and writing assistance',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

