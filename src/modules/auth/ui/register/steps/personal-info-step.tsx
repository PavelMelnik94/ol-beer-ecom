import type { PersonalInfo } from '@modules/auth/stores/register-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@modules/auth/model/schema';
import { InputText } from '@shared/components';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFooter } from '../register-footer/register-footer';

interface PersonalInfoStepProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: (data: Partial<PersonalInfo>) => void;
  onSubmit?: () => void;
  step: number;
  totalSteps: number;
  onClickBack: () => void;
  onClickNext: () => void;
}

export const PersonalInfoStep = memo(
  ({ personalInfo, setPersonalInfo, onSubmit, step, totalSteps, onClickBack, onClickNext }: PersonalInfoStepProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<PersonalInfo>({
      resolver: zodResolver(personalInfoSchema),
      defaultValues: personalInfo,
      mode: 'onChange',
    });

    const handleFormSubmit = (data: PersonalInfo) => {
      setPersonalInfo(data);
      if (onSubmit) onSubmit();
    };

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputText {...register('firstName')} placeholder="First Name" error={errors.firstName?.message} />
        <InputText {...register('lastName')} placeholder="Last Name" error={errors.lastName?.message} />
        <InputText {...register('email')} placeholder="Email" type="email" error={errors.email?.message} />
        <RegisterFooter
          step={step}
          totalSteps={totalSteps}
          onClickBack={onClickBack}
          onClickNext={onClickNext}
        />
      </form>
    );
  },
);
