import type React from 'react';
import { Beer, CircleAlert, CircleOff, Smile } from 'lucide-react';
import { toast as sonner } from 'sonner';

const style = {
};
export const toast = {
  success: (msg: string, icon?: React.ReactNode) => sonner.success(msg, {
    style,
    icon: icon || <Smile />,
  }),
  error: (msg: string, icon?: React.ReactNode) => sonner.error(msg, {
    style,
    icon: icon || <CircleOff />,
  }),
  info: (msg: string, icon?: React.ReactNode) => sonner.info(msg, {
    style,
    icon: icon || <Beer />,
  }),
  warning: (msg: string, icon?: React.ReactNode) => sonner.warning(msg, {
    style,
    icon: icon || <CircleAlert />,
  }),

};
