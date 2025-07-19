import type { ReactNode } from 'react';
import { useAuthStore } from '@kernel/stores';
import { useCart } from '@modules/cart';
import { useUserFavorites, useUserProfile } from '@modules/user';
import { useEffect, useState } from 'react';

export function InitializeWrapper({ children }: { children: ReactNode; }) {
  const [isInit, setIsInit] = useState<boolean>(false);
  const isAuth = useAuthStore(s => s.isAuth);
  const { isLoading: loadingProfile } = useUserProfile({ enabled: isAuth });
  const { isLoading: loadingFavorites } = useUserFavorites({ enabled: isAuth });
  const { isLoading: loadingCart } = useCart({ enabled: isAuth });

  useEffect(() => {
    if (!isAuth || (isAuth && !loadingProfile && !loadingFavorites && !loadingCart)) setIsInit(true);
  }, [isAuth, loadingProfile, loadingFavorites, loadingCart]);

  return (
    <>
      {isInit ? children : undefined}
    </>
  );
}
