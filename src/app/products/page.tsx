// src/app/products/page.tsx
// KHÔNG CÓ 'use client';

import ProductCard from '@/components/ProductCard';
import PaginationControls from '@/components/PaginationControls';
import FilterControls from '@/components/FilterControls';

// Định nghĩa Type cho dữ liệu
type ApiProductVariant = {
    id: number;
    price: string;
    image_url: string;
    product_name: string;
};

type ApiResponse = {
    data: ApiProductVariant[];
    links: {
        next: string | null;
        prev: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
    };
};

async function getProducts(page: string, limit: string, sort: string): Promise<ApiResponse> {

    // Xây dựng URL API với các tham số đã được truyền vào
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = new URL(`${apiBaseUrl}/products`);
    url.searchParams.set('page', page);
    url.searchParams.set('per_page', limit);
    url.searchParams.set('sort', sort);

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate: 60 },
            headers: { 'Bypass-Tunnel-Reminder': 'true' }
        });

        if (!res.ok) {
            throw new Error(`API call failed with status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { data: [], links: { next: null, prev: null }, meta: { current_page: 1, last_page: 1 } };
    }
}

// Page component bây giờ là một async function
export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    // Đọc các giá trị ở đây, cung cấp giá trị mặc định
    const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
    const limit = typeof searchParams.limit === 'string' ? searchParams.limit : '12';
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'latest';

    // Gọi hàm với các giá trị đã được xác định
    const { data: products, links, meta } = await getProducts(page, limit, sort);
    const isLoading = !products;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Bộ Sưu Tập</h2>
                    {/* Component tương tác cho bộ lọc */}
                    <FilterControls />
                </div>

                {isLoading ? (
                    <div className="text-center py-20 font-semibold">Đang tải sản phẩm...</div>
                ) : products.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
                        {products.map((variant, index) => (
                            <ProductCard
                                key={variant.id}
                                variant={variant}
                                priority={index < 8}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 font-semibold">Không tìm thấy sản phẩm nào.</div>
                )}

                {/* Component tương tác cho phân trang */}
                <PaginationControls
                    totalPages={meta.last_page}
                    currentPage={meta.current_page}
                />
            </div>
        </div>
    );
}