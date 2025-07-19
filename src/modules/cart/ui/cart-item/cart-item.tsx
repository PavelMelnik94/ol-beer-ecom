import type { CartItem as CartItemType } from '@modules/cart/types';
import { Card, DataList, Flex, IconButton, Inset, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import clsx from 'clsx';
import { Flame, X } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import styles from './cart-item.module.scss';

interface Props {
  item: CartItemType;
  localQuantities: Record<string, number>;
  handleQuantityChange: (id: string, quantity: number, element?: HTMLInputElement) => void;
  removeItem: (data: { id: string; }) => void;
  removeItemStatus: string;
  updateItemStatus: string;
}

export function CartItem({ item, localQuantities, handleQuantityChange, removeItem, removeItemStatus, updateItemStatus }: Props) {
  const [localQuantity, setLocalQuantity] = useState(localQuantities[item.id] ?? item.quantity);

  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const isRemovePending = removeItemStatus === 'pending';
  const isUpdatePending = updateItemStatus === 'pending';
  const isProcessing = isRemovePending || isUpdatePending;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setLocalQuantity(newQuantity);
    handleQuantityChange(item.id, newQuantity, e.target);
  };

  return (
    <Card key={item.id} className={styles.item} data-item>
      <Flex justify="start" gap="6" className={styles.itemContent}>

        {/* 1 COL */}
        <Inset className={styles.inset} data-inset>
          <Image
            src={item.product.images[0]}
            alt={item.product.title}
            containerClassName={styles.image}
          />
        </Inset>

        {/* 2 COL */}
        <Flex direction="column" gap="4" flexGrow="1">
          <Flex direction="column" gap="2">
            <Text size="4" weight="bold" as="div">
              {item.product.title}
            </Text>

            <DataList.Root mt="3">

              <DataList.Item>
                <DataList.Label>IBU</DataList.Label>
                <DataList.Value>
                  {item.product.IBU}
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>ABV</DataList.Label>
                <DataList.Value>
                  {item.product.ABV}
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Country</DataList.Label>
                <DataList.Value>
                  {item.product.country}
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Rating</DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="1">
                    {item.product.averageRating.toFixed(1)}
                    {' '}
                    / 5
                    <Flame
                      size={16}
                      color="#ffd700"
                      fill={item.product.averageRating === 0 ? '#FFF' : '#ffd700'}
                      className={styles.ratingIcon}
                    />
                  </Flex>
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Price</DataList.Label>
                <DataList.Value>
                  {item.product.price}
                  $
                </DataList.Value>
              </DataList.Item>

            </DataList.Root>

          </Flex>

        </Flex>

      </Flex>

      {/* ABSOLUTES */}

      <Flex direction="row" gap="1" align="end" className={styles.quantitySection}>
        <Text size="2" color={isProcessing ? 'gray' : undefined} weight="medium" className={styles.quantityLabel}>
          Quantity:
        </Text>
        <input
          name="quantity"
          type="number"
          min={1}
          value={String(localQuantity)}
          className={clsx(styles.quantityInput, {
            [styles.disabledQuantity]: isProcessing,
          })}
          onChange={handleInputChange}
          disabled={isProcessing}
        />
      </Flex>
      <IconButton
        color="ruby"
        variant={isSmallScreen ? 'solid' : 'soft'}
        data-remove-button
        onClick={() => { removeItem({ id: item.id }); }}
        disabled={isProcessing}
        className={styles.removeButton}
      >
        <X size={16} />
      </IconButton>
    </Card>
  );
}
