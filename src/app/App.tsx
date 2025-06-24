import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@kernel/query/query-client'
import { Theme } from '@radix-ui/themes';
import { AppRoutes } from './routes'

function App() {
  return (
    // <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Theme accentColor="bronze" radius="full" appearance="light">
          <AppRoutes />
        </Theme>

        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </BrowserRouter>
    </QueryClientProvider>
    // </ErrorBoundary>
  )
}

export default App
