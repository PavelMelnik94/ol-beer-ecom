import type { FlexProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { Flex, Heading } from '@radix-ui/themes';
import { Image } from '@shared/components';

type Properties = {
  actionSlot?: ReactNode;
  entity?: string;
} & FlexProps;

export function NoData({ actionSlot, entity = 'Data', ...flexProperties }: Properties) {
  return (
    <Flex direction="column" gap="6" justify="center" align="center" {...flexProperties}>
      <Image
        width="70%"
        src="/illustrations/u_nodata.svg"
        alt="data is empty"
      />

      <Heading size="6" align="center">
        {entity}
        {' '}
        is empty
      </Heading>

      {actionSlot}

    </Flex>
  );
}
