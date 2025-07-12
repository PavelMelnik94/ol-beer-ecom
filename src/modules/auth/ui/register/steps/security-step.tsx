import type { SecurityInfo } from '@modules/auth/stores/register-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { securitySchema } from '@modules/auth/model/schema';
import { Flex, Text } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { RegisterFooter } from '../register-footer/register-footer';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

interface SecurityStepProps {
  security: SecurityInfo;
  setSecurity: (data: Partial<SecurityInfo>) => void;
  onSubmit?: () => void;
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}

export const SecurityStep = memo(({ security, setSecurity, onSubmit, step, totalSteps, onClickBack }: SecurityStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityInfo>({
    resolver: zodResolver(securitySchema),
    defaultValues: security,
    mode: 'onChange',
  });

  const passwordError = errors.password?.message;
  const confirmPasswordError = errors.confirmPassword?.message;

  const handleFormSubmit = (data: SecurityInfo) => {
    setSecurity(data);
    if (onSubmit) onSubmit();
  };


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Text mb="2">Create a password</Text>
      <Flex direction="column" gap="2">
        <InputText {...register('password')} placeholder="Password" type="password" error={passwordError} />
        <InputText {...register('confirmPassword')} placeholder="Confirm Password" type="password" error={confirmPasswordError} />
      </Flex>
      <RegisterFooter
        step={step}
        totalSteps={totalSteps}
        onClickBack={onClickBack}
      />
    </form>
  );
});
