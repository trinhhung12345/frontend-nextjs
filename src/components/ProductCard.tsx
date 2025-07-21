// src/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';

type ProductVariant = {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    is_new: boolean;
};

const ProductCard = ({ variant }: { variant: ProductVariant }) => {
    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-opacity">
                <Image
                    src={variant.image_url}
                    alt={variant.product_name}
                    fill
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {variant.is_new && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        MỚI
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={`/products/${variant.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {variant.product_name}
                        </Link>
                    </h3>
                    {/* Có thể thêm màu sắc ở đây */}
                </div>
                <p className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('vi-VN').format(variant.price)}đ
                </p>
            </div>
        </div>
    );
};

export default ProductCard;