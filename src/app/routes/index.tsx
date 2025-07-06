import { AuthLayout } from '@app/layouts/auth-layout/auth-layout';
import { MainLayout } from '@app/layouts/main-layout/main-layout';
import { RouteErrorBoundary, ROUTES } from '@kernel/index';
import { HomePage, LazyArticlePage, LazyBlogPage, LazyBreweriesPage, LazyProductDetailsPage, LazyProductsPage } from '@pages/index';
import { PagePreloader } from '@shared/components';
import { Suspense } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: ROUTES.home.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
  {
    path: ROUTES.articles.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyBlogPage /> },
    ],
  },
  {
    path: ROUTES.breweries.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyBreweriesPage /> },
    ],
  },
  {
    path: ROUTES.articles.root,
    element: <MainLayout />,
    children: [
      { path: ':id', element: <LazyArticlePage /> },
    ],
  },
  {
    path: ROUTES.about.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <div>about</div> },
    ],
  },
  {
    path: ROUTES.showcase.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyProductsPage /> },
      { path: ':id', element: <LazyProductDetailsPage /> },
    ],
  },
  {
    path: ROUTES.profile.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <div>profile settings</div> },
      { path: ROUTES.profile.orders.short, element: <div>orders</div> },
    ],
  },
  {
    path: ROUTES.basket.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <div>basket</div> },
    ],
  },
  {
    path: ROUTES.auth.root,
    element: <AuthLayout />,
    children: [
      { path: ROUTES.auth.register.short, element: <div>register</div> },
    ],
  },
  {
    path: '*',
    element: <div> /404  </div>,
  },
]
  .map(route => ({ ...route, errorElement: <RouteErrorBoundary /> })),
);

export function AppRoutes() {
  return (
    <Suspense fallback={<PagePreloader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
