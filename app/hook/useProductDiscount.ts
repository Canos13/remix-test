import { useMemo } from 'react';
import { Product } from '~/context/productStore';

interface DiscountInfo {
    hasDiscount: boolean;
    discount: number;
}

export const useProductDiscount = (product: Pick<Product, 'listPrice' | 'price'>): DiscountInfo => {
    return useMemo(() => {
        const hasDiscount = product.listPrice > product.price;
        const discount = hasDiscount
            ? Math.round(100 - ((product.price * 100) / product.listPrice))
            : 0;

        return {
            hasDiscount,
            discount
        };
    }, [product.listPrice, product.price]);
};