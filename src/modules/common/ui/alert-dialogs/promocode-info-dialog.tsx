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

  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, handleClockOkay);

  return (
    <AlertDialog.Root open={showDialogs.promoCodeInfo === 'needShow'} onOpenChange={handleClockOkay}>
      <AlertDialog.Content ref={wrapperRef} maxWidth="450px">
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This application will no longer be accessible and any
          existing sessions will be expired.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action onClick={handleClockOkay}>
            <Button variant="solid" color="red">
              Revoke access
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
