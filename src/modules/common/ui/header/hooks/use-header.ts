import { useGoTo } from '@kernel/hooks';
import { ROUTES, useAuthStore } from '@kernel/index';
import { useAuth } from '@modules/auth';
import clsx from 'clsx';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import styles from '../components/header.module.scss';

export function useHeader() {
  const navigation = useGoTo();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const user = useAuthStore(s => s.user);
  const isAuth = useAuthStore(s => s.isAuth);
  const isMobileLayout = useMediaQuery({
    query: '(max-width: 670px)',
  });

  const getActiveProps = (path: string) => ({
    'data-active': path === pathname ? 'true' : 'false',
    'className': clsx({ [styles.active]: pathname.includes(path) || pathname === path }),
  });

  const createNavigationHandler = (navigateFn: () => void) => () => {
    navigateFn();
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

  const routes = {
    profile: ROUTES.profile.root,
    favorites: ROUTES.profile.favorites.full,
    orders: ROUTES.profile.orders.full,
    register: ROUTES.auth.register.full,
  };

  return {
    user,
    isAuth,
    isMobileLayout,
    mobileMenuOpen,
    setMobileMenuOpen,
    getActiveProps,
    navigationHandlers,
    routes,
  };
}
