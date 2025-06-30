import { CircleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { Alert } from './alert';

export function WarningAlert({ children }: { children: ReactNode }) {
  return <Alert icon={<CircleAlert />} color="orange">{children}</Alert>
}
