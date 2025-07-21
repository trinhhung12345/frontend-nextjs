// src/components/Header.tsx
'use client';
import Link from 'next/link';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Sản Phẩm', href: '/products' },
    { name: 'Về Chúng Tôi', href: '/about' },
];

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo (hoặc tên cửa hàng) */}
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link href="/" className="block text-teal-600">
                            <span className="sr-only">Trang Chủ</span>
                            <span className="text-2xl font-bold">YourStore</span>
                        </Link>
                    </div>

                    {/* Menu điều hướng */}
                    <div className="hidden md:flex md:gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-500 transition hover:text-gray-700"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Các icon */}
                    <div className="flex flex-1 items-center justify-end md:gap-6">
                        <Link href="/account" className="text-gray-500 transition hover:text-gray-700">
                            <UserIcon className="h-6 w-6" />
                        </Link>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                        <Link href="/cart" className="group -m-2 flex items-center p-2">
                            <ShoppingBagIcon
                                className="h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-700"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}