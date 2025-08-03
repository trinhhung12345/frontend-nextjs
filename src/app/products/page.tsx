// src/app/products/page.tsx
import ProductCard from '@/components/ProductCard';
import PaginationControls from '@/components/PaginationControls';
import FilterSidebar from '@/components/FilterSidebar';
import SearchHeader from '@/components/SearchHeader';

// --- Type Definitions ---
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

type Category = {
    id: number;
    name: string;
    slug: string;
};

// --- Data Fetching Functions ---
async function getProducts(searchParams: { [key: string]: string | undefined }): Promise<ApiResponse | null> {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        }
    });

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate: 10 }, // Giảm thời gian cache để filter linh hoạt
            headers: { 'Bypass-Tunnel-Reminder': 'true' }
        });
        if (!res.ok) throw new Error(`API call failed: ${res.status}`);
        return res.json();
    } catch (error) {
        console.error("API Fetch Error for products:", error);
        return null;
    }
}

async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            next: { revalidate: 3600 }, // Cache categories trong 1 giờ
            headers: { 'Bypass-Tunnel-Reminder': 'true' }
        });
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("API Fetch Error for categories:", error);
        return [];
    }
}

// === Page Component ===
export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    // Fetch đồng thời products và categories
    const [productsData, categories] = await Promise.all([
        getProducts(searchParams),
        getCategories()
    ]);

    const { data: products = [], meta } = productsData || {};

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* === SIDEBAR (Dính bên trái) === */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white">
                        <FilterSidebar categories={categories} />
                    </aside>

                    {/* === MAIN CONTENT (Cột chính, có scroll nội bộ) === */}
                    <main className="lg:col-span-4">
                        <div className="sticky top-16 bg-white z-10 border-b border-gray-200">
                            {/* Header tìm kiếm */}
                            <SearchHeader />
                        </div>

                        {/* Lưới sản phẩm */}
                        {products.length > 0 ? (
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
                                    {products.map((variant: ApiProductVariant, index: number) => (
                                        <ProductCard
                                            key={variant.id}
                                            variant={variant}
                                            priority={index < 8}
                                        />
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <PaginationControls
                                        totalPages={meta?.last_page || 1}
                                        currentPage={meta?.current_page || 1}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 px-4">
                                <h3 className="text-xl font-semibold">Không tìm thấy sản phẩm</h3>
                                <p className="text-gray-500 mt-2">Vui lòng thử lại với bộ lọc khác.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}