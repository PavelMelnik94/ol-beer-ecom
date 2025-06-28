import { Flex, Table, TextField } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { Search } from 'lucide-react';

interface Props {
  showBreweriesInput: boolean;
  showLocationsInput: boolean;
  searchValue: string;
  isSearchLayout: boolean;
  refs: {
    brewery: React.RefObject<HTMLInputElement>;
    location: React.RefObject<HTMLInputElement>;
  };
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleBrewerySearch: () => void;
  toggleLocationSearch: () => void;
}
export function BreweriesTableHead({ showBreweriesInput, isSearchLayout, showLocationsInput, searchValue, refs, handleSearch, toggleBrewerySearch, toggleLocationSearch }: Props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell className="pointer" align="center">
          <Show
            when={showBreweriesInput && isSearchLayout}
            fallback={(
              <Flex
                direction="row"
                align="center"
                gap="2"
                height="100%"
                onClick={toggleBrewerySearch}
              >
                Brewery
                {isSearchLayout && <Search size={16} color="gray" />}
              </Flex>
            )}
          >
            <TextField.Root
              onChange={handleSearch}
              value={searchValue}
              ref={refs.brewery}
              variant="soft"
              placeholder="Search the brewery…"
            />
          </Show>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="pointer" align="center">
          <Show
            when={showLocationsInput && isSearchLayout}
            fallback={(
              <Flex
                direction="row"
                align="center"
                gap="2"
                height="100%"
                onClick={toggleLocationSearch}
              >
                Location
                {isSearchLayout && <Search size={16} color="gray" />}
              </Flex>
            )}
          >
            <TextField.Root
              onChange={handleSearch}
              value={searchValue}
              ref={refs.location}
              variant="soft"
              placeholder="Search the location…"
            />
          </Show>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell align="center" justify="center">
          Website
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  )
}
