import { Beer } from 'lucide-react';
import type { ReactNode } from 'react';
import { Alert } from './alert';

export function InfoAlert({ children }: { children: ReactNode }) {
  return <Alert icon={<Beer />} color="blue">{children}</Alert>
}
