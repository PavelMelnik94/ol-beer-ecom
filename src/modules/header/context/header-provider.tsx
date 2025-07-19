import { HeaderContext } from '@modules/header/context/header-context';
import { useHeader } from '@modules/header/hooks/use-header';
import { useMemo } from 'react';

export const HeaderProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const headerData = useHeader();

  const value = useMemo(() => ({
    ...headerData,
  }), [headerData]);

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};
