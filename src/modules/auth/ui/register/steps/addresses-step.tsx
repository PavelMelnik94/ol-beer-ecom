import  { memo, useState } from 'react';
import type { Address } from '@modules/auth/stores/register-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressesSchema } from '@modules/auth/model/schema';
import { Flex, Tabs, Text } from '@radix-ui/themes';
import { InputText } from '@shared/components';
import { RegisterFooter } from '../register-footer/register-footer';
import { useForm } from 'react-hook-form';

interface AddressesStepProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  onSubmit?: () => void;
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}

export const AddressesStep = memo(({ addresses, setAddresses, onSubmit, step, totalSteps, onClickBack }: AddressesStepProps) => {


  const [activeTab, setActiveTab] = useState<'shipping' | 'billing'>('shipping');
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);

  // Преобразуем addresses в массив для RHF
  const defaultAddresses: Address[] = [
    addresses.find(a => a.type === 'shipping') ?? { city: '', country: '', streetName: '', zip: '', type: 'shipping' },
    addresses.find(a => a.type === 'billing') ?? { city: '', country: '', streetName: '', zip: '', type: 'billing' },
  ];

  // billing для условий отображения ошибок
  const billing = defaultAddresses[1];
  const billingHasValue = billing && (billing.city || billing.country || billing.streetName || billing.zip);
  const shouldShowBillingErrors = activeTab === 'billing' && !useShippingAsBilling && billingHasValue;

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<{ addresses: Address[] }>({
    resolver: zodResolver(addressesSchema),
    defaultValues: { addresses: defaultAddresses },
    mode: 'onSubmit',
  });



  const handleFormSubmit = (data: { addresses: Address[] }) => {
    let result: Address[] = [];
    const shipping = data.addresses[0];
    const billing = data.addresses[1];
    result.push({ ...shipping, type: 'shipping' });
    const billingTabActive = activeTab === 'billing';
    const billingHasValue = billing && (billing.city || billing.country || billing.streetName || billing.zip);
    if (!useShippingAsBilling && (billingTabActive || billingHasValue)) {
      result.push({ ...billing, type: 'billing' });
    } else if (useShippingAsBilling) {
      result.push({ ...shipping, type: 'billing' });
    }
    setAddresses(result);
    console.log('Form submit, valid:', data, 'errors:', errors);
    if (onSubmit) {
      console.log('Calling onSubmit');
      onSubmit();
    }
  };


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Tabs.Root value={activeTab} onValueChange={value => setActiveTab(value as 'shipping' | 'billing')} className="address-tabs">
        <Tabs.List>
          <Tabs.Trigger value="shipping">
            Shipping
            <span className="required-star">*</span>
          </Tabs.Trigger>
          <Tabs.Trigger value="billing" disabled={useShippingAsBilling}>Billing (optional)</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="shipping">
          <Flex direction="column" gap="2" mt="4">
            <Flex align="center" gap="2" mb="3">
              <Text>Use shipping as billing</Text>
              <input
                type="checkbox"
                checked={useShippingAsBilling}
                onChange={e => setUseShippingAsBilling(e.target.checked)}
                className="shipping-billing-checkbox"
                title="Use shipping as billing"
              />
            </Flex>
            <InputText {...register('addresses.0.city')} placeholder="City" error={errors.addresses?.[0]?.city?.message} />
            <InputText {...register('addresses.0.country')} placeholder="Country" error={errors.addresses?.[0]?.country?.message} />
            <InputText {...register('addresses.0.streetName')} placeholder="Street Name" error={errors.addresses?.[0]?.streetName?.message} />
            <InputText {...register('addresses.0.zip')} placeholder="ZIP" error={errors.addresses?.[0]?.zip?.message} />
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="billing">
          <Flex direction="column" gap="2" mt="4">
            <InputText {...register('addresses.1.city')} placeholder="City" error={shouldShowBillingErrors ? errors.addresses?.[1]?.city?.message : undefined} disabled={useShippingAsBilling} />
            <InputText {...register('addresses.1.country')} placeholder="Country" error={shouldShowBillingErrors ? errors.addresses?.[1]?.country?.message : undefined} disabled={useShippingAsBilling} />
            <InputText {...register('addresses.1.streetName')} placeholder="Street Name" error={shouldShowBillingErrors ? errors.addresses?.[1]?.streetName?.message : undefined} disabled={useShippingAsBilling} />
            <InputText {...register('addresses.1.zip')} placeholder="ZIP" error={shouldShowBillingErrors ? errors.addresses?.[1]?.zip?.message : undefined} disabled={useShippingAsBilling} />
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
      <RegisterFooter
        step={step}
        totalSteps={totalSteps}
        onClickBack={onClickBack}
      />
    </form>
  );
});
