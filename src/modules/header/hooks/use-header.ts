import type { HeaderRenderMode } from '@modules/header/types';
import { useGoTo } from '@kernel/hooks';
import { ROUTES, useAuthStore, useUserStore } from '@kernel/index';
import { useAuth } from '@modules/auth';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@shared/hooks';
import styles from '../header.module.scss';

export function useHeader() {
  const navigation = useGoTo();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const user = useUserStore(s => s.profile);
  const isAuth = useAuthStore(s => s.isAuth);
  const isMobileLayout = useMediaQuery('(max-width: 670px)');

  const getActiveProperties = (path: string) => ({
    'data-active': path === pathname ? 'true' : 'false',
    'className': clsx({ [styles.active]: pathname.includes(path) || pathname === path }),
  });

  const createNavigationHandler = (navigateFunction: () => void) => () => {
    navigateFunction();
    setMobileMenuOpen(false);
  };

  const navigationHandlers = {
    onBlog: createNavigationHandler(navigation.navigateToBlog),
    onBreweries: createNavigationHandler(navigation.navigateToBreweries),
    onAbout: createNavigationHandler(navigation.navigateToAbout),
    onShowcase: createNavigationHandler(navigation.navigateToShowcase),
    onProfile: createNavigationHandler(navigation.navigateToProfile),
    onBasket: createNavigationHandler(navigation.navigateToBasket),
    onOrders: createNavigationHandler(navigation.navigateToOrders),
    onFavorites: createNavigationHandler(navigation.navigateToFavorites),
    onRegister: createNavigationHandler(navigation.navigateToRegister),
    onHome: navigation.navigateToHome,
    onLogout: () => {
      logout();
      setMobileMenuOpen(false);
    },
  };

  const renderMode: HeaderRenderMode = useMemo(() => {
    if (!isAuth && !isMobileLayout) return 'desktop-unauthenticated';
    if (isAuth && !isMobileLayout) return 'desktop-authenticated';
    if (!isAuth && isMobileLayout) return 'mobile-unauthenticated';
    if (isAuth && isMobileLayout) return 'mobile-authenticated';
    return 'desktop-unauthenticated';
  }, [isAuth, isMobileLayout]);

  return {
    user,
    isAuth,
    isMobileLayout,
    mobileMenuOpen,
    setMobileMenuOpen,
    getActiveProps: getActiveProperties,
    navigationHandlers,
    routes: ROUTES,
    renderMode,
  };
}
