import type { ReactNode } from 'react';
import { Callout } from '@radix-ui/themes';

export function Alert({ children, color, icon, className }: {
  children: ReactNode;
  color?: Callout.RootProps['color'];
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Callout.Root size="1" color={color} className={className} data-callout>
      <Callout.Icon>
        {icon}
      </Callout.Icon>
      <Callout.Text>
        {children}
      </Callout.Text>
    </Callout.Root>
  );
}
