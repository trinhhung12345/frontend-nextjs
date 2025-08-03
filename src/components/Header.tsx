// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
    return (
        // Tăng z-index lên z-30 để đảm bảo header luôn ở trên cùng
        <header className="bg-white sticky top-0 z-30 border-b border-gray-200 shadow-sm">
            <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            MyShop
                        </Link>

                        {/* Menu Links */}
                        <div className="hidden md:flex md:items-center md:gap-8">
                            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                Sản phẩm
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                Về chúng tôi
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                Liên hệ
                            </Link>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        {/* Profile Dropdown Component */}
                        <ProfileDropdown />

                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                        {/* Cart Icon */}
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