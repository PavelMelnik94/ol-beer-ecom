import type { ReactNode } from 'react';
import { Dialog as Modal, VisuallyHidden } from '@radix-ui/themes';

interface DialogProperties {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  maxWidth?: string;
}

export function Dialog({
  trigger,
  children,
  title,
  description,
  open,
  onOpenChange,
  maxWidth = '450px',
}: DialogProperties) {
  const fallbackDescription = 'Dialog window. Please read the content carefully.';

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Trigger>
        {trigger}
      </Modal.Trigger>
      <Modal.Content maxWidth={maxWidth}>
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
        {children}
      </Modal.Content>
    </Modal.Root>
  );
}
