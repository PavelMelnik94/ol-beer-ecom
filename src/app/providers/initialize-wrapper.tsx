import type { ReactNode } from 'react';
import { useAuthStore } from '@kernel/stores';
import { useUserProfile } from '@modules/user';

export function InitializeWrapper({ children }: { children: ReactNode; }) {
  const isAuth = useAuthStore(s => s.isAuth);
  useUserProfile({ enabled: isAuth });
  return (
    <>
      {children}
    </>
  );
}
