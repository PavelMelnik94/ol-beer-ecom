import { InitializeWrapper } from '@app/providers/initialize-wrapper';
import { ErrorBoundary, queryClient, useTheme } from '@kernel/index';
import { Theme } from '@radix-ui/themes';
import { QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import { Toaster } from 'sonner';
import { AppRoutes } from './routes';

function App() {
  const { theme } = useTheme();
  return (
    <ErrorBoundary>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <InitializeWrapper>
            <Theme accentColor="bronze" radius="full" appearance={theme} panelBackground="translucent">
              <AppRoutes />
              <Toaster richColors theme={theme} />
            </Theme>
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </InitializeWrapper>

        </QueryClientProvider>
      </NuqsAdapter>
    </ErrorBoundary>
  );
}

export default App;
