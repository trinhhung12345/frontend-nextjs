// src/components/ProfileDropdown.tsx
'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { UserIcon, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

export default function ProfileDropdown() {
    const { isAuthenticated, user } = useUserStore();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <UserIcon className="h-6 w-6" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    // Thêm z-50 để đảm bảo dropdown luôn hiển thị trên cùng
                    className="z-50 w-56 bg-white rounded-md shadow-lg border border-gray-200 mt-2 animate-in fade-in-50"
                    sideOffset={5}
                >
                    {isAuthenticated && user ? (
                        <>
                            <DropdownMenu.Label className="px-4 py-2 text-sm text-gray-500">
                                Đăng nhập với tên <span className="font-bold">{user.name}</span>
                            </DropdownMenu.Label>
                            <DropdownMenu.Separator className="h-px bg-gray-200" />
                            <DropdownMenu.Item asChild>
                                <Link href="/account/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>Tài khoản của tôi</span>
                                </Link>
                            </DropdownMenu.Item>
                            {user.role === 'admin' && (
                                <DropdownMenu.Item asChild>
                                    <Link href="/admin/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Trang quản trị</span>
                                    </Link>
                                </DropdownMenu.Item>
                            )}
                            <DropdownMenu.Separator className="h-px bg-gray-200" />
                            <DropdownMenu.Item asChild>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Đăng xuất</span>
                                </button>
                            </DropdownMenu.Item>
                        </>
                    ) : (
                        <div className="p-4 text-center">
                            <p className="text-sm text-gray-700 mb-3">Vui lòng đăng nhập để tiếp tục.</p>
                            <Link href="/sign-in" className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                <LogIn className="mr-2 h-4 w-4" />
                                Đăng nhập / Đăng ký
                            </Link>
                        </div>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}