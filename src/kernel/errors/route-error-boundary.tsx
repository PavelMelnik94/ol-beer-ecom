import { Box, Button, Code, Flex, Text } from '@radix-ui/themes';
import { Dialog } from '@shared/components';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import styles from './error-boundary.module.scss';

export function RouteErrorBoundary() {
  const error = useRouteError();

  console.error('Route Error caught:', error);

  let errorMessage = 'Unknown error occurred';
  let errorDetails = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetails = error.data?.message || '';
  }
  else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || '';
  }
  else if (typeof error === 'string') {
    errorMessage = error;
  }

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Dialog
      open={true}
      onOpenChange={() => {}}
      trigger={<div />}
      title="Route Error"
      description="An error occurred while navigating"
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
            {errorMessage}
          </Text>

          {errorDetails && import.meta.env.DEV && (
            <Box mt="4">
              <Text size="2" weight="medium" mb="2" as="div">
                Error Details:
              </Text>
              <Code
                variant="outline"
                size="1"
                className={styles.errorCode}
              >
                {errorDetails}
              </Code>
            </Box>
          )}
        </Box>

        <Flex gap="3" justify="center">
          <Button
            variant="soft"
            color="gray"
            onClick={handleGoHome}
          >
            Go Home
          </Button>
          <Button
            variant="solid"
            color="red"
            onClick={handleReload}
          >
            Reload
          </Button>
        </Flex>
      </Box>
    </Dialog>
  );
}
