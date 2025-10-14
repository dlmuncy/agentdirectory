import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Agent Directory | Find & Compare AI Agent Solutions',
  description: 'Discover the perfect AI agent for your business. Browse verified agents, compare features, or request a custom build tailored to your needs.',
  openGraph: {
    title: 'AI Agent Directory | Find & Compare AI Agent Solutions',
    description: 'Discover the perfect AI agent for your business.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
