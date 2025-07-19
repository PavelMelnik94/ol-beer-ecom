import type { ComponentType } from 'react';
import { useAuthStore } from '@kernel/stores';
import { LoginDialog } from '../login-dialog/login-dialog';

interface EventHandlers {
  onClick?: (...arguments_: unknown[]) => void;
  onMouseDown?: (...arguments_: unknown[]) => void;
  onMouseUp?: (...arguments_: unknown[]) => void;
  onKeyDown?: (...arguments_: unknown[]) => void;
  onKeyUp?: (...arguments_: unknown[]) => void;
  onPointerDown?: (...arguments_: unknown[]) => void;
  onPointerUp?: (...arguments_: unknown[]) => void;
}

export function withAuthorizePopup<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthorizePopup(properties: P) {
    const isAuth = useAuthStore(s => s.isAuth);

    if (isAuth) return <WrappedComponent {...properties} />;

    const {
      onClick,
      onMouseDown,
      onMouseUp,
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      ...restProperties
    } = properties as P & EventHandlers & { style?: React.CSSProperties; };

    return (
      <div
        onClick={(event) => { event.stopPropagation(); }}
        onMouseDown={(event) => { event.stopPropagation(); }}
        onMouseUp={(event) => { event.stopPropagation(); }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...restProperties.style,
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
                ...restProperties.style,
              }}
              tabIndex={0}
              role="button"
              aria-label="Open authorization popup"
            >
              <WrappedComponent {...restProperties as P} />
            </div>
          )}
        />
      </div>
    );
  };
}
