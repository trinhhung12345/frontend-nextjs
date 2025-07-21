// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Dùng font Inter cho hiện đại
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'YourStore - Cửa hàng thời trang',
    description: 'Chất lượng và phong cách',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
        <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Header />
        {/* flex-grow sẽ đẩy footer xuống dưới cùng */}
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}