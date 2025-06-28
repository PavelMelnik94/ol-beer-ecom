import { Table } from '@radix-ui/themes'
import { For } from '@shared/components'
import type { BreweryPreview } from '../../types'
import { BreweriesTableRow } from './breweries-table-row'

export function BreweriesTableBody({ breweries }: { breweries: BreweryPreview[] }) {
  return (
    <Table.Body>
      <For each={breweries}>
        {brewery => <BreweriesTableRow brewery={brewery} />}
      </For>
    </Table.Body>
  )
}
