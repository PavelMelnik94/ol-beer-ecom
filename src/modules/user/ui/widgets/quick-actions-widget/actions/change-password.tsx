import type { ChangePasswordPayload } from '@modules/user/api';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@kernel/types';
import { useChangePassword } from '@modules/user/hooks/use-change-password';
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

  const mutation = useChangePassword();

  const handleFormSubmit = async (data: FormData,
  ) => {
    const payload: ChangePasswordPayload = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    const res = await mutation.mutateAsync(payload);

    if (res.success) {
      reset();
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const formRef = useRef(null);
  useOnClickOutside(formRef, handleClose);

  return (
    <Dialog
      open={isOpen}
      title="Update Security Information"
      onOpenChange={() => { setIsOpen(true); }}
      trigger={<Button style={{ width: '100%' }} variant="soft">Change Password</Button>}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputPassword
          {...register('currentPassword')}
          placeholder="Current Password"
          error={errors.currentPassword?.message}
          disabled={mutation.isPending}
        />
        <InputPassword
          {...register('newPassword')}
          placeholder="New Password"
          error={errors.newPassword?.message}
          disabled={mutation.isPending}
        />
        <InputPassword
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
          disabled={mutation.isPending}
        />

        <Flex justify="end" align="center" gap="3">
          <Button
            disabled={mutation.isPending}
            variant="soft"
            color="gray"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            loading={mutation.isPending}
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
