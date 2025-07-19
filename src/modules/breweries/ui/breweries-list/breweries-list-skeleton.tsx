import { Flex, Skeleton, Table } from '@radix-ui/themes';

const SKELETON_ROWS = 8;

export function BreweriesListSkeleton() {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell align="center" justify="start">
            <Skeleton width="60px" height="20px" />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align="center" justify="start">
            <Skeleton width="80px" height="20px" />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align="center">
            <Skeleton width="70px" height="20px" />
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>
              <Skeleton width="100px" height="16px" />
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton width="90px" height="16px" />
            </Table.Cell>
            <Table.Cell>
              <Flex align="center" justify="center">
                <Skeleton width="80px" height="16px" />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
