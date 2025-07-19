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

function urlToForm(urlParameters: FiltersUrl): FiltersForm {
  return {
    search: urlParameters.search || '',
    categoryIds: Array.isArray(urlParameters.categoryIds)
      ? urlParameters.categoryIds
      : (urlParameters.categoryIds
          ? [urlParameters.categoryIds]
          : []),
    breweryId: urlParameters.breweryId || '',
    minPrice: urlParameters.minPrice ? Number(urlParameters.minPrice) : undefined,
    maxPrice: urlParameters.maxPrice ? Number(urlParameters.maxPrice) : undefined,
  };
}

function formToUrl(formData: FiltersForm): FiltersUrl {
  const result: FiltersUrl = {};

  if (formData.search?.trim()) {
    result.search = formData.search.trim();
  }

  if (formData.categoryIds && formData.categoryIds.length > 0) {
    result.categoryIds = formData.categoryIds;
  }

  if (formData.breweryId?.trim()) {
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

function formToApi(formData: FiltersForm): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (formData.search?.trim()) {
    result.search = formData.search.trim();
  }

  if (formData.categoryIds && formData.categoryIds.length > 0) {
    result.categoryIds = formData.categoryIds;
  }

  if (formData.breweryId?.trim()) {
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

function getFilterParameters(filterParameters: Filters): string {
  const parameters = filtersSchema.parse(filterParameters);

  if (!parameters || Object.keys(parameters).length === 0) return '';

  const searchParameters = new URLSearchParams();

  if (parameters.categoryIds) {
    if (Array.isArray(parameters.categoryIds)) {
      for (const id of parameters.categoryIds) {
        searchParameters.append('categoryIds', id);
      }
    }
    else {
      searchParameters.append('categoryIds', parameters.categoryIds);
    }
  }
  if (parameters.breweryId) searchParameters.append('breweryId', parameters.breweryId);
  if (parameters.minPrice !== undefined) searchParameters.append('minPrice', parameters.minPrice.toString());
  if (parameters.maxPrice !== undefined) searchParameters.append('maxPrice', parameters.maxPrice.toString());
  if (parameters.search) searchParameters.append('search', parameters.search);

  return searchParameters.toString();
}

function getNextPageParameter(lastPage: ApiSuccessResponsePaginated<Product>) {
  const { pagination } = lastPage;
  if (!pagination) return;
  if (pagination.page < pagination.totalPages) return pagination.page + 1;
}

function flattenProductsPages(pages: ApiSuccessResponsePaginated<Product>[] | undefined): Product[] {
  return pages?.flatMap(page => page.data) ?? [];
}
export const productsModel = {
  getNextPageParam: getNextPageParameter,
  flattenProductsPages,
  getFilterParams: getFilterParameters,
  formToApi,
  formToUrl,
  urlToForm,
};
