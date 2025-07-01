import type { ReactNode } from 'react';
import { Smile } from 'lucide-react';
import { Alert } from './alert';

export function SuccessAlert({ children }: { children: ReactNode }) {
  return <Alert icon={<Smile />} color="green">{children}</Alert>
}
