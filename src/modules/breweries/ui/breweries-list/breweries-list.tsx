import { useBreweriesList } from '@modules/breweries/hooks/use-breweries-list';
import { useBreweriesSearch } from '@modules/breweries/hooks/use-breweries-search';
import { Table } from '@radix-ui/themes';
import { BreweriesListSkeleton } from './breweries-list-skeleton';
import { BreweriesTableBody } from './breweries-table-body';
import { BreweriesTableHead } from './breweries-table-head';

export function BreweriesList() {
  const { breweriesList, isLoading } = useBreweriesList();
  const { breweriesFiltered = [], ...theadProps } = useBreweriesSearch();

  if (isLoading) return <BreweriesListSkeleton />;

  // user interaction
  const breweries = breweriesFiltered.length > 0 ? breweriesFiltered : breweriesList;
  return (
    <Table.Root variant="surface">
      <BreweriesTableHead {...theadProps} />
      <BreweriesTableBody breweries={breweries} />
    </Table.Root>
  );
}
