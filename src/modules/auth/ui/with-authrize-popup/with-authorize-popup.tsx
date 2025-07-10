import type { ComponentType } from 'react';
import { useAuthStore } from '@kernel/stores';
import { LoginDialog } from '../login-dialog.ts/login-dialog';

interface EventHandlers {
  onClick?: (...args: any[]) => void;
  onMouseDown?: (...args: any[]) => void;
  onMouseUp?: (...args: any[]) => void;
  onKeyDown?: (...args: any[]) => void;
  onKeyUp?: (...args: any[]) => void;
  onPointerDown?: (...args: any[]) => void;
  onPointerUp?: (...args: any[]) => void;
}

export function withAuthorizePopup<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthorizePopup(props: P) {
    const isAuth = useAuthStore(s => s.isAuth);

    if (isAuth) return <WrappedComponent {...props} />;

    const {
      onClick,
      onMouseDown,
      onMouseUp,
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      ...restProps
    } = props as P & EventHandlers & { style?: React.CSSProperties; };

    return (
      <div
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...restProps.style,
        }}
      >
        <LoginDialog
          trigger={(
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                ...restProps.style,
              }}
              tabIndex={0}
              role="button"
              aria-label="Open authorization popup"
            >
              <WrappedComponent {...restProps as P} />
            </div>
          )}
        />
      </div>
    );
  };
}
