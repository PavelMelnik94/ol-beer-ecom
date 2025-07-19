import type { ROUTES } from '@kernel/router';
import type { User } from '@kernel/types';
import type { HeaderRenderMode } from '@modules/common/ui/header/types';
import { createContext, useContext, useMemo } from 'react';
import { useHeader } from '../hooks/use-header';

interface HeaderContextProperties {
  user: User | null;
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

const HeaderContext = createContext<HeaderContextProperties | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const headerData = useHeader();

  const value = useMemo(() => ({
    ...headerData,
  }), [headerData]);

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

function useHeaderContext(): HeaderContextProperties {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }
  return context;
}

function extractStringRoutes(routes: typeof ROUTES): { [key: string]: string; } {
  const result: { [key: string]: string; } = {};
  for (const [key, value] of Object.entries(routes)) {
    if (typeof value === 'string') {
      result[key] = value;
    }
    else if (value && typeof value === 'object' && 'root' in value) {
      result[key] = value.root;
    }
  }
  return result;
}

export { extractStringRoutes, useHeaderContext };
