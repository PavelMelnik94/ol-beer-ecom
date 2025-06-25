import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@kernel/query/query-client'
import { Theme } from '@radix-ui/themes';
import { useTheme } from '@shared/hooks/use-theme';
import { AppRoutes } from './routes'

function App() {
  const { theme } = useTheme()

  return (
    // <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Theme accentColor="bronze" radius="full" appearance={theme}>
          <AppRoutes />

        </Theme>

        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </BrowserRouter>
    </QueryClientProvider>
    // </ErrorBoundary>
  )
}

export default App
