import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSchema } from '@kernel/types';
import { useCreateAddress, useUpdateAddress } from '@modules/user/hooks';
import { createAddressSchema } from '@modules/user/model';
import { Button, Flex, IconButton, RadioGroup } from '@radix-ui/themes';
import { Dialog, InputText } from '@shared/components';
import { useOnClickOutside } from '@shared/hooks';
import { Building, Building2, House, MailOpen, PencilLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = z.infer<typeof AddressSchema>;

export function UpdateAddressDialog({ initialState }: { initialState?: FormData; }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData> ({
    resolver: zodResolver(AddressSchema),
    defaultValues: initialState,
    mode: 'onChange',
  });

  const mutation = useUpdateAddress();

  const handleFormSubmit = async (data: FormData,
  ) => {
    const res = await mutation.mutateAsync({ id: initialState?.id || '', data });
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
      title="Update Address Information"
      onOpenChange={() => setIsOpen(true)}
      trigger={(
        <IconButton variant="ghost" size="2" color="blue" aria-label="Edit address">
          <PencilLine size={16} />
        </IconButton>
      )}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputText
          {...register('city')}
          placeholder="City"
          error={errors.city?.message}
          icon={<Building size={16} />}
          disabled={mutation.isPending}
        />
        <InputText
          {...register('country')}
          placeholder="Country"
          error={errors.country?.message}
          icon={<Building2 size={16} />}
          disabled={mutation.isPending}
        />
        <InputText
          {...register('streetName')}
          placeholder="Street Name"
          error={errors.streetName?.message}
          icon={<House size={16} />}
          disabled={mutation.isPending}
        />
        <InputText
          {...register('zip')}
          placeholder="ZIP"
          error={errors.zip?.message}
          icon={<MailOpen size={16} />}
          disabled={mutation.isPending}
        />

        <Controller
          name="type"
          control={control}
          defaultValue="shipping"
          render={({ field }) => (
            <RadioGroup.Root
              size="1"
              value={field.value}
              onValueChange={field.onChange}
              disabled={mutation.isPending}
            >
              <RadioGroup.Item value="shipping">Shipping</RadioGroup.Item>
              <RadioGroup.Item value="billing">Billing</RadioGroup.Item>
            </RadioGroup.Root>
          )}
        />

        <Flex justify="end" align="center" gap="3">
          <Button
            size="1"
            variant="soft"
            color="gray"
            disabled={mutation.isPending}
            onClick={handleClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            loading={mutation.isPending}
            size="1"
            color="blue"
            variant="soft"
            type="submit"
          >
            Update
          </Button>
        </Flex>
      </form>
    </Dialog>
  );
}
