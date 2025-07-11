import type { ReactNode } from 'react';
import { withAuthorizePopup } from '@modules/auth';
import { Text } from '@radix-ui/themes';

export const LoginCTA = withAuthorizePopup(({ children = 'Login' }: { children: ReactNode; }) => (
  <Text size="2" color="bronze">{children}</Text>
));
