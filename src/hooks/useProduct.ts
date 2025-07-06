import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/api/product';
import type { Product } from '../types/product';

export const useProduct = (id: string) => {
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id)
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['relatedProducts'],
    queryFn: () => productApi.getRelatedProducts(),
    enabled: !!product
  });

  return {
    product,
    relatedProducts,
    isLoading,
    error
  };
};
