import { useEffect, useState, type ReactNode } from 'react';
import { useAuthStore } from '@kernel/stores';
import { useUserFavorites, useUserProfile } from '@modules/user';

export function InitializeWrapper({ children }: { children: ReactNode; }) {
  const [isInit, setIsInit] = useState<boolean>(false)
  const isAuth = useAuthStore(s => s.isAuth);
  const {isLoading: loadingProfile} = useUserProfile({ enabled: isAuth });
  const {isLoading: loadingFavorites} = useUserFavorites({ enabled: isAuth })

  useEffect(() => {
    if (!isAuth || (isAuth && !loadingProfile && !loadingFavorites)) setIsInit(true);
  }, [isAuth, loadingProfile, loadingFavorites])

  return (
    <>
      {isInit ? children : null}
    </>
  );
}
