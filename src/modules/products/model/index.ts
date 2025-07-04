import type { ApiSuccessResponsePaginated } from '@kernel/api';
import type { Product } from '@kernel/types';
import z from 'zod';

export const filtersSchema = z.object({
  categoryIds: z.union([z.string(), z.array(z.string())]).optional(),
  breweryId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  discount: z.boolean().optional(),
});

export type Filters = z.infer<typeof filtersSchema>;
export const productsModel = {
  flattenProductsPages(pages: ApiSuccessResponsePaginated<Product>[] | undefined): Product[] {
    return pages?.flatMap(page => page.data) ?? [];
  },

  getNextPageParam(lastPage: ApiSuccessResponsePaginated<Product>) {
    const { page, totalPages } = lastPage.pagination;
    return page < totalPages ? page + 1 : undefined;
  },

  getFilterParams(filterParams: Filters): string {
    const params = filtersSchema.parse(filterParams);

    if (!params || Object.keys(params).length === 0) return '';

    const searchParams = new URLSearchParams();

    if (params.categoryIds) {
      if (Array.isArray(params.categoryIds)) {
        params.categoryIds.forEach(id => searchParams.append('categoryIds', id));
      }
      else {
        searchParams.append('categoryIds', params.categoryIds);
      }
    }
    if (params.breweryId) searchParams.append('breweryId', params.breweryId);
    if (params.minPrice !== undefined) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.discount !== undefined) searchParams.append('discount', params.discount ? 'true' : 'false');

    return searchParams.toString();
  },

};
