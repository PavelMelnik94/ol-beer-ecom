import { AuthLayout } from '@app/layouts/auth-layout/auth-layout';
import { MainLayout } from '@app/layouts/main-layout/main-layout';
import { RouteErrorBoundary, ROUTES, useAuthStore } from '@kernel/index';
import { LazyAboutPage, LazyArticlePage, LazyBlogPage, LazyBreweriesPage, LazyCartPage, LazyFavoritesPage, LazyHomePage, LazyOrdersPage, LazyProductDetailsPage, LazyProductsPage, LazyProfilePage, LazyRegisterPage } from '@pages/index';
import { PagePreloader } from '@shared/components';
import { Suspense } from 'react';

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

function registerLoader() {
  const isAuth = useAuthStore.getState().isAuth;
  if (!isAuth) {
    return redirect(ROUTES.auth.register.full);
  }
}

const router = createBrowserRouter([
  {

    path: ROUTES.home.root,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LazyHomePage />,
      },
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
      { index: true, element: <LazyAboutPage /> },
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
    loader: registerLoader,
    children: [
      { index: true, element: <LazyProfilePage /> },
      { path: ROUTES.profile.orders.short, element: <LazyOrdersPage /> },
      { path: ROUTES.profile.favorites.short, element: <LazyFavoritesPage /> },
    ],
  },
  {

    path: ROUTES.basket.root,
    element: <MainLayout />,
    loader: registerLoader,
    children: [
      { index: true, element: <LazyCartPage /> },
    ],

  },
  {
    path: ROUTES.auth.root,
    element: <AuthLayout />,
    children: [
      { path: ROUTES.auth.register.short, element: <LazyRegisterPage /> },
    ],
  },
  {
    path: '*',
    element: <LazyAboutPage />,
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
