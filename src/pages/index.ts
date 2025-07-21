import { lazy } from 'react';

export { HomePage } from './home/home-page';
const LazyBlogPage = lazy(() => import('./blog/blog-page').then(module => ({ default: module.BlogPage })));
const LazyBreweriesPage = lazy(() => import('./breweries/breweries-page').then(module => ({ default: module.BreweriesPage })));
const LazyProductsPage = lazy(() => import('./products/products-page').then(module => ({ default: module.ProductsPage })));
const LazyRegisterPage = lazy(() => import('./register/register-page').then(module => ({ default: module.RegisterPage })));

const LazyCartPage = lazy(() => import('./cart/cart-page').then(module => ({ default: module.CartPage })));
const LazyFavoritesPage = lazy(() => import('./favorites/favorites-page').then(module => ({ default: module.FavoritesPage })));
const LazyHomePage = lazy(() => import('./home/home-page').then(module => ({ default: module.HomePage })));
const LazyOrdersPage = lazy(() => import('./orders/orders-page').then(module => ({ default: module.OrdersPage })));
const LazyProfilePage = lazy(() => import('./profile/profile-page').then(module => ({ default: module.ProfilePage })));
const LazyAboutPage = lazy(() => import('./about/about-page').then(module => ({ default: module.AboutPage })));

const LazyArticlePage = lazy(() => import('./article/article-page').then(module => ({ default: module.ArticlePage })));

const LazyProductDetailsPage = lazy(() => import('./product-details/product-details-page').then(module => ({ default: module.ProductDetailsPage })));
export {
  LazyAboutPage,
  LazyArticlePage,
  LazyBlogPage,
  LazyBreweriesPage,
  LazyCartPage,
  LazyFavoritesPage,
  LazyHomePage,
  LazyOrdersPage,
  LazyProductDetailsPage,
  LazyProductsPage,
  LazyProfilePage,
  LazyRegisterPage,
};
