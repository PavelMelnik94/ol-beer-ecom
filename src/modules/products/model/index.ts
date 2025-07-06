import type { ApiSuccessResponsePaginated } from '@kernel/api';
import type { Product } from '@kernel/types';
import z from 'zod';

export const filtersSchema = z.object({
  categoryIds: z.union([z.string(), z.array(z.string())]).optional(),
  breweryId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  discount: z.boolean().optional(),
  limit: z.number().default(25).optional(),
  page: z.number().default(1).optional(),
});

export type Filters = z.infer<typeof filtersSchema>;
export const productsModel = {
  flattenProductsPages(pages: ApiSuccessResponsePaginated<Product>[] | undefined): Product[] {
    return pages?.flatMap(page => page.data) ?? [];
  },

  getNextPageParam(lastPage: ApiSuccessResponsePaginated<Product>) {
    const { pagination } = lastPage;
    if (!pagination) return undefined;
    if (pagination.page < pagination.totalPages) return pagination.page + 1;
    return undefined;
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
    // if (params.limit) searchParams.append('limit', params.limit.toString());
    // if (params.page) searchParams.append('page', params.page.toString());

    return searchParams.toString();
  },

};
