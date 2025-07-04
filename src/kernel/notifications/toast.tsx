import type React from 'react';
import { Beer, CircleAlert, CircleOff, Smile } from 'lucide-react';
import { toast as sonner } from 'sonner';

export const toast = {
  success: (msg: string, icon?: React.ReactNode) => sonner.success(msg, {
    icon: icon || <Smile />,
  }),
  error: (msg: string, icon?: React.ReactNode) => sonner.error(msg, {
    icon: icon || <CircleOff />,
  }),
  info: (msg: string, icon?: React.ReactNode) => sonner.info(msg, {
    icon: icon || <Beer />,
  }),
  warning: (msg: string, icon?: React.ReactNode) => sonner.warning(msg, {
    icon: icon || <CircleAlert />,
  }),

};
