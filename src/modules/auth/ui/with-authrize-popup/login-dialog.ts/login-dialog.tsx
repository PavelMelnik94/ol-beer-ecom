import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyRound, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, ErrorAlert, Image, InputPassword, InputText, Show } from '@shared/components';
import { useAuth } from '@modules/auth/hooks/use-auth';
import { Flex, Text } from '@radix-ui/themes';
import { useGoTo } from '@kernel/index';
import { toast } from 'sonner';
import type { LoginFormValues } from './../../../model/types';
import { LoginSchema } from './../../../model/schema';

interface LoginDialogProps {
  trigger: ReactNode;
}

export function LoginDialog({ trigger }: LoginDialogProps) {
  const { navigateToRegister } = useGoTo()

  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
  });

  const { login, isLoading, isError } = useAuth();

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const onSubmit = async (data: LoginFormValues) => {
    const res = await login(data);
    if (res?.success) {
      setOpen(false);
      handleClose()
      toast.success(`Welcome back, ${res.data.firstName}`)
    }
    return true;
  };

  const isFormDisabled = isSubmitting || isLoading;

  return (
    <Dialog
      title="Sign in"
      description="We are sure it will take you half a minute."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      closeLabel="Cancel"
      confirmLabel={isFormDisabled ? 'Loading...' : 'Sign in'}
      isFormDisabled={isFormDisabled}
    >
      <InputText
        placeholder="Email"
        type="email"
        icon={<Mail height={16} width={16} />}
        error={errors.email?.message}
        {...register('email')}
      />
      <InputPassword
        placeholder="Password"
        icon={<KeyRound height={16} width={16} />}
        error={errors.password?.message}
        {...register('password')}
      />
      <Image
        src="/illustrations/u_login.svg"
        alt="have a fun"
      />

      <Flex mt="2" align="center" justify="center" gap="1">
        <Text size="2">
          Not registered yet?
        </Text>
        <Text size="2" color="bronze" className="pointer" weight="bold" onClick={navigateToRegister}>Go ahead!</Text>
      </Flex>

      <Show when={isError}>
        <ErrorAlert>
          User with such email or password does not exist
        </ErrorAlert>
      </Show>

    </Dialog>
  );
}
