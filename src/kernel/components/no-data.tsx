import type { FlexProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { Flex, Heading } from '@radix-ui/themes';
import { Image } from '@shared/components';

type Props = {
  actionSlot?: ReactNode;
} & FlexProps;

export function NoData({ actionSlot, ...flexProps }: Props) {
  return (
    <Flex direction="column" gap="6" justify="center" align="center" {...flexProps}>
      <Image
        width="70%"
        src="/illustrations/u_nodata.svg"
        alt="data is empty"
      />

      <Heading size="6" align="center">Data is empty.</Heading>

      {actionSlot}

    </Flex>
  );
}
