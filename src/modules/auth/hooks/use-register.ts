import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/api';
import type { User } from '@kernel/types';
import type { RegisterBody } from '@modules/auth/model/types';
import { useGoTo } from '@kernel/hooks';
import { toast } from '@kernel/notifications';
import { useAuthStore } from '@kernel/stores';
import { authApi } from '@modules/auth/api';
import { useConfetti } from '@shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useRegister() {
  const [isRegisterFinish, setIsRegisterFinish] = useState<boolean>(false);
  const storeLogin = useAuthStore(state => state.login);
  const navigateToShowcase = useGoTo().navigateToShowcase;
  useConfetti({ playWhen: isRegisterFinish });

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isRegisterFinish) {
      timerId = setTimeout(() => {
        navigateToShowcase();
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isRegisterFinish]);

  const registerMutation = useMutation<ApiSuccessResponse<User>, ApiErrorResponse, RegisterBody>({
    mutationFn: data => authApi.register(data),
    onSuccess: (response) => {
      if (response.success && response.message) {
        toast.success(response.message);
        storeLogin(response.data);
        setIsRegisterFinish(true);
      }

      if (!response.success && response.message) {
        toast.error(response.message);
      }
    },
    onError: () => {
      toast.error('Invalid data provided');
    },
  });

  return registerMutation;
}
