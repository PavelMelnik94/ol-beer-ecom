import type { LoginFormValues } from '@modules/auth/model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@kernel/index';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { ErrorAlert, Image, InputPassword, InputText, Show } from '@shared/components';
import { KeyRound, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../../model/schema';

interface LoginFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  onNavigateToRegister?: () => void;
}

export function LoginForm({ onSuccess, onCancel, onNavigateToRegister }: LoginFormProps) {
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

  const onSubmit = async (data: LoginFormValues) => {
    const res = await login(data);
    if (res?.success) {
      resetForm();
      onSuccess?.();
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  const isFormDisabled = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        lazy
        skeletonStyle={{ width: '100%', height: 'auto' }}
      />

      <Flex mt="2" align="center" justify="center" gap="1">
        <Text size="2">Not registered yet?</Text>
        <Text
          size="2"
          color="bronze"
          className="pointer"
          weight="bold"
          onClick={onNavigateToRegister}
        >
          Go ahead!
        </Text>
      </Flex>

      <Show when={isError}>
        <Box mt="2">
          <ErrorAlert>
            User with such email or password does not exist
          </ErrorAlert>
        </Box>
      </Show>

      <Flex gap="3" mt="4" justify="end">
        <Button
          variant="soft"
          color="gray"
          type="button"
          onClick={handleCancel}
          disabled={isFormDisabled}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isFormDisabled} loading={isFormDisabled}>
          {isFormDisabled ? 'Loading...' : 'Sign in'}
        </Button>
      </Flex>
    </form>
  );
}
