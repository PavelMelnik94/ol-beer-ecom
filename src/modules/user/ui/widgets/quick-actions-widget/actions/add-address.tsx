import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSchema } from '@kernel/types';
import { Button, Flex } from '@radix-ui/themes';
import { Dialog, InputText } from '@shared/components';
import { useOnClickOutside } from '@shared/hooks';
import { Building, Building2, House, MailOpen } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = z.infer<typeof AddressSchema>;

export function AddAddressAction() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData> ({
    resolver: zodResolver(AddressSchema),
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
      title="Add new Address"
      onOpenChange={() => setIsOpen(true)}
      trigger={<Button style={{ width: '100%' }} variant="soft">Add Address</Button>}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputText
          {...register('city')}
          placeholder="City"
          error={errors.city?.message}
          icon={<Building size={16} />}
        />
        <InputText
          {...register('country')}
          placeholder="Country"
          error={errors.country?.message}
          icon={<Building2 size={16} />}
        />
        <InputText
          {...register('streetName')}
          placeholder="Street Name"
          error={errors.streetName?.message}
          icon={<House size={16} />}
        />
        <InputText
          {...register('zip')}
          placeholder="ZIP"
          error={errors.zip?.message}
          icon={<MailOpen size={16} />}
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
            Create
          </Button>
        </Flex>
      </form>
    </Dialog>
  );
}
