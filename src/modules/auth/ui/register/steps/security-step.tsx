import type { SecurityInfo } from '@modules/auth/stores/register-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { securitySchema } from '@modules/auth/model/schema';
import { Button, Flex, Text } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

interface SecurityStepProps {
  security: SecurityInfo;
  setSecurity: (data: Partial<SecurityInfo>) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export const SecurityStep = memo(({ security, setSecurity, onPrev, onSubmit }: SecurityStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityInfo>({
    resolver: zodResolver(securitySchema),
    defaultValues: security,
    mode: 'onChange',
  });

  const handleFormSubmit = (data: SecurityInfo) => {
    setSecurity(data);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Text mb="2">Create a password</Text>
      <Flex direction="column" gap="2">
        <InputText {...register('password')} placeholder="Password" type="password" />
        {errors.password && <span>{errors.password.message}</span>}
        <InputText {...register('confirmPassword')} placeholder="Confirm Password" type="password" />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </Flex>
      <Flex justify="between" mt="4">
        <Button variant="soft" type="button" onClick={onPrev}>Back</Button>
        <Button type="submit">Register</Button>
      </Flex>
    </form>
  );
});
