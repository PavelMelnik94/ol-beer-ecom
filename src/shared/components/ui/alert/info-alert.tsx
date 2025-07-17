import type { ReactNode } from 'react';
import { Beer } from 'lucide-react';
import { Alert } from './alert';

export function InfoAlert({ children, className }: { children: ReactNode; className?: string; }) {
  return <Alert icon={<Beer />} color="blue" className={className}>{children}</Alert>;
}
