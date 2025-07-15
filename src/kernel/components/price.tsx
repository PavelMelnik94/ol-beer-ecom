import { getOffPercent } from '@kernel/utils';
import { Flex, Strong, Text, Tooltip } from '@radix-ui/themes';

export function Price({ price, discount }: { price: number; discount?: number | undefined; }) {
  const offPercent = discount ? getOffPercent(price, discount) : 0;
  return discount
    ? (
        <Tooltip content={`You save ${offPercent}%`}>
          <Flex direction="row" gap="2" align="center">
            <Strong>
              $
              {discount?.toFixed(2)}
            </Strong>
            <Text as="span" style={{ textDecoration: 'line-through' }}>
              $
              {price?.toFixed(2)}
            </Text>
          </Flex>
        </Tooltip>
      )
    : (
        <>
          $
          {price?.toFixed(2)}
        </>
      );
}
