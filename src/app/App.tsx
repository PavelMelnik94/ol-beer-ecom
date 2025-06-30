import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@kernel/query/query-client'
import { Theme } from '@radix-ui/themes';
import { useTheme } from '@kernel/hooks';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { Toaster } from 'sonner';
import { AppRoutes } from './routes'

function App() {
  const { theme } = useTheme()

  return (
    // <ErrorBoundary>
    <NuqsAdapter>

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Theme accentColor="bronze" radius="full" appearance={theme}>
            <AppRoutes />
            <Toaster richColors theme={theme} />
          </Theme>

          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </BrowserRouter>
      </QueryClientProvider>
    </NuqsAdapter>

  // </ErrorBoundary>
  )
}

export default App
