import type { ROUTES } from '@kernel/router';
import type { User } from '@kernel/types';
import type { HeaderRenderMode } from '@modules/header/types';
import { createContext, useContext } from 'react';

interface HeaderContextProperties {
  user: User | undefined;
  isAuth: boolean;
  isMobileLayout: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  getActiveProps: (route: string) => { [key: string]: string; };
  navigationHandlers: {
    onBlog: () => void;
    onBreweries: () => void;
    onAbout: () => void;
    onShowcase: () => void;
    onProfile: () => void;
    onBasket: () => void;
    onOrders: () => void;
    onFavorites: () => void;
    onRegister: () => void;
    onHome: () => void;
    onLogout: () => void;
  };
  routes: typeof ROUTES;
  renderMode: HeaderRenderMode;
}

export const HeaderContext = createContext<HeaderContextProperties | undefined>(undefined);

export function useHeaderContext(): HeaderContextProperties {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }
  return context;
}
