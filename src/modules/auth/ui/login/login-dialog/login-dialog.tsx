import type { ReactNode } from 'react';
import { useGoTo } from '@kernel/index';
import { Dialog } from '@shared/components';
import { useState } from 'react';
import { LoginForm } from '../login-form';

interface LoginDialogProps {
  trigger: ReactNode;
}

export function LoginDialog({ trigger }: LoginDialogProps) {
  const { navigateToRegister } = useGoTo();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => { setOpen(false); };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
      }, 0);
    }
  };

  return (
    <Dialog
      title="Sign in"
      description="We are sure it will take you half a minute."
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <LoginForm
        onSuccess={handleSuccess}
        onCancel={() => { setOpen(false); }}
        onNavigateToRegister={navigateToRegister}
      />
    </Dialog>
  );
}
