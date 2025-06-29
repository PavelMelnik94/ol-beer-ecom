import type { ComponentType } from 'react';
import { Button, Flex, Popover, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { useGoTo } from '@kernel/index';
import { useAuth } from '../../hooks/use-auth';

export function withAuthorizePopup<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthorizePopup(props: P) {
    const { isAuthenticated } = useAuth();
    const { navigateToRegister } = useGoTo();

    if (isAuthenticated) return <WrappedComponent {...props} />;

    return (
      <Popover.Root>
        <Popover.Trigger>
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
        </Popover.Trigger>
        <Popover.Content width="360px">
          <Flex direction="column">
            <Text size="2" mb="4">
              We see that you are not logged in 🤔
            </Text>

            <Image
              src="/illustrations/u_auth.svg"
              width="240px"
              height="240px"
              alt="Auth"

            />

            <Flex align="center" justify="end" mt="4">
              {/* // todo modal */}
              <Button size="1" variant="soft" onClick={() => console.log('login modal ?')} mr="3">
                Log In
              </Button>

              <Button size="1" variant="soft" onClick={navigateToRegister}>
                Register
              </Button>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    );
  };
}
