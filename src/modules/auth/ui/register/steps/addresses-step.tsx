import { addressesSchema, type Address } from '@kernel/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { Building, Building2, House, MailOpen } from 'lucide-react';
import { nanoid } from 'nanoid';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFooter } from '../register-footer/register-footer';

interface AddressesStepProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  onSubmit?: () => void;
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}

export const AddressesStep = memo(({ addresses, setAddresses, onSubmit, step, totalSteps, onClickBack }: AddressesStepProps) => {
  const shippingAddress = addresses.find(a => a.type === 'shipping') ?? {
    city: '',
    country: '',
    streetName: '',
    zip: '',
    type: 'shipping',
    id: nanoid(),
    isPrimaryAddress: true,
  } satisfies Address;

  const defaultAddresses: Address[] = [shippingAddress];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ addresses: Address[]; }>({
    resolver: zodResolver(addressesSchema),
    defaultValues: { addresses: defaultAddresses },
    mode: 'onChange',
  });

  const handleFormSubmit = (data: { addresses: Address[]; }) => {
    const shipping = data.addresses[0];

    const result: Address[] = [
      { ...shipping, type: 'shipping', isPrimaryAddress: true },
    ];

    setAddresses(result);

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Flex direction="column" gap="4">
        <Text size="4" weight="bold">Shipping Address</Text>

        <Flex direction="column" gap="2">
          <InputText
            {...register('addresses.0.city')}
            placeholder="City"
            error={errors.addresses?.[0]?.city?.message}
            icon={<Building size={16} />}
          />
          <InputText
            {...register('addresses.0.country')}
            placeholder="Country"
            error={errors.addresses?.[0]?.country?.message}
            icon={<Building2 size={16} />}
          />
          <InputText
            {...register('addresses.0.streetName')}
            placeholder="Street Name"
            error={errors.addresses?.[0]?.streetName?.message}
            icon={<House size={16} />}
          />
          <InputText
            {...register('addresses.0.zip')}
            placeholder="ZIP"
            error={errors.addresses?.[0]?.zip?.message}
            icon={<MailOpen size={16} />}
          />
        </Flex>
      </Flex>

      <RegisterFooter
        step={step}
        totalSteps={totalSteps}
        onClickBack={onClickBack}
      />
    </form>
  );
});
