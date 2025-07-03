import type { ApiSuccessResponsePaginated } from '@kernel/index';
import type { BreweryPreview } from '../types';

export const breweriesModel = {
  flattenBreweriesPages(pages: ApiSuccessResponsePaginated<BreweryPreview>[] | undefined): BreweryPreview[] {
    return pages?.flatMap(page => page.data) ?? [];
  },

  filterByName(breweries: BreweryPreview[], search: string): BreweryPreview[] {
    if (!search) return breweries;
    return breweries.filter(brewery =>
      brewery.name.toLowerCase().includes(search.toLowerCase()),
    )
  },

  filterByLocation(breweries: BreweryPreview[], search: string): BreweryPreview[] {
    if (!search) return breweries;
    return breweries.filter(brewery =>
      brewery.location.toLowerCase().includes(search.toLowerCase()),
    );
  },
};
