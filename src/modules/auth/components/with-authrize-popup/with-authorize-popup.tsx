import type { ComponentType } from 'react';
import { Avatar, Box, Button, Checkbox, Flex, Popover, Text, TextArea } from '@radix-ui/themes';
import { useAuthStore } from '../../stores/auth-store';

export function withAuthorizePopup<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthorizePopup(props: P) {
    const { isAuth } = useAuthStore(store => ({ isAuth: store.isAuthenticated }));

    if (isAuth) return <WrappedComponent {...props} />;

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
          <Flex gap="3">
            <Avatar
              size="2"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="A"
              radius="full"
            />
            <Box flexGrow="1">
              <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
              <Flex gap="3" mt="3" justify="between">
                <Flex align="center" gap="2" asChild>
                  <Text as="label" size="2">
                    <Checkbox />
                    <Text>Send to group</Text>
                  </Text>
                </Flex>
                <Popover.Close>
                  <Button size="1">Comment</Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    );
  };
}
