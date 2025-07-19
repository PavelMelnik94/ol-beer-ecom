import type { SecurityInfo } from '@modules/auth/model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { securitySchema } from '@kernel/types';
import { Flex } from '@radix-ui/themes';
import { InputPassword } from '@shared/components';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFooter } from '../register-footer/register-footer';

interface SecurityStepProperties {
  security: SecurityInfo;
  setSecurity: (data: Partial<SecurityInfo>) => void;
  onSubmit?: (data?: SecurityInfo) => void;
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}

export const SecurityStep = memo(({ security, setSecurity, onSubmit, step, totalSteps, onClickBack }: SecurityStepProperties) => {
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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormSubmit = (data: SecurityInfo) => {
    setSecurity(data);
    if (onSubmit) {
      onSubmit(data);
      setIsSubmitting(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Flex direction="column" gap="2">
        <InputPassword
          {...register('password')}
          disabled={isSubmitting}
          placeholder="Password"
          error={passwordError}
        />
        <InputPassword
          {...register('confirmPassword')}
          disabled={isSubmitting}
          placeholder="Confirm Password"
          error={confirmPasswordError}
        />
      </Flex>
      <RegisterFooter
        isLockButtons={isSubmitting}
        step={step}
        totalSteps={totalSteps}
        onClickBack={onClickBack}
      />
    </form>
  );
});
