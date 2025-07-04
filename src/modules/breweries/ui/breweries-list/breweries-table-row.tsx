import type { Brewery } from '@kernel/types';
import { Link, Table } from '@radix-ui/themes';

export function BreweriesTableRow({ brewery }: { brewery: Brewery; }) {
  return (
    <Table.Row key={brewery.id}>
      <Table.RowHeaderCell>{brewery.name}</Table.RowHeaderCell>
      <Table.Cell>{brewery.location}</Table.Cell>
      <Table.Cell align="center">
        <Link
          onClick={() => window.open(
            brewery.website ?? 'https://website.com/',
            '_blank',
            'noopener noreferrer',
          )}
          underline="always"
          className="pointer"
        >
          {brewery.website ?? 'www.website.com'}
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}
