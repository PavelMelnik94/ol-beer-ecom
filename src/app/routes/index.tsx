import { AuthLayout } from '@app/layouts/AuthLayout'
import { BlogLayout } from '@app/layouts/blog-layout/blog-layout'
import { BlogPage } from '@pages/index'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// Lazy load pages
const HomePage = lazy(() => import('@pages/home/HomePage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Main routes with layout */}
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<BlogPage />} />
        </Route>

        {/* Auth routes with auth layout */}
        <Route path="/auth" element={<AuthLayout />}>
          {/* Auth routes will be added later */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<div> /404  </div>} />
      </Routes>
    </Suspense>
  )
}
