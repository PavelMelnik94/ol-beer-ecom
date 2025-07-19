import type React from 'react';
import { Beer, CircleAlert, CircleOff, Smile } from 'lucide-react';
import { toast as sonner } from 'sonner';

const style = {};
export const toast = {
  success: (message: string, icon?: React.ReactNode) => sonner.success(message, {
    style,
    icon: icon || <Smile />,
  }),
  error: (message: string, icon?: React.ReactNode) => sonner.error(message, {
    style,
    icon: icon || <CircleOff />,
  }),
  info: (message: string, icon?: React.ReactNode) => sonner.info(message, {
    style,
    icon: icon || <Beer />,
  }),
  warning: (message: string, icon?: React.ReactNode) => sonner.warning(message, {
    style,
    icon: icon || <CircleAlert />,
  }),

};
