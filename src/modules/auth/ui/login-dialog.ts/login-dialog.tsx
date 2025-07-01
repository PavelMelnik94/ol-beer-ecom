import { type ReactNode, useState } from 'react';
import { Dialog } from '@shared/components';
import { useGoTo } from '@kernel/index';
import { LoginForm } from './../login-form';

interface LoginDialogProps {
  trigger: ReactNode;
}

export function LoginDialog({ trigger }: LoginDialogProps) {
  const { navigateToRegister } = useGoTo();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => setOpen(false);

  return (
    <Dialog
      title="Sign in"
      description="We are sure it will take you half a minute."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      <LoginForm
        onSuccess={handleSuccess}
        onNavigateToRegister={navigateToRegister}
      />
    </Dialog>
  );
}
