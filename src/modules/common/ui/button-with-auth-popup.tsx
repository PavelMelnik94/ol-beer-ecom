import type { ButtonProps } from '@radix-ui/themes';
import { withAuthorizePopup } from '@modules/auth';
import { Button } from '@radix-ui/themes';

export const ButtonWithAuthPopup = withAuthorizePopup<ButtonProps>(Button);
