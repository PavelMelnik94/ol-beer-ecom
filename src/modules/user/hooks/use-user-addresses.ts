import type { Address } from '@kernel/types';
import type { SuccessResponseAddress, SuccessResponseAddresses } from '@modules/user/api';
import type { CreateAddressData } from '@modules/user/model';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useUserStore } from '@modules/user/stores/user-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserAddresses() {
  const { data: response, error, isLoading } = useQuery<SuccessResponseAddresses, ErrorResponse>({
    queryKey: QUERY_KEYS.user.addresses(),
    queryFn: () => userApi.getAddresses(),
  });

  return {
    addresses: response?.data || [],
    isLoading,
    error,
  } as const;
}

export function useUserAddress(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponseAddress, ErrorResponse>({
    queryKey: QUERY_KEYS.user.address(id),
    queryFn: () => userApi.getAddress(id),
    enabled: !!id,
  });

  return {
    address: response?.data,
    isLoading,
    error,
  } as const;
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  const { setAddresses } = useUserStore();

  return useMutation({
    mutationFn: (data: CreateAddressData) => userApi.createAddress(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.addresses() });

      const currentAddresses = useUserStore.getState().addresses;
      const newAddresses = [...currentAddresses, response.data];
      setAddresses(newAddresses);
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  const { setAddresses } = useUserStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address>; }) =>
      userApi.updateAddress(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.addresses() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.address(variables.id) });

      const currentAddresses = useUserStore.getState().addresses;
      const updatedAddresses = currentAddresses.map(address =>
        address.id === variables.id ? response.data : address,
      );
      setAddresses(updatedAddresses);
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const { setAddresses } = useUserStore();

  return useMutation({
    mutationFn: (id: string) => userApi.deleteAddress(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.addresses() });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.user.address(deletedId) });

      const currentAddresses = useUserStore.getState().addresses;
      const filteredAddresses = currentAddresses.filter(address => address.id !== deletedId);
      setAddresses(filteredAddresses);
    },
  });
}

export function useSetAddressPrimary() {
  const queryClient = useQueryClient();
  const { setAddresses } = useUserStore();

  return useMutation({
    mutationFn: (id: string) => userApi.setAddressPrimary(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.addresses() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.billingAddresses() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.shippingAddresses() });

      const currentAddresses = useUserStore.getState().addresses;
      const updatedAddresses = currentAddresses.map(address => ({
        ...address,
        isPrimaryAddress: address.id === response.data.id,
      }));
      setAddresses(updatedAddresses);
    },
  });
}
