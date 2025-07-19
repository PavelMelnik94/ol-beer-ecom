import { useAuthStore } from '@kernel/stores';
import { useCart } from '@modules/cart';
import { useUserFavorites, useUserProfile } from '@modules/user';

export function useInitializeApp() {
  const isAuth = useAuthStore(s => s.isAuth);
  const { isLoading: loadingProfile } = useUserProfile({ enabled: isAuth });
  const { isLoading: loadingFavorites } = useUserFavorites({ enabled: isAuth });
  const { isLoading: loadingCart } = useCart({ enabled: isAuth });

  const allDataLoaded = !loadingProfile && !loadingFavorites && !loadingCart;
  const isInit = !isAuth || (isAuth && allDataLoaded);

  return { isInit };
}
