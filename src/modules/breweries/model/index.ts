import type { ApiSuccessResponsePaginated, Brewery } from '@kernel/index';

export const breweriesModel = {
  flattenBreweriesPages(pages: ApiSuccessResponsePaginated<Brewery>[] | undefined): Brewery[] {
    return pages?.flatMap(page => page.data) ?? [];
  },

  filterByName(breweries: Brewery[], search: string): Brewery[] {
    if (!search) return breweries;
    return breweries.filter(brewery =>
      brewery.name.toLowerCase().includes(search.toLowerCase()),
    );
  },

  filterByLocation(breweries: Brewery[], search: string): Brewery[] {
    if (!search) return breweries;
    return breweries.filter(brewery =>
      brewery.location.toLowerCase().includes(search.toLowerCase()),
    );
  },
};
