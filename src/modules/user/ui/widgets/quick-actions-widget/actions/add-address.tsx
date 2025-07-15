import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAddress } from '@modules/user/hooks';
import { createAddressSchema } from '@modules/user/model';
import { Button, Flex, RadioGroup } from '@radix-ui/themes';
import { Dialog, InputText } from '@shared/components';
import { useOnClickOutside } from '@shared/hooks';
import { Building, Building2, House, MailOpen } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = z.infer<typeof createAddressSchema>;

export function AddAddressAction() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData> ({
    resolver: zodResolver(createAddressSchema),
    mode: 'onChange',
  });

  const mutation = useCreateAddress();

  const handleFormSubmit = async (data: FormData,
  ) => {
    const res = await mutation.mutateAsync({ ...data });
    if (res.success) {
      reset();
      setIsOpen(false);
    }
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
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => setIsOpen(false)}
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
            Create
          </Button>
        </Flex>
      </form>
    </Dialog>
  );
}
