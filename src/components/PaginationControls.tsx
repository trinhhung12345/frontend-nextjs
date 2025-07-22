// src/components/PaginationControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { generatePagination, DOTS } from '@/lib/pagination'; // <-- Import logic mới

type PaginationProps = {
    totalPages: number;
    currentPage: number;
};

export default function PaginationControls({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const paginationRange = generatePagination(currentPage, totalPages);

    const handlePageChange = (page: number | string) => {
        if (typeof page !== 'number') return; // Không làm gì nếu click vào '...'

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        router.push(`/products?${params.toString()}`);
    };

    // Nếu chỉ có 1 trang hoặc không có trang nào, không cần hiển thị phân trang
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        handlePageChange(currentPage + 1);
    };

    const onPrevious = () => {
        handlePageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className="mt-12 flex justify-center">
            <nav>
                <ul className="flex items-center -space-x-px h-10 text-base">
                    {/* Nút Previous */}
                    <li>
                        <button
                            onClick={onPrevious}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Previous</span>
                            {'<'}
                        </button>
                    </li>

                    {/* Các nút số trang */}
                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return <li key={`dots-${index}`} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">...</li>;
                        }

                        return (
                            <li key={pageNumber}>
                                <button
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${
                                        pageNumber === currentPage
                                            ? 'text-blue-600 bg-blue-50 font-bold'
                                            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        );
                    })}

                    {/* Nút Next */}
                    <li>
                        <button
                            onClick={onNext}
                            disabled={currentPage === lastPage}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Next</span>
                            {'>'}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}