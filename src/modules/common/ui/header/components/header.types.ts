import type { User } from '@kernel/index';

export interface HeaderNavHandlers {
  onBlog: () => void;
  onBreweries: () => void;
  onAbout: () => void;
  onShowcase: () => void;
}

export type DesktopActionsProps = BaseUser & BaseAuth & BaseMenu & BaseActiveProps & BaseRoutes & {
  navigationHandlers: AuthSectionHandlers;
};

export interface MenuContentProps {
  user: User;
  isAuth: boolean;
  onLogout: () => void;
  navigationHandlers: AuthSectionHandlers;
  getActiveProps: (path: string) => {
    'data-active'?: string;
    'className'?: string;
  };
  routes: {
    [key: string]: string;
  };
}

export interface BaseActiveProps {
  getActiveProps: (path: string) => {
    'data-active'?: string;
    'className'?: string;
  };
}

export interface BaseRoutes {
  routes: {
    [key: string]: string;
  };
}

export interface BaseUser {
  user: User;
}

export interface BaseAuth {
  isAuth: boolean;
}

export interface BaseMenu {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export interface AuthSectionHandlers {
  onProfile: () => void;
  onFavorites: () => void;
  onOrders: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onBasket: () => void;
  onHome: () => void;

}

export interface AuthSectionProps extends BaseAuth, BaseActiveProps, BaseRoutes {
  onProfile: () => void;
  onFavorites: () => void;
  onOrders: () => void;
  onRegister: () => void;
  fullWidth?: boolean;
}

export interface UserMenuProps extends BaseUser, BaseAuth, BaseMenu, BaseActiveProps, BaseRoutes {
  onLogout: () => void;

  navigationHandlers: AuthSectionHandlers;
}

export type MobileMenuProps = BaseUser & BaseAuth & BaseMenu & BaseActiveProps & BaseRoutes & {
  navigationHandlers: AuthSectionHandlers & HeaderNavHandlers;
};

export interface MobileSectionProps extends BaseAuth, BaseActiveProps, BaseRoutes {
  onLogout: () => void;
  navigationHandlers: AuthSectionHandlers;
}

export interface LogoProps {
  onClick: () => void;
}
