import type { ReactNode } from 'react';
import { Box, Button, Code, Flex, Text } from '@radix-ui/themes';
import { Dialog } from '@shared/components';
import { Component } from 'react';

import styles from './error-boundary.module.scss';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
    console.error('Error stack:', error.stack);

    if (!import.meta.env.DEV) {
      console.error('Production error caught by ErrorBoundary:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleClose = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Dialog
          open={true}
          onOpenChange={() => {}}
          trigger={<div />}
          title="Something went wrong"
          description="An unexpected error has occurred"
          maxWidth="500px"
        >
          <Box>
            <Flex justify="center" mb="4">
              <img
                src="/illustrations/u_error.svg"
                alt="Error illustration"
                className={styles.errorIllustration}
              />
            </Flex>

            <Box mb="4">
              <Text size="3" color="gray" align="center" as="div">
                {this.state.error?.message || 'An unexpected error occurred'}
              </Text>

              {import.meta.env.DEV && this.state.error?.stack && (
                <Box mt="4">
                  <Text size="2" weight="medium" mb="2" as="div">
                    Error Details:
                  </Text>
                  <Code
                    variant="outline"
                    size="1"
                    className={styles.errorCode}
                  >
                    {this.state.error.stack}
                  </Code>
                </Box>
              )}
            </Box>

            <Flex gap="3" justify="center">
              <Button
                variant="soft"
                color="gray"
                onClick={this.handleClose}
              >
                Close
              </Button>
              <Button
                variant="solid"
                color="red"
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </Flex>
          </Box>
        </Dialog>
      );
    }
    return this.props.children;
  }
}
