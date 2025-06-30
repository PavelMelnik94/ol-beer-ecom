import { Button, Flex, Dialog as Modal, VisuallyHidden } from '@radix-ui/themes';
import type { FormEventHandler, ReactNode } from 'react';

interface DialogProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
  closeLabel?: string;
  confirmLabel?: string;
  onClose?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isFormDisabled?: boolean;
}

export function Dialog({
  trigger,
  children,
  title,
  description,
  closeLabel = 'Cancel',
  confirmLabel = 'Save',
  onClose,
  onSubmit,
  open,
  onOpenChange,
  isFormDisabled,
}: DialogProps) {
  const fallbackDescription = 'Dialog window. Please read the content carefully.';

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Trigger>
        {trigger}
      </Modal.Trigger>
      <Modal.Content maxWidth="450px">
        {title && <Modal.Title mb={description ? '2' : '4'}>{title}</Modal.Title>}
        {description
          ? (
              <Modal.Description size="2" mb="4">{description}</Modal.Description>
            )
          : (
              <VisuallyHidden>
                <Modal.Description size="2" mb="4">
                  {fallbackDescription}
                </Modal.Description>
              </VisuallyHidden>
            )}
        <form onSubmit={onSubmit}>
          <fieldset disabled={isFormDisabled}>
            {children}
          </fieldset>
          {(closeLabel || confirmLabel) && (
            <Flex gap="3" mt="4" justify="end">
              {closeLabel && (
                <Modal.Close>
                  <Button
                    variant="soft"
                    color="gray"
                    type="button"
                    onClick={onClose}
                    disabled={isFormDisabled}
                  >
                    {closeLabel}
                  </Button>
                </Modal.Close>
              )}
              {confirmLabel && (
                <Button type="submit" disabled={isFormDisabled}>{confirmLabel}</Button>
              )}
            </Flex>
          )}
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
