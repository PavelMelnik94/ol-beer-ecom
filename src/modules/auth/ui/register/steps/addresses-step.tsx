import type { Address } from '@modules/auth/stores/register-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressesSchema } from '@modules/auth/model/schema';
import { Button, Flex, Switch, Text } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddressesStepProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  onNext: () => void;
  onPrev: () => void;
}
export const AddressesStep = memo(({ addresses, setAddresses, onNext, onPrev }: AddressesStepProps) => {
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);
  const shipping = addresses.find((a: Address) => a.type === 'shipping') ?? { city: '', country: '', streetName: '', zip: '', type: 'shipping' };
  const billing = addresses.find((a: Address) => a.type === 'billing') ?? { city: '', country: '', streetName: '', zip: '', type: 'billing' };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Address[]>({
    resolver: zodResolver(addressesSchema),
    defaultValues: [shipping, billing],
    mode: 'onChange',
  });

  const onSubmit = (data: Address[]) => {
    let result: Address[] = [
      { ...data[0], type: 'shipping' },
    ];
    if (useShippingAsBilling) {
      result.push({ ...data[0], type: 'billing' });
    }
    else if (data[1] && data[1].city) {
      result.push({ ...data[1], type: 'billing' });
    }
    setAddresses(result);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text mb="2">Shipping Address</Text>
      <Flex direction="column" gap="2">
        <InputText {...register('0.city')} placeholder="City" />
        <InputText {...register('0.country')} placeholder="Country" />
        <InputText {...register('0.streetName')} placeholder="Street Name" />
        <InputText {...register('0.zip')} placeholder="ZIP" />
      </Flex>
      {errors[0] && <span>{errors[0].message}</span>}
      <Flex align="center" mt="3" gap="2">
        <Switch checked={useShippingAsBilling} onCheckedChange={setUseShippingAsBilling} />
        <Text>Use shipping as billing</Text>
      </Flex>
      {!useShippingAsBilling && (
        <>
          <Text mt="3" mb="2">Billing Address (optional)</Text>
          <Flex direction="column" gap="2">
            <InputText {...register('1.city')} placeholder="City" />
            <InputText {...register('1.country')} placeholder="Country" />
            <InputText {...register('1.streetName')} placeholder="Street Name" />
            <InputText {...register('1.zip')} placeholder="ZIP" />
          </Flex>
          {errors[1] && <span>{errors[1].message}</span>}
        </>
      )}
      <Flex justify="between" mt="4">
        <Button variant="soft" type="button" onClick={onPrev}>Back</Button>
        <Button type="submit">Next</Button>
      </Flex>
    </form>
  );
});
