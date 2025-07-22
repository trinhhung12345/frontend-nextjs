// src/app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';

// === THÊM DÒNG NÀY VÀO ĐẦU FILE ===
export const dynamic = 'force-dynamic';
// ===================================

// Các Type và hàm getProductById không đổi...
type ApiVariant = { id: number; size: string; color: string; price: string; stock_quantity: number; image_url: string; };
type ProductData = { id: number; name: string; description: string; variants: ApiVariant[]; };
type ApiResponse = { data: ProductData; };

async function getProductById(id: string): Promise<ProductData | null> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiBaseUrl}/products/${id}`;
    try {
        const res = await fetch(url, {
            // Chúng ta có thể bỏ 'revalidate' đi vì trang đã là động hoàn toàn,
            // nhưng để lại cũng không sao, nó chỉ đơn giản là sẽ không được dùng.
            cache: 'no-store', // Rõ ràng hơn cho chế độ động
            headers: { 'Bypass-Tunnel-Reminder': 'true' }
        });
        if (res.status === 404) return null;
        if (!res.ok) throw new Error('Failed to fetch product data');
        const responseData: ApiResponse = await res.json();
        return responseData.data;
    } catch (error) {
        console.error("API Fetch Error for product:", error);
        return null;
    }
}

export default async function ProductDetailPage(props: { params: { id: string } }) {
    const { params } = await props;
    const product = await getProductById(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <ProductDetails product={product} />
            </div>
        </div>
    );
}