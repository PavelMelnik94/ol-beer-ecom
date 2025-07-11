import type { SuccessResponseAddresses } from '@modules/user/api';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useQuery } from '@tanstack/react-query';

export function useUserBillingAddresses() {
  const { data: response, error, isLoading } = useQuery<SuccessResponseAddresses, ErrorResponse>({
    queryKey: QUERY_KEYS.user.billingAddresses(),
    queryFn: () => userApi.getBillingAddresses(),
  });

  return {
    billingAddresses: response?.data || [],
    isLoading,
    error,
  } as const;
}

export function useUserShippingAddresses() {
  const { data: response, error, isLoading } = useQuery<SuccessResponseAddresses, ErrorResponse>({
    queryKey: QUERY_KEYS.user.shippingAddresses(),
    queryFn: () => userApi.getShippingAddresses(),
  });

  return {
    shippingAddresses: response?.data || [],
    isLoading,
    error,
  } as const;
}
