import { useUiStore } from '@kernel/stores';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useOnClickOutside } from '@shared/hooks';
import { useRef } from 'react';

export function PromoCodeInfoDialog() {
  const showDialogs = useUiStore(s => s.shownDialogs);
  const setShownDialogs = useUiStore(s => s.setShownDialogs);

  const handleClockOkay = async () => {
    setShownDialogs('promoCodeInfo', 'shown');
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(wrapperRef, handleClockOkay);

  return (
    <AlertDialog.Root open={showDialogs.promoCodeInfo === 'needShow'} onOpenChange={handleClockOkay}>
      <AlertDialog.Content ref={wrapperRef} maxWidth="450px">
        <AlertDialog.Title>Promo codes available!</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Since you have registered and added your first item, you can now use promo codes!
          They are hidden somewhere on the site, just look for them and enjoy your discount 😉
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action onClick={handleClockOkay}>
            <Button variant="solid" color="green">
              Got it
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
