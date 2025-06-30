import { Callout } from '@radix-ui/themes';
import type { ReactNode } from 'react';

export function Alert({ children, color, icon }: { children: ReactNode, color?: Callout.RootProps['color'], icon?: ReactNode }) {
  return (
    <Callout.Root size="1" color={color}>
      <Callout.Icon>
        {icon}
      </Callout.Icon>
      <Callout.Text>
        {children}
      </Callout.Text>
    </Callout.Root>
  )
}
