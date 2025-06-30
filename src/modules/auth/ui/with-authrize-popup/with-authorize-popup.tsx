import type { ComponentType } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { LoginDialog } from './login-dialog.ts/login-dialog';

export function withAuthorizePopup<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthorizePopup(props: P) {
    const { isAuth } = useAuth();
    if (isAuth) return <WrappedComponent {...props} />;

    return (
      <LoginDialog
        trigger={(
          <button
            type="button"
            style={{
              display: 'inline-block',
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
            }}
            tabIndex={0}
            aria-label="Открыть попап авторизации"
          >
            <div style={{ pointerEvents: 'none' }}>
              <WrappedComponent {...props} />
            </div>
          </button>
        )}
      />

    );
  };
}
