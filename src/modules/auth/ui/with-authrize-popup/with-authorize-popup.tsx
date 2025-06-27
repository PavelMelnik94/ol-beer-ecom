import type { ComponentType } from 'react';
import { Box, Button, Flex, Link, Popover, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { Image } from '@shared/components';
import { useAuth } from '../../hooks/use-auth';

export function withAuthorizePopup<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthorizePopup(props: P) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

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
            <Text>
              We see that you are not logged in 🤔
            </Text>

            <Image
              src="/illustrations/u_auth.svg"
              width="240px"
              height="240px"
              alt="Auth"

            />

            <Flex align="center" justify="end" mt="4">
              <Button size="1" variant="ghost" onClick={() => navigate('/auth')} mr="3">
                Log In
              </Button>

              <Button size="1" variant="ghost" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    );
  };
}
