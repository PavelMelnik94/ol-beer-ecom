import { Text } from '@radix-ui/themes';

export function BreweryDescription({
  brewerytitle,
  brewerydescription,
}: {
  brewerytitle: string;
  brewerydescription: string;

}) {
  return (
    <>
      <Text size="3" as="div">
        {brewerytitle}
      </Text>
      <Text size="2" color="gray">
        {brewerydescription}
      </Text>
    </>
  );
}
