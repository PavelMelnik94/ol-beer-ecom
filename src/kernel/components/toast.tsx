import { Beer, CircleAlert, CircleOff, Smile } from 'lucide-react';
import { toast as sonner } from 'sonner';

export const toast = {
  success: (msg: string) => sonner.success(msg, {
    icon: <Smile />,
  }),
  error: (msg: string) => sonner.error(msg, {
    icon: <CircleOff />,
  }),
  info: (msg: string) => sonner.info(msg, {
    icon: <Beer />,
  }),
  warning: (msg: string) => sonner.warning(msg, {
    icon: <CircleAlert />,
  }),

};
