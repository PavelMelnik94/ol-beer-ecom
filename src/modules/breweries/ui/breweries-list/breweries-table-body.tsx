import type { Brewery } from '@kernel/types';
import { Table } from '@radix-ui/themes';
import { For } from '@shared/components';
import { BreweriesTableRow } from './breweries-table-row';

export function BreweriesTableBody({ breweries }: { breweries: Brewery[]; }) {
  return (
    <Table.Body>
      <For each={breweries}>
        {brewery => <BreweriesTableRow key={brewery.id} brewery={brewery} />}
      </For>
    </Table.Body>
  );
}
