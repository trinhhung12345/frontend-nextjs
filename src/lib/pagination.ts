// src/lib/pagination.ts

export const DOTS = '...';

/**
 * Tạo ra một dãy số cho việc phân trang
 * @param currentPage - Trang hiện tại
 * @param totalPages - Tổng số trang
 * @param siblingCount - Số lượng trang anh em ở mỗi bên của trang hiện tại
 * @returns Một mảng chứa số trang và dấu '...'
 */
export const generatePagination = (
    currentPage: number,
    totalPages: number,
    siblingCount: number = 1
): (string | number)[] => {
    // Tổng số trang hiển thị = trang đầu + trang cuối + trang hiện tại + 2*anh em + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    // Trường hợp 1: Nếu tổng số trang ít hơn số trang chúng ta muốn hiển thị, thì hiển thị tất cả
    if (totalPages <= totalPageNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Trường hợp 2: Chỉ hiển thị DOTS bên phải
    if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

        return [...leftRange, DOTS, totalPages];
    }

    // Trường hợp 3: Chỉ hiển thị DOTS bên trái
    if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
        return [firstPageIndex, DOTS, ...rightRange];
    }

    // Trường hợp 4: Hiển thị DOTS ở cả hai bên
    if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    // Mặc định trả về một dãy cơ bản nếu không rơi vào trường hợp nào
    return [];
};