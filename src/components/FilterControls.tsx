// src/components/FilterControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterControls() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilterChange = (key: 'sort' | 'limit', value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        // Khi lọc, luôn quay về trang 1
        params.set('page', '1');
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <div className="relative inline-block text-left">
                <select
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    defaultValue={searchParams.get('sort') ?? 'latest'}
                    className="rounded border-gray-300 text-sm shadow-sm"
                >
                    <option value="latest">Sắp xếp theo: Mới nhất</option>
                    <option value="price_asc">Giá: Thấp đến cao</option>
                    <option value="price_desc">Giá: Cao đến thấp</option>
                </select>
            </div>
            <div className="relative inline-block text-left">
                <select
                    onChange={(e) => handleFilterChange('limit', e.target.value)}
                    defaultValue={searchParams.get('limit') ?? '12'}
                    className="rounded border-gray-300 text-sm shadow-sm"
                >
                    <option value="12">12 / trang</option>
                    <option value="24">24 / trang</option>
                    <option value="36">36 / trang</option>
                </select>
            </div>
        </div>
    );
}