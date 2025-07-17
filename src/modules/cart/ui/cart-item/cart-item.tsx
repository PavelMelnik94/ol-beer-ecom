import type { CartItem as CartItemType } from '@modules/cart/types';
import { Card, DataList, Flex, IconButton, Inset, Text } from '@radix-ui/themes';
import { Image, InputText } from '@shared/components';
import { Flame, X } from 'lucide-react';
import styles from './cart-item.module.scss';

interface Props {
  item: CartItemType;
  localQuantities: Record<string, number>;
  handleQuantityChange: (id: string, quantity: number) => void;
  removeItem: (data: { id: string; }) => void;
  removeItemStatus: string;
}

export function CartItem({ item, localQuantities, handleQuantityChange, removeItem, removeItemStatus }: Props) {
  return (
    <Card key={item.id} className={styles.item} data-item>
      <Flex justify="start" gap="6"  className={styles.itemContent}>

        {/* 1 COL */}
        <Inset className={styles.inset} data-inset>
          <Image
            src={item.product.images[0]}
            alt={item.product.title}
            containerClassName={styles.image}
            // sizeMode="background"
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

        <Flex direction="row" gap="1" align={'end'} className={styles.quantitySection}>
          <Text size="2" weight="medium" className={styles.quantityLabel}>
            Quantity:
          </Text>
          <input
          name="quantity"
          type="number"
          min={1}
          value={String(localQuantities[item.id] ?? item.quantity)}
          className={styles.quantityInput}
          onChange={e => handleQuantityChange(item.id, Number((e.target).value))}
          disabled={removeItemStatus === 'pending'}
        />
        </Flex>
        <IconButton
          color="red"
          variant="solid"
          data-remove-button
          onClick={() => { removeItem({ id: item.id }); }}
          disabled={removeItemStatus === 'pending'}
          className={styles.removeButton}
        >
          <X size={16} />
        </IconButton>
    </Card>
  );
}
