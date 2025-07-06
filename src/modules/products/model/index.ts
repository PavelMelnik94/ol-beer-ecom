import type { ApiSuccessResponsePaginated } from '@kernel/api';
import type { Product } from '@kernel/types';
import { z } from 'zod';

export const filtersSchema = z.object({
  categoryIds: z.union([z.string(), z.array(z.string())]).optional(),
  breweryId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
  limit: z.number().default(25).optional(),
  page: z.number().default(1).optional(),
});

export type Filters = z.infer<typeof filtersSchema>;

export const filtersFormSchema = z.object({
  search: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  breweryId: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

export type FiltersForm = z.infer<typeof filtersFormSchema>;

export const filtersUrlSchema = z.object({
  search: z.string().optional(),
  categoryIds: z.union([z.string(), z.array(z.string())]).optional(),
  breweryId: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sortBy: z.string().optional(),
  order: z.string().optional(),
});

export type FiltersUrl = z.infer<typeof filtersUrlSchema>;

function urlToForm(urlParams: FiltersUrl): FiltersForm {
  return {
    search: urlParams.search || '',
    categoryIds: Array.isArray(urlParams.categoryIds)
      ? urlParams.categoryIds
      : urlParams.categoryIds
        ? [urlParams.categoryIds]
        : [],
    breweryId: urlParams.breweryId || '',
    minPrice: urlParams.minPrice ? Number(urlParams.minPrice) : undefined,
    maxPrice: urlParams.maxPrice ? Number(urlParams.maxPrice) : undefined,
  };
}

function formToUrl(formData: FiltersForm): FiltersUrl {
  const result: FiltersUrl = {};

  if (formData.search && formData.search.trim()) {
    result.search = formData.search.trim();
  }

  if (formData.categoryIds && formData.categoryIds.length > 0) {
    result.categoryIds = formData.categoryIds;
  }

  if (formData.breweryId && formData.breweryId.trim()) {
    result.breweryId = formData.breweryId;
  }

  if (formData.minPrice !== undefined) {
    result.minPrice = String(formData.minPrice);
  }

  if (formData.maxPrice !== undefined) {
    result.maxPrice = String(formData.maxPrice);
  }

  return result;
}

function formToApi(formData: FiltersForm): Record<string, any> {
  const result: Record<string, any> = {};

  if (formData.search && formData.search.trim()) {
    result.search = formData.search.trim();
  }

  if (formData.categoryIds && formData.categoryIds.length > 0) {
    result.categoryIds = formData.categoryIds;
  }

  if (formData.breweryId && formData.breweryId.trim()) {
    result.breweryId = formData.breweryId;
  }

  if (formData.minPrice !== undefined) {
    result.minPrice = formData.minPrice;
  }

  if (formData.maxPrice !== undefined) {
    result.maxPrice = formData.maxPrice;
  }

  return result;
}

function getFilterParams(filterParams: Filters): string {
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
  if (params.search) searchParams.append('search', params.search);

  return searchParams.toString();
}

function getNextPageParam(lastPage: ApiSuccessResponsePaginated<Product>) {
  const { pagination } = lastPage;
  if (!pagination) return undefined;
  if (pagination.page < pagination.totalPages) return pagination.page + 1;
  return undefined;
}

function flattenProductsPages(pages: ApiSuccessResponsePaginated<Product>[] | undefined): Product[] {
  return pages?.flatMap(page => page.data) ?? [];
}
export const productsModel = {
  getNextPageParam,
  flattenProductsPages,
  getFilterParams,
  formToApi,
  formToUrl,
  urlToForm,
};
