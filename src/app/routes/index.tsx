import { AuthLayout } from '@app/layouts/AuthLayout'
import { HomeLayout } from '@app/layouts/blog-layout/home-layout'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const LazyHomePage = lazy(() => import('./../../pages').then(module => ({ default: module.HomePage })));
const LazyArticlePage = lazy(() => import('./../../pages').then(module => ({ default: module.ArticlePage })));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Main routes with layout */}
      <Routes>
        {/* Main routes with layout */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LazyHomePage />} />
        </Route>

        <Route path="/articles" element={<HomeLayout />}>
          <Route path=":id" element={<LazyArticlePage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          {/* Auth routes will be added later */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<div> /404  </div>} />
      </Routes>
    </Suspense>
  )
}
