import type { ReactNode } from 'react';
import { useInitializeApp } from '@app/hooks/use-initialize-app';

export function InitializeWrapper({ children }: { children: ReactNode; }) {
  const { isInit } = useInitializeApp();

  return <>{isInit && children}</>;
}
