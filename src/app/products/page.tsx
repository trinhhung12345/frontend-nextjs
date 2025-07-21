// src/app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

// Định nghĩa kiểu dữ liệu cho sản phẩm (giống trong ProductCard)
type ProductVariant = {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
};

// --- MOCK DATA ---
// Sau này, chúng ta sẽ thay thế hàm này bằng một lời gọi API thật
const fetchMockProducts = (page: number, limit: number) => {
    console.log(`Fetching page ${page} with limit ${limit}`);
    const allProducts: ProductVariant[] = [];
    for (let i = 1; i <= 100; i++) {
        allProducts.push({
            id: i,
            product_name: `Áo Thun Cotton Cao Cấp #${i}`,
            price: 299000 + (i * 1000),
            image_url: `https://picsum.photos/id/${i + 100}/400/600`,
        });
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        data: allProducts.slice(start, end),
        total: allProducts.length, // Tổng số sản phẩm
    };
};
// --- KẾT THÚC MOCK DATA ---


export default function ProductsPage() {
    const [products, setProducts] = useState<ProductVariant[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12); // Giá trị mặc định
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    useEffect(() => {
        const getProducts = () => {
            setIsLoading(true);
            // Mô phỏng độ trễ của mạng
            setTimeout(() => {
                const response = fetchMockProducts(currentPage, itemsPerPage);
                setProducts(response.data);
                setTotalProducts(response.total);
                setIsLoading(false);
            }, 500); // 0.5 giây
        };

        getProducts();
    }, [currentPage, itemsPerPage]); // Chạy lại mỗi khi trang hoặc số lượng mỗi trang thay đổi

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset về trang 1 khi thay đổi số lượng
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Bộ Sưu Tập</h2>
                    <div className="mt-4 flex items-center gap-4 sm:mt-0">
                        {/* Placeholder cho bộ lọc */}
                        <div className="relative inline-block text-left">
                            <select className="rounded border-gray-300 text-sm shadow-sm">
                                <option>Sắp xếp theo</option>
                                <option>Mới nhất</option>
                                <option>Giá: Thấp đến cao</option>
                                <option>Giá: Cao đến thấp</option>
                            </select>
                        </div>
                        <div className="relative inline-block text-left">
                            <select
                                id="per-page"
                                value={itemsPerPage}
                                onChange={handlePerPageChange}
                                className="rounded border-gray-300 text-sm shadow-sm"
                            >
                                <option value="12">12 / trang</option>
                                <option value="24">24 / trang</option>
                                <option value="36">36 / trang</option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-20 font-semibold">Đang tải sản phẩm...</div>
                ) : (
                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
                        {products.map((variant) => (
                            <ProductCard key={variant.id} variant={variant} />
                        ))}
                    </div>
                )}

                {/* Phân trang */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-4">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                            Trang trước
                        </button>
                        <span className="text-sm"> Trang {currentPage} / {totalPages} </span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                            Trang sau
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}