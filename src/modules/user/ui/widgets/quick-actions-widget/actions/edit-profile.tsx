import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@kernel/types';
import { useUpdateProfile } from '@modules/user/hooks';
import { Button, Flex } from '@radix-ui/themes';
import { Dialog, InputText } from '@shared/components';
import { useOnClickOutside } from '@shared/hooks';
import { Mailbox, Signature } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = z.infer<typeof personalInfoSchema>;

interface Properties {
  initialState: FormData;
}
export function EditProfileAction({ initialState }: Properties) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData> ({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: initialState?.firstName,
      lastName: initialState?.lastName,
      email: initialState?.email,
    },
    mode: 'onSubmit',
  });

  const mutation = useUpdateProfile();

  const handleFormSubmit = async (data: FormData,
  ) => {
    const editProfileResult = await mutation.mutateAsync(data);

    if (editProfileResult.success) {
      reset({
        firstName: editProfileResult.data.firstName,
        lastName: editProfileResult.data.lastName,
        email: editProfileResult.data.email,
      });
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const formReference = useRef(null);
  useOnClickOutside(formReference, handleClose);

  return (
    <Dialog
      open={isOpen}
      title="Update Personal Information"
      onOpenChange={() => { setIsOpen(true); }}
      trigger={<Button style={{ width: '100%' }} variant="soft">Edit Profile</Button>}
    >
      <form ref={formReference} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputText
          {...register('firstName')}
          placeholder="First Name"
          error={errors.firstName?.message}
          icon={<Signature size="16px" />}
          disabled={mutation.isPending}
        />
        <InputText
          {...register('lastName')}
          placeholder="Last Name"
          error={errors.lastName?.message}
          icon={<Signature size="16px" />}
          disabled={mutation.isPending}
        />
        <InputText
          {...register('email')}
          placeholder="Email"
          type="email"
          error={errors.email?.message}
          icon={<Mailbox size="16px" />}
          disabled={mutation.isPending}

        />

        <Flex justify="end" align="center" gap="3">
          <Button
            size="1"
            variant="soft"
            color="gray"
            type="button"
            disabled={mutation.isPending}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="1"
            variant="soft"
            type="submit"
            disabled={mutation.isPending}
            loading={mutation.isPending}
          >
            Update
          </Button>
        </Flex>
      </form>
    </Dialog>
  );
}
