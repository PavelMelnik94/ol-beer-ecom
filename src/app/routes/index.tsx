import { AuthLayout } from '@app/layouts/auth-layout/auth-layout';
import { MainLayout } from '@app/layouts/main-layout/main-layout';
import { RouteErrorBoundary, ROUTES, useAuthStore } from '@kernel/index';
import { AboutPage, ArticlePage, CartPage, FavoritesPage, HomePage, LazyBlogPage, LazyBreweriesPage, LazyProductsPage, LazyRegisterPage, OrdersPage, ProductDetailsPage, ProfilePage } from '@pages/index';
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
        element: <HomePage />,
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
      { path: ':id', element: <ArticlePage /> },
    ],
  },
  {
    path: ROUTES.about.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <AboutPage /> },
    ],
  },
  {
    path: ROUTES.showcase.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyProductsPage /> },
      { path: ':id', element: <ProductDetailsPage /> },
    ],
  },
  {
    path: ROUTES.profile.root,
    element: <MainLayout />,
    loader: registerLoader,
    children: [
      { index: true, element: <ProfilePage /> },
      { path: ROUTES.profile.orders.short, element: <OrdersPage /> },
      { path: ROUTES.profile.favorites.short, element: <FavoritesPage /> },
    ],
  },
  {

    path: ROUTES.basket.root,
    element: <MainLayout />,
    loader: registerLoader,
    children: [
      { index: true, element: <CartPage /> },
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
    element: <AboutPage />,
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
