import { useBreweriesList } from '@modules/breweries/hooks/use-breweries-list'
import { useBreweriesSearch } from '@modules/breweries/hooks/use-breweries-search'
import { Table } from '@radix-ui/themes'
import { BreweriesListSkeleton } from './breweries-list-skeleton'
import { BreweriesTableHead } from './breweries-table-head'
import { BreweriesTableBody } from './breweries-table-body'

export function BreweriesList() {
  const { breweriesList, isLoading } = useBreweriesList()
  const { breweries = [], ...theadProps } = useBreweriesSearch({ breweriesList: breweriesList ?? [] })

  if (isLoading) return <BreweriesListSkeleton />

  return (
    <Table.Root variant="surface">
      <BreweriesTableHead {...theadProps} />
      <BreweriesTableBody breweries={breweries} />
    </Table.Root>
  )
}
