import { Smile } from 'lucide-react';
import type { ReactNode } from 'react';
import { Alert } from './alert';

export function SuccessAlert({ children }: { children: ReactNode }) {
  return <Alert icon={<Smile />} color="green">{children}</Alert>
}
