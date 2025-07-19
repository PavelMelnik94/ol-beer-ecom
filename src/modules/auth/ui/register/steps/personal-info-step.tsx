import type { PersonalInfo } from '@modules/auth/model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@kernel/types';
import { InputText } from '@shared/components';
import { Mailbox, Signature } from 'lucide-react';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFooter } from '../register-footer/register-footer';

interface PersonalInfoStepProperties {
  personalInfo: PersonalInfo;
  setPersonalInfo: (data: Partial<PersonalInfo>) => void;
  onSubmit?: () => void;
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}

export const PersonalInfoStep = memo(
  ({ personalInfo, setPersonalInfo, onSubmit, step, totalSteps, onClickBack }: PersonalInfoStepProperties) => {
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

    const firstNameError = errors.firstName?.message;
    const lastNameError = errors.lastName?.message;
    const emailError = errors.email?.message;

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputText
          {...register('firstName')}
          placeholder="First Name"
          error={firstNameError}
          icon={<Signature size="16px" />}
        />
        <InputText
          {...register('lastName')}
          placeholder="Last Name"
          error={lastNameError}
          icon={<Signature size="16px" />}
        />
        <InputText
          {...register('email')}
          placeholder="Email"
          type="email"
          error={emailError}
          icon={<Mailbox size="16px" />}

        />
        <RegisterFooter
          step={step}
          totalSteps={totalSteps}
          onClickBack={onClickBack}
        />
      </form>
    );
  },
);
