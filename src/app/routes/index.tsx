import { AuthLayout } from '@app/layouts/auth-layout/auth-layout'
import { MainLayout } from '@app/layouts/main-layout/main-layout'
import { ROUTES } from '@kernel/index';
import { HomePage } from '@pages/index';
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// const LazyHomePage = lazy(() => import('./../../pages').then(module => ({ default: module.HomePage })));
const LazyArticlePage = lazy(() => import('./../../pages').then(module => ({ default: module.ArticlePage })));
const LazyBreweriesPage = lazy(() => import('./../../pages').then(module => ({ default: module.BreweriesPage })));
const LazyBlogPage = lazy(() => import('./../../pages').then(module => ({ default: module.BlogPage })));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ROUTES.home.root} element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path={ROUTES.articles.root} element={<MainLayout />}>
          <Route index element={<LazyBlogPage />} />
        </Route>

        <Route path={ROUTES.breweries.root} element={<MainLayout />}>
          <Route index element={<LazyBreweriesPage />} />
        </Route>

        <Route path="/articles" element={<MainLayout />}>
          <Route path=":id" element={<LazyArticlePage />} />
        </Route>

        <Route path={ROUTES.about.root} element={<MainLayout />}>
          <Route index element={<div>about</div>} />
        </Route>

        <Route path={ROUTES.store.root} element={<MainLayout />}>
          <Route index element={<div>store</div>} />
          <Route path=":id" element={<div>store item</div>} />
        </Route>

        <Route
          path={ROUTES.profile.root}
          element={<MainLayout />}
        >
          <Route index element={<div>profile settings</div>} />
          <Route path="orders" element={<div>orders</div>} />
        </Route>

        <Route
          path={ROUTES.basket.root}
          element={<MainLayout />}
        >
          <Route index element={<div>basket</div>} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<div>store</div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div> /404  </div>} />
      </Routes>
    </Suspense>
  )
}
