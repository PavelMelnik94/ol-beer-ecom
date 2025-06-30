import { CircleOff } from 'lucide-react';
import type { ReactNode } from 'react';
import { Alert } from './alert';

export function ErrorAlert({ children }: { children: ReactNode }) {
  return <Alert icon={<CircleOff />} color="ruby">{children}</Alert>
}
