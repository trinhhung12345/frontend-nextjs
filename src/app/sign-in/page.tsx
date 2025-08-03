// src/app/sign-in/page.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

export default function SignInPage() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [showPassword, setShowPassword] = useState(false);

    const commonInputClasses = "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm";

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    {activeTab === 'login' ? 'Đăng nhập vào tài khoản' : 'Tạo tài khoản mới'}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
                    {activeTab === 'login' ? (
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Địa chỉ email</label>
                                <div className="mt-1">
                                    <input id="login-email" name="email" type="email" autoComplete="email" required className={commonInputClasses}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <div className="mt-1 relative">
                                    <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className={commonInputClasses}/>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Đăng nhập</button>
                        </form>
                    ) : (
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                                <div className="mt-1">
                                    <input id="register-name" name="name" type="text" autoComplete="name" required className={commonInputClasses}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Địa chỉ email</label>
                                <div className="mt-1">
                                    <input id="register-email" name="email" type="email" autoComplete="email" required className={commonInputClasses}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <div className="mt-1 relative">
                                    <input id="register-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required className={commonInputClasses}/>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Đăng ký</button>
                        </form>
                    )}
                    <div className="mt-6 text-center">
                        {activeTab === 'login' ? (
                            <span className="text-sm text-gray-700">
                                Chưa có tài khoản?{' '}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('register')}
                                    className="font-medium text-blue-600 hover:text-blue-500 underline"
                                >
                                    Đăng ký tại đây
                                </button>
                            </span>
                        ) : (
                            <span className="text-sm text-gray-700">
                                Đã có tài khoản?{' '}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('login')}
                                    className="font-medium text-blue-600 hover:text-blue-500 underline"
                                >
                                    Đăng nhập tại đây
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}