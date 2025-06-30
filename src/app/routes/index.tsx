import { AuthLayout } from '@app/layouts/auth-layout/auth-layout'
import { MainLayout } from '@app/layouts/main-layout/main-layout'
import { ROUTES } from '@kernel/index';
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const LazyHomePage = lazy(() => import('./../../pages').then(module => ({ default: module.HomePage })));
const LazyArticlePage = lazy(() => import('./../../pages').then(module => ({ default: module.ArticlePage })));
const LazyBreweriesPage = lazy(() => import('./../../pages').then(module => ({ default: module.BreweriesPage })));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Main routes with layout */}
      <Routes>
        {/* Main routes with layout */}
        <Route path={ROUTES.home.root} element={<MainLayout />}>
          <Route index element={<LazyHomePage />} />
        </Route>

        <Route path={ROUTES.breweries.root} element={<MainLayout />}>
          <Route index element={<LazyBreweriesPage />} />
        </Route>

        <Route path="/articles" element={<MainLayout />}>
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
