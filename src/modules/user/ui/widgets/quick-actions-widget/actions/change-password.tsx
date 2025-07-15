import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@kernel/types';
import { Button, Flex } from '@radix-ui/themes';
import { Dialog, InputPassword } from '@shared/components';
import { useOnClickOutside } from '@shared/hooks';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordAction() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData> ({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const handleFormSubmit = (data: FormData,
  ) => {
    console.log('wqeqwe', data);
  };

  const handleClickOutside = () => {
    reset();
    setIsOpen(false);
  };

  const formRef = useRef(null);
  useOnClickOutside(formRef, handleClickOutside);

  return (
    <Dialog
      open={isOpen}
      title="Update Security Information"
      onOpenChange={() => setIsOpen(true)}
      trigger={<Button style={{ width: '100%' }} variant="soft">Edit Password</Button>}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputPassword
          {...register('currentPassword')}
          placeholder="Current Password"
          error={errors.currentPassword?.message}
        />
        <InputPassword
          {...register('newPassword')}
          placeholder="New Password"
          error={errors.newPassword?.message}
        />
        <InputPassword
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
        />

        <Flex justify="end" align="center" gap="3">
          <Button
            size="1"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="1"
            variant="soft"
            type="submit"
          >
            Change
          </Button>
        </Flex>
      </form>
    </Dialog>
  );
}
