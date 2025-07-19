import { Button, Card, Flex, Text } from '@radix-ui/themes';
import { InputText, Show } from '@shared/components';
import { useState } from 'react';
import styles from './promo-code-input.module.scss';

interface PromoCodeInputProperties {
  promoCode?: string | null;
  applyPromo: (data: { promoCode: string | null; }) => void;
  applyPromoStatus: string;
  removePromo: () => void;
  removePromoStatus: string;
}

export function PromoCodeInput({
  promoCode,
  applyPromo,
  applyPromoStatus,
  removePromo,
  removePromoStatus,
}: PromoCodeInputProperties) {
  const [input, setInput] = useState('');

  return (
    <Card className={styles.card} data-wrapper>

      <Flex direction="column">
        <Text size="3" weight="bold" mb="4">
          Promo code
        </Text>

        <InputText
          placeholder="code"
          value={promoCode ?? input}
          onChange={(event) => { setInput(event.target.value); }}
          disabled={!!promoCode || applyPromoStatus === 'pending'}
        />
        <Flex gap="2">
          <Button
            size="1"
            color="green"
            variant="soft"
            onClick={() => { applyPromo({ promoCode: input }); }}
            disabled={!!promoCode || !input || applyPromoStatus === 'pending'}
          >
            Apply
          </Button>

          <Show when={promoCode && applyPromoStatus !== 'pending' && applyPromoStatus !== 'error'}>
            <Button
              size="1"
              color="ruby"
              variant="soft"
              onClick={removePromo}
              disabled={removePromoStatus === 'pending'}
            >
              Remove
            </Button>
          </Show>
        </Flex>
      </Flex>
    </Card>
  );
}
