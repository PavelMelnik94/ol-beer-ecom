import type { ReactNode } from 'react';
import { CircleOff } from 'lucide-react';
import { Alert } from './alert';

export function ErrorAlert({ children }: { children: ReactNode; }) {
  return <Alert icon={<CircleOff />} color="ruby">{children}</Alert>
}
