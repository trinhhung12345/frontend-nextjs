// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
    return (
        <header className="bg-white sticky top-0 z-30 border-b border-gray-200 shadow-sm">
            <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                            MyShop
                        </Link>
                    </div>

                    {/* Menu Links (Centered) */}
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-8 flex-1">
                        <Link href="/products" className="header-link text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sản phẩm
                        </Link>
                        <Link href="/about" className="header-link text-sm font-medium text-gray-700 hover:text-gray-900">
                            Về chúng tôi
                        </Link>
                        <Link href="/contact" className="header-link text-sm font-medium text-gray-700 hover:text-gray-900">
                            Liên hệ
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex flex-1 items-center justify-end gap-4">
                        <ProfileDropdown />
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                        <Link href="/cart" className="group -m-2 flex items-center p-2">
                            <ShoppingBagIcon
                                className="h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-700 transition-colors"
                                aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 bg-gray-100 rounded-full px-2 py-0.5">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}