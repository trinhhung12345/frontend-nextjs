// src/components/FilterSidebar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';

type Category = {
    id: number;
    name: string;
    slug: string;
};

export default function FilterSidebar({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get('min_price')) || 0,
        Number(searchParams.get('max_price')) || 1000000,
    ]);

    useEffect(() => {
        setPriceRange([
            Number(searchParams.get('min_price')) || 0,
            Number(searchParams.get('max_price')) || 1000000,
        ]);
    }, [searchParams]);

    const handleUrlUpdate = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        router.push(`/products?${params.toString()}`);
    };

    const handlePriceCommit = (newRange: [number, number]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('min_price', String(newRange[0]));
        params.set('max_price', String(newRange[1]));
        params.set('page', '1');
        router.push(`/products?${params.toString()}`);
    };

    // Hàm bọc để xử lý kiểu dữ liệu từ onValueChange của Slider
    const handlePriceValueChange = (value: number[]) => {
        if (Array.isArray(value) && value.length === 2) {
            setPriceRange([value[0], value[1]]);
        }
    };

    const selectedCategories = searchParams.get('categories')?.split(',') || [];

    return (
        <aside className="p-6 bg-white border-r border-gray-200">
            {/* Bộ lọc Sắp xếp */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Sắp xếp</h3>
                <select
                    onChange={(e) => handleUrlUpdate('sort', e.target.value)}
                    defaultValue={searchParams.get('sort') ?? 'latest'}
                    className="w-full rounded border-gray-300 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="latest">Mới nhất</option>
                    <option value="price_asc">Giá: Thấp đến cao</option>
                    <option value="price_desc">Giá: Cao đến thấp</option>
                </select>
            </div>

            {/* Bộ lọc Thể loại */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Thể Loại</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                    {categories.map(category => (
                        <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.slug)}
                                onChange={() => {
                                    const newCategories = selectedCategories.includes(category.slug)
                                        ? selectedCategories.filter(c => c !== category.slug)
                                        : [...selectedCategories, category.slug];
                                    handleUrlUpdate('categories', newCategories.length ? newCategories.join(',') : null);
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Bộ lọc Khoảng giá */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Giá</h3>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={priceRange}
                    onValueChange={handlePriceValueChange}
                    onValueCommit={(value) => handlePriceCommit([value[0], value[1]])}
                    min={0}
                    max={1000000}
                    step={10000}
                >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                        <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                    <Slider.Thumb className="block w-5 h-5 bg-white shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                </Slider.Root>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{new Intl.NumberFormat('vi-VN').format(priceRange[0])}đ</span>
                    <span>{new Intl.NumberFormat('vi-VN').format(priceRange[1])}đ</span>
                </div>
            </div>
        </aside>
    );
}