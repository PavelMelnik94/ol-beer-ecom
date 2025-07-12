import type { SecurityInfo } from '@modules/auth/model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { securitySchema } from '@modules/auth/model/schema';
import { Flex } from '@radix-ui/themes';
import { InputPassword } from '@shared/components';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFooter } from '../register-footer/register-footer';

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurity({ password: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurity({ confirmPassword: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Flex direction="column" gap="2">
        <InputPassword
          {...register('password')}
          placeholder="Password"
          error={passwordError}
          onChange={handlePasswordChange}
        />
        <InputPassword
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          error={confirmPasswordError}
          onChange={handleConfirmPasswordChange}
        />
      </Flex>
      <RegisterFooter
        step={step}
        totalSteps={totalSteps}
        onClickBack={onClickBack}
      />
    </form>
  );
});
