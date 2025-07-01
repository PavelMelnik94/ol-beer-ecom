import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { Alert } from './alert';

export function WarningAlert({ children }: { children: ReactNode }) {
  return <Alert icon={<CircleAlert />} color="orange">{children}</Alert>
}
