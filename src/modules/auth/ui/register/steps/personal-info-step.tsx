import type { PersonalInfo } from '@modules/auth/stores/register-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@modules/auth/model/schema';
import { Button } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  personalInfo: PersonalInfo;
  setPersonalInfo: (data: Partial<PersonalInfo>) => void;
  onNext: () => void;
}

export const PersonalInfoStep = memo(({ personalInfo, setPersonalInfo, onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: 'onChange',
  });

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText {...register('firstName')} placeholder="First Name" />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <InputText {...register('lastName')} placeholder="Last Name" />
      {errors.lastName && <span>{errors.lastName.message}</span>}
      <InputText {...register('email')} placeholder="Email" type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      <Button type="submit">Next</Button>
    </form>
  );
});
