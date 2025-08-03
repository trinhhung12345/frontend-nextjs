// src/components/SearchHeader.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchHeader() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
            params.set('search', searchTerm);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 border-b border-gray-200">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </form>
        </div>
    );
}