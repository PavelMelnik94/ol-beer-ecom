import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@kernel/types';
import { Widget } from '@modules/user/ui/widget/widget';
import { Button, Flex } from '@radix-ui/themes';
import { Dialog, InputText } from '@shared/components';
import { Mailbox, Signature } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useUserStore } from '@modules/user/stores/user-store';
import { useOnClickOutside } from '@shared/hooks';

export function QuickActionsWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const profile = useUserStore(s => s.profile)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <z.infer<typeof personalInfoSchema>> ({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email
    },
    mode: 'onChange',
  });

  const handleFormSubmit = (data: z.infer<typeof personalInfoSchema>,
  ) => {
    console.log('wqeqwe', data);
  };

  const firstNameError = errors.firstName?.message;
  const lastNameError = errors.lastName?.message;
  const emailError = errors.email?.message;

  const formRef = useRef(null)
  useOnClickOutside(formRef, () => setIsOpen(false))

  return (
    <Widget title="Quick Actions">
      <Flex direction="column" gap="2" mt="3">

        <Dialog
          open={isOpen}
          title="Change Personal Information"
          onOpenChange={() => setIsOpen(true)}
          trigger={<Button style={{ width: '100%' }} variant="soft">Edit Profile</Button>}
        >
          <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
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
                Update
              </Button>
            </Flex>
          </form>
        </Dialog>

        <Dialog
          trigger={<Button style={{ width: '100%' }} variant="soft">Add Address</Button>}
        >
          qweweq
        </Dialog>

        <Dialog
          trigger={<Button style={{ width: '100%' }} variant="soft">Security Settings</Button>}
        >
          qweweq
        </Dialog>

      </Flex>

    </Widget>
  );
}
