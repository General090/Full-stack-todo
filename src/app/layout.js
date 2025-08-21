import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import ToastProvider from './components/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Todo App
            </Link>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <ToastProvider />
      </body>
    </html>
  );
}