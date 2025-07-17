import styles from './promo-code-input.module.scss';
import { Flex, TextField, Button, Card } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { useState } from 'react';

interface PromoCodeInputProps {
  promoCode?: string | null;
  applyPromo: (data: { promoCode: string | null }) => void;
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
}: PromoCodeInputProps) {
  const [input, setInput] = useState('');

  return (
    <Card className={styles.card} variant="surface">
      <Flex direction="column" gap="3">
        <TextField.Root className={styles.input}>
          <InputText
            placeholder="Promo code"
            value={input}
            onChange={e => { setInput(e.target.value); }}
            disabled={!!promoCode || applyPromoStatus === 'pending'}
          />
        </TextField.Root>
        <Flex gap="2">
          <Button
            color="amber"
            variant="soft"
            onClick={() => { applyPromo({ promoCode: input }); }}
            disabled={!!promoCode || !input || applyPromoStatus === 'pending'}
          >
            Apply
          </Button>
          <Button
            color="gray"
            variant="soft"
            onClick={removePromo}
            disabled={!promoCode || removePromoStatus === 'pending'}
          >
            Remove
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
