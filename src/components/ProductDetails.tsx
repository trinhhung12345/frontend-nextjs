// src/components/ProductDetails.tsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import api from '@/lib/api'; // Import axios instance để gọi API

// --- TYPE DEFINITIONS ---
// Cập nhật Type để có sold_count
type ApiVariant = {
    id: number;
    size: string;
    color: string;
    price: string;
    stock_quantity: number;
    sold_count: number;
    image_url: string;
};

type ProductData = {
    id: number;
    name: string;
    description: string;
    variants: ApiVariant[];
};

// --- HELPER COMPONENT ---
// Một component spinner đơn giản để hiển thị trạng thái loading
const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


// --- MAIN COMPONENT ---
export default function ProductDetails({ product }: { product: ProductData }) {
    // === CÀI ĐẶT CAROUSEL ===
    const [emblaRef] = useEmblaCarousel({ align: 'start', slidesToScroll: 1 });

    // === STATE QUẢN LÝ ===
    const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || null);
    const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || null);
    const [activeVariant, setActiveVariant] = useState<ApiVariant | null>(product.variants[0] || null);
    const [mainImageUrl, setMainImageUrl] = useState(product.variants[0]?.image_url || '');
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // === LOGIC TÍNH TOÁN (MEMOIZED) ===
    const sizes = useMemo(() => [...new Set(product.variants.map(v => v.size))], [product.variants]);
    const availableColorsForSelectedSize = useMemo(() =>
            [...new Set(product.variants.filter(v => v.size === selectedSize).map(v => v.color))],
        [selectedSize, product.variants]
    );

    // === CÁC HIỆU ỨNG (EFFECTS) ===
    // Tự động chọn màu đầu tiên khi size thay đổi và reset số lượng
    useEffect(() => {
        const firstAvailableColor = availableColorsForSelectedSize[0] || null;
        setSelectedColor(firstAvailableColor);
        setQuantity(1); // Reset số lượng về 1 khi đổi size
    }, [selectedSize, availableColorsForSelectedSize]);

    // Cập nhật biến thể active và ảnh chính khi lựa chọn thay đổi
    useEffect(() => {
        const foundVariant = product.variants.find(
            v => v.size === selectedSize && v.color === selectedColor
        );
        if (foundVariant) {
            setActiveVariant(foundVariant);
            setMainImageUrl(foundVariant.image_url);
            setQuantity(1); // Reset số lượng về 1 khi đổi màu
        }
    }, [selectedSize, selectedColor, product.variants]);

    // === HÀM XỬ LÝ SỰ KIỆN ===
    const handleThumbnailClick = useCallback((imageUrl: string) => {
        setMainImageUrl(imageUrl);
    }, []);

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => {
            const newQuantity = prev + amount;
            if (newQuantity < 1) return 1;
            if (activeVariant && newQuantity > activeVariant.stock_quantity) {
                // (Tùy chọn) Thêm thông báo "Đã đạt số lượng tối đa"
                return activeVariant.stock_quantity;
            }
            return newQuantity;
        });
    };

    const handleAddToCart = async () => {
        if (!activeVariant) return;
        setIsAddingToCart(true);

        try {
            await api.post('/cart', {
                product_variant_id: activeVariant.id,
                quantity: quantity
            });
            alert(`${quantity} sản phẩm "${product.name} (${activeVariant.size}/${activeVariant.color})" đã được thêm vào giỏ!`);
            // Sau này có thể thay alert bằng một thông báo toast chuyên nghiệp hơn
        } catch (error: any) {
            console.error("Failed to add to cart:", error);
            alert(`Lỗi: ${error.response?.data?.message || 'Không thể thêm vào giỏ hàng.'}`);
        } finally {
            setIsAddingToCart(false);
        }
    };

    // === RENDER JSX ===
    return (
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
            {/* === CỘT ẢNH === */}
            <div>
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                    <Image
                        src={mainImageUrl}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover transition-opacity duration-300"
                        key={mainImageUrl}
                    />
                </div>
                <div className="mt-4 -ml-2">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container">
                            {product.variants.map((variant) => (
                                <div className="embla__slide" key={`thumb-${variant.id}`}>
                                    <button onClick={() => handleThumbnailClick(variant.image_url)} className={`w-full aspect-square relative rounded-md overflow-hidden ${mainImageUrl === variant.image_url ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                                        <Image
                                            src={variant.image_url}
                                            alt={`Thumbnail ${variant.color} ${variant.size}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* === CỘT THÔNG TIN === */}
            <div className="mt-10 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
                <div className="mt-3">
                    <p className="text-3xl text-gray-900">
                        {activeVariant ? `${new Intl.NumberFormat('vi-VN').format(Number(activeVariant.price))}đ` : 'Vui lòng chọn'}
                    </p>
                </div>

                {activeVariant && (
                    <div className="mt-4 flex items-center text-sm text-gray-500 divide-x divide-gray-300">
                        <span className="pr-3">Đã bán: <span className="font-medium text-gray-700">{activeVariant.sold_count}</span></span>
                        <span className="pl-3">Còn lại: <span className="font-medium text-gray-700">{activeVariant.stock_quantity}</span></span>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="sr-only">Description</h3>
                    <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>

                <div className="mt-10 space-y-8">
                    {/* Lựa chọn Size */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
                        <div className="flex flex-wrap gap-3">
                            {sizes.map(size => (
                                <button
                                    key={`size-${size}`}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-5 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                                        ${selectedSize === size
                                        ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 text-gray-800 bg-white hover:border-gray-400'}`
                                    }
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lựa chọn Color */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Màu sắc</h3>
                        <div className="flex flex-wrap gap-3">
                            {[...new Set(product.variants.map(v => v.color))].map(color => (
                                <button
                                    key={`color-${color}`}
                                    onClick={() => setSelectedColor(color)}
                                    disabled={!availableColorsForSelectedSize.includes(color)}
                                    className={`px-5 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                                        ${selectedColor === color
                                        ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 text-gray-800 bg-white hover:border-gray-400'}
                                        disabled:opacity-30 disabled:bg-gray-100 disabled:cursor-not-allowed`
                                    }
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bộ chọn số lượng */}
                <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Số lượng</h3>
                    <div className="inline-flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => handleQuantityChange(-1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400">-</button>
                        <span className="px-5 py-2 text-center w-16 tabular-nums">{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400">+</button>
                    </div>
                </div>

                {/* Nút thêm vào giỏ */}
                <div className="mt-10">
                    <button
                        onClick={handleAddToCart}
                        disabled={!activeVariant || activeVariant.stock_quantity < quantity || isAddingToCart}
                        className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isAddingToCart ? <Spinner /> : (activeVariant?.stock_quantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ')}
                    </button>
                </div>
            </div>
        </div>
    );
}